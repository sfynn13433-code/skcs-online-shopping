import "./globals.css";
import Navbar from "../components/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LocaleProvider } from "../components/LocaleProvider";

export const metadata = {
  metadataBase: new URL("https://www.skcs.co.za"),

  title: "SKCS Online Shopping | Global Shopping & Booking Centre",

  description:
    "SKCS Online Shopping compares prices from Amazon, Takealot, Evetech, Wootware and global marketplaces so you can find the best deals in one place.",

  keywords: [
    "online shopping",
    "price comparison",
    "AI shopping assistant",
    "Amazon deals",
    "Takealot deals",
    "global shopping",
  ],

  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/",
      es: "/",
      de: "/",
      pt: "/",
      ja: "/",
      zh: "/",
      ar: "/",
    },
  },

  openGraph: {
    title: "SKCS Online Shopping",
    description:
      "Compare prices across global marketplaces and discover the best deals using AI.",
    url: "https://www.skcs.co.za",
    siteName: "SKCS Online Shopping",
    images: [
      {
        url: "/images/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "SKCS Online Shopping Marketplace",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SKCS Online Shopping",
    description:
      "AI-powered product comparison across global marketplaces.",
    images: ["/images/hero-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <Navbar />

          <main className="pt-20">
            {children}
          </main>
        </LocaleProvider>

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SKCS Online Shopping",
              url: "https://www.skcs.co.za",
              logo: "https://www.skcs.co.za/hero.jpg",
              sameAs: [
                "https://facebook.com/",
                "https://instagram.com/",
                "https://linkedin.com/",
                "https://youtube.com/"
              ],
              description:
                "Global online shopping and booking platform that compares prices across multiple marketplaces using AI.",
            }),
          }}
        />

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-8WBTGD8X2G" />
      </body>
    </html>
  );
}