import { PrismaClient, AdminRole, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import siteContent from "../src/data/content.json";
import type { SiteContent } from "../src/types/site";

const prisma = new PrismaClient();
const content = siteContent as SiteContent;

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL ?? "admin@arshialtd.com";
  const password = process.env.ADMIN_SEED_PASSWORD ?? "change-me";
  const name = process.env.ADMIN_SEED_NAME ?? "Site Admin";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash, role: AdminRole.super_admin },
    create: { email, name, passwordHash, role: AdminRole.super_admin },
  });

  const c = content.company;
  await prisma.company.upsert({
    where: { id: "default" },
    update: {
      name: c.name,
      shortName: c.shortName,
      tagline: c.tagline,
      description: c.description,
      foundedYear: c.foundedYear,
      logo: c.logo ?? null,
      registeredOffice: c.registeredOffice ?? null,
      authorizedCapital: c.authorizedCapital ?? null,
      liabilityType: c.liabilityType ?? null,
      regulatoryNote: c.regulatoryNote ?? null,
      contactAddress: c.contact.address,
      contactEmail: c.contact.email,
      contactPhone: c.contact.phone,
      contactHours: c.contact.hours,
      socialFacebook: c.contact.socials.facebook ?? null,
      socialInstagram: c.contact.socials.instagram ?? null,
      socialLinkedin: c.contact.socials.linkedin ?? null,
      socialPinterest: c.contact.socials.pinterest ?? null,
    },
    create: {
      id: "default",
      name: c.name,
      shortName: c.shortName,
      tagline: c.tagline,
      description: c.description,
      foundedYear: c.foundedYear,
      logo: c.logo ?? null,
      registeredOffice: c.registeredOffice ?? null,
      authorizedCapital: c.authorizedCapital ?? null,
      liabilityType: c.liabilityType ?? null,
      regulatoryNote: c.regulatoryNote ?? null,
      contactAddress: c.contact.address,
      contactEmail: c.contact.email,
      contactPhone: c.contact.phone,
      contactHours: c.contact.hours,
      socialFacebook: c.contact.socials.facebook ?? null,
      socialInstagram: c.contact.socials.instagram ?? null,
      socialLinkedin: c.contact.socials.linkedin ?? null,
      socialPinterest: c.contact.socials.pinterest ?? null,
    },
  });

  await prisma.statItem.deleteMany({ where: { companyId: "default" } });
  await prisma.statItem.createMany({
    data: c.stats.map((stat, index) => ({
      id: stat.id,
      companyId: "default",
      value: stat.value,
      label: stat.label,
      sub: stat.sub,
      sortOrder: index,
    })),
  });

  await prisma.heroSlide.deleteMany();
  await prisma.heroSlide.createMany({
    data: content.hero.slides.map((slide, index) => ({
      id: slide.id,
      title: slide.title,
      subtitle: slide.subtitle,
      image: slide.image,
      cta: slide.cta,
      link: slide.link,
      sortOrder: index,
    })),
  });

  await prisma.aboutPillar.deleteMany();
  await prisma.aboutSection.upsert({
    where: { id: "default" },
    update: {
      title: content.about.title,
      subtitle: content.about.subtitle,
      paragraphs: content.about.paragraphs,
    },
    create: {
      id: "default",
      title: content.about.title,
      subtitle: content.about.subtitle,
      paragraphs: content.about.paragraphs,
    },
  });
  await prisma.aboutPillar.createMany({
    data: content.about.pillars.map((pillar, index) => ({
      aboutSectionId: "default",
      title: pillar.title,
      desc: pillar.desc,
      sortOrder: index,
    })),
  });

  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: content.services.map((service, index) => ({
      id: service.id,
      slug: service.slug,
      title: service.title,
      icon: service.icon,
      shortDesc: service.shortDesc,
      longDesc: service.longDesc,
      details: service.details ?? [],
      scope: service.scope ?? [],
      features: service.features,
      processSteps: (service.processSteps ?? []) as unknown as Prisma.InputJsonValue,
      timeline: service.timeline ?? null,
      targetSectors: service.targetSectors ?? null,
      typicalTeam: service.typicalTeam ?? null,
      tools: service.tools ?? null,
      methodology: service.methodology ?? null,
      compliance: service.compliance ?? null,
      sortOrder: index,
    })),
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: content.projects.map((project, index) => ({
      id: project.id,
      title: project.title,
      category: project.category,
      client: project.client,
      location: project.location,
      year: project.year,
      area: project.area,
      image: project.image,
      description: project.description,
      features: project.features,
      sortOrder: index,
    })),
  });

  await prisma.teamMember.deleteMany();
  await prisma.teamDepartment.deleteMany();
  for (const [deptIndex, dept] of content.teamDepartments.entries()) {
    await prisma.teamDepartment.create({
      data: {
        id: dept.id,
        title: dept.title,
        description: dept.description ?? null,
        sortOrder: deptIndex,
        members: {
          create: dept.members.map((member, memberIndex) => ({
            id: member.id,
            name: member.name,
            credentials: member.credentials ?? null,
            role: member.role,
            bio: member.bio,
            phone: member.phone ?? null,
            email: member.email ?? null,
            image: member.image,
            socialFacebook: member.socials.facebook ?? null,
            socialInstagram: member.socials.instagram ?? null,
            socialLinkedin: member.socials.linkedin ?? null,
            socialPinterest: member.socials.pinterest ?? null,
            sortOrder: memberIndex,
          })),
        },
      },
    });
  }

  await prisma.processStep.deleteMany();
  await prisma.processStep.createMany({
    data: content.process.map((step, index) => ({
      step: step.step,
      title: step.title,
      subtitle: step.subtitle,
      desc: step.desc,
      sortOrder: index,
    })),
  });

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: content.testimonials.map((t, index) => ({
      id: t.id,
      name: t.name,
      company: t.company,
      quote: t.quote,
      rating: t.rating,
      image: t.image,
      sortOrder: index,
    })),
  });

  if (content.pages) {
    for (const [slug, meta] of Object.entries(content.pages)) {
      if (!meta) continue;
      await prisma.pageMeta.upsert({
        where: { slug },
        update: {
          eyebrow: meta.eyebrow ?? null,
          title: meta.title,
          description: meta.description ?? null,
        },
        create: {
          slug,
          eyebrow: meta.eyebrow ?? null,
          title: meta.title,
          description: meta.description ?? null,
        },
      });
    }
  }

  console.log(`Seeded content from content.json`);
  console.log(`Admin user: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
