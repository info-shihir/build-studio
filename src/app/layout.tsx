import type { Metadata } from "next";
import { Providers } from "./providers";
import "../index.css";

const siteTitle = "InFramed Architects | Framing Spaces, Inspiring Lives";
const siteDescription =
  "InFramed Architects is a premier full-service architectural, interior design, and master planning consultancy based in Dhaka, Bangladesh.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "InFramed",
    "InFramed Architects",
    "Architecture",
    "Interior Design",
    "Dhaka",
    "Bangladesh",
    "Banani",
    "BUET",
    "duplex design",
    "commercial office interior",
  ],
  authors: [{ name: "InFramed Architects" }],
  openGraph: {
    type: "website",
    title: siteTitle,
    description:
      "Premier full-service architectural, interior design, and master planning consultancy based in Dhaka, Bangladesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Premier full-service architectural, interior design, and master planning consultancy based in Dhaka, Bangladesh.",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(t==="light"||t==="dark"?t:"dark");}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
