import type { Metadata, Viewport } from "next";
import "../index.css";

const siteTitle = "Arshia Global BD (Pvt.) Limited | Real Estate · Contractor · Export-Import · Supplier";
const siteDescription =
  "Arshia Global BD (Pvt.) Limited — a private company in Bangladesh, engaged in real estate, 1st class contracting, infrastructure, import-export, supply, consultancy, ITES, and e-GP government procurement.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Arshia Global BD",
    "Private Limited Company",
    "Real Estate",
    "1st Class Contractor",
    "RAJUK",
    "Export Import",
    "Supplier",
    "e-GP",
    "BPPA",
    "Infrastructure",
    "Consultancy",
    "ITES",
    "Construction",
    "Dhaka",
    "Bangladesh",
  ],
  authors: [{ name: "Arshia Global BD (Pvt.) Limited" }],
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
