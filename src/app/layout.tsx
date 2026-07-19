import type { Metadata } from "next";
import { Providers } from "./providers";
import "../index.css";

const siteTitle = "Build Studio | Innovative Exterior & Interior Design";
const siteDescription =
  "Build Studio designs and constructs innovative interior and exterior solutions, creating premium modern spaces in Dhaka, Bangladesh.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Build Studio",
    "Architecture",
    "Interior Design",
    "Exterior Design",
    "Dhaka",
    "Bangladesh",
    "Banani",
    "BUET",
    "duplex design",
    "commercial office interior",
  ],
  authors: [{ name: "Build Studio" }],
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
