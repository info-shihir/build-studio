import { ServiceSlug } from "./navigation";

export interface ServiceExtendedDetails {
  timeline: string;
  targetSectors: string;
  typicalTeam: string;
  techStack: string;
  detailedMethodology: string;
  sustainableFeatures: string;
  compliance: string;
  focusLabel: string;
}

const serviceDetailsById: Record<string, ServiceExtendedDetails> = {
  "serv-1": {
    focusLabel: "Property development & asset management",
    timeline: "4 - 12 Weeks (Project Dependent)",
    targetSectors: "Apartments, Land, Shopping Complexes, Community Centers",
    typicalTeam: "Real Estate Advisor, Legal Consultant, Property Manager",
    techStack: "GIS Mapping, Financial Modeling, Online Property Platforms",
    detailedMethodology:
      "We develop, purchase, sell, lease, and manage apartments, land, buildings, and commercial properties through online and offline platforms — appointing agents, consultants, and attorneys as required.",
    sustainableFeatures: "Legal due diligence, transparent transactions, investment-grade property management.",
    compliance: "Property transactions and developments completed with required legal and regulatory clearances.",
  },
  "serv-2": {
    focusLabel: "On-site construction & project delivery",
    timeline: "3 - 24 Months (Scale Dependent)",
    targetSectors: "Multi-Storied Buildings, Housing Estates, Shopping Complexes",
    typicalTeam: "Chief Engineer, Site Supervisor, Safety Officer, RAJUK Liaison Officer",
    techStack: "AutoCAD, MS Project, BIM Coordination, Site Safety Systems",
    detailedMethodology:
      "As a 1st class contractor, we mobilize on site to build multi-storied buildings, housing projects, and commercial structures — managing excavation, structure, finishing, and handover while securing RAJUK, WASA, Titas Gas, DESCO, and local authority approvals before commencement.",
    sustainableFeatures: "Worker safety certification, quality material audits, and regulatory compliance on every site.",
    compliance: "RAJUK, WASA, Titas Gas, DESCO, and local authority approvals secured before ground-breaking.",
  },
  "serv-3": {
    focusLabel: "Civil infrastructure & land development",
    timeline: "6 - 36 Months (Scale Dependent)",
    targetSectors: "Highways, Bridges, Commercial Complexes, Educational Institutions",
    typicalTeam: "Infrastructure Engineer, Civil Contractor, Project Manager, Surveyor",
    techStack: "AutoCAD, Civil 3D, MS Project, GIS Survey Tools",
    detailedMethodology:
      "We undertake development and construction of commercial buildings, hotels, shopping centres, educational institutions, and infrastructure including roads, highways, bridges, reservoirs, and factories — with land plotting and brokerage services.",
    sustainableFeatures: "Environmental compliance, sustainable land development, structural safety certification.",
    compliance: "Infrastructure works executed under applicable engineering standards and authority permissions.",
  },
  "serv-4": {
    focusLabel: "International trade & logistics",
    timeline: "2 - 8 Weeks (Shipment Dependent)",
    targetSectors: "Construction, Textile, Engineering & Industrial Sectors",
    typicalTeam: "Trade Manager, Customs Broker, Logistics Coordinator",
    techStack: "ERP Trade Systems, Customs E-Filing, Freight Tracking",
    detailedMethodology:
      "We manage import-export of construction materials, building materials, engineering goods, machinery, textile products, fabrics, garments, yarn, and allied products — including logistics, transportation, warehousing, and packaging.",
    sustainableFeatures: "Compliant trade documentation, ethical sourcing standards, carbon-efficient logistics routing.",
    compliance: "Customs, LC, and export-import documentation handled in line with Bangladesh trade regulations.",
  },
  "serv-5": {
    focusLabel: "Material supply & distribution",
    timeline: "1 - 4 Weeks (Order Dependent)",
    targetSectors: "Contractors, Developers, Garment & Manufacturing Firms",
    typicalTeam: "Supply Chain Manager, Procurement Specialist, Quality Inspector",
    techStack: "Inventory Management, Supplier Portals, Quality Audit Systems",
    detailedMethodology:
      "We import, purchase, stock, store, and distribute construction materials, building supplies, industrial equipment, and textile products nationwide with competitive pricing and certified quality.",
    sustainableFeatures: "Certified product sourcing, bulk logistics optimization, supplier quality audits.",
    compliance: "Certified products sourced and delivered with traceable quality documentation.",
  },
  "serv-6": {
    focusLabel: "Advisory, ITES & e-GP procurement",
    timeline: "2 - 12 Weeks (Scope Dependent)",
    targetSectors: "Government, Semi-Government, Private Developers, International Organizations",
    typicalTeam: "Consultant Engineer, IT Specialist, Procurement Officer, Project Manager",
    techStack: "e-GP Portal, BPPA Systems, Project Management Software, REMS Platforms",
    detailedMethodology:
      "We prepare feasibility studies, project profiles, and technical proposals. Our ITES division develops software and digital property platforms. We bid, win, and execute contracts through e-GP and BPPA for government and private sector projects — focused on advisory, documentation, and procurement execution rather than direct site construction.",
    sustainableFeatures: "Transparent procurement compliance, digital documentation, regulatory adherence.",
    compliance: "e-GP/BPPA tender rules, ITES standards, and government permissions for consultancy activities.",
  },
};

const defaultDetails: ServiceExtendedDetails = {
  focusLabel: "Integrated business services",
  timeline: "Flexible",
  targetSectors: "Real Estate, Construction & Trade",
  typicalTeam: "Cross-Division Specialists",
  techStack: "Industry-Standard Business Tools",
  detailedMethodology:
    "A tailored approach balancing quality, compliance, and cost efficiency across all business verticals.",
  sustainableFeatures: "Ethical business practices and regulatory compliance.",
  compliance: "All activities undertaken after obtaining necessary government permissions.",
};

export function getServiceExtendedDetails(serviceId: string): ServiceExtendedDetails {
  return serviceDetailsById[serviceId] ?? defaultDetails;
}

export const serviceHeroImages: Partial<Record<ServiceSlug, string>> = {
  "real-estate": "/images/real-estate.jpg",
  contractor: "/images/construction.jpg",
  infrastructure: "/images/construction.jpg",
  "export-import": "/images/import-export.jpg",
  supplier: "/images/supplier.png",
};

export type ServiceHeroVariant = "photo" | "consultancy";

export function getServiceHeroVariant(slug: ServiceSlug): ServiceHeroVariant {
  return slug === "consultancy" ? "consultancy" : "photo";
}

export function getServiceHeroImage(slug: ServiceSlug): string | undefined {
  return serviceHeroImages[slug];
}
