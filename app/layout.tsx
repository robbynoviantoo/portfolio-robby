import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    template: "Coding with Robby | %s",
    default: "Coding with Robby | Frontend Developer",
  },
  description:
    "A seasoned frontend web developer with a passion for creating engaging and interactive websites.",
  metadataBase: new URL("https://portfolio-robby.netlify.app/"),
  openGraph: {
    title: {
      template: "Coding with Robby | %s",
      default: "Coding with Robby | Frontend Developer",
    },
    description:
      "A seasoned frontend web developer with a passion for creating engaging and interactive websites.",
    url: "https://portfolio-robby.netlify.app/",
    siteName: "Coding with Robby",
    images: [
      {
        url: "/public/images/hero.png",
        width: 1000,
        height: 1200,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  keywords: [
    "frontend web developer",
    "frontend developer",
    "frontend engineer",
    "react",
    "nextjs",
    "creative",
    "creative developer",
    "creative frontend developer",
    "web developer",
    "web engineer",
    "tech",
    "indonesia",
    "indonesian",
    "indonesian developer",
    "indonesian web developer",
    "indonesian frontend developer",
    "indonesian web engineer",
    "indonesian frontend engineer",
    "indonesian creative developer",
    "portfolio",
    "portfolio website",
    "portfolio web",
    "portfolio web developer",
    "portfolio frontend developer",
    "portfolio web engineer",
  ],
  twitter: {
    card: "summary_large_image",
    title: {
      template: "Coding with Robby | %s",
      default: "Coding with Robby | Frontend Developer",
    },
    description:
      "A seasoned frontend web developer with a passion for creating engaging and interactive websites.",
    creator: "@robbynovianto_",
    images: [
      {
        url: "/public/images/og-images.jpg",
        width: 1000,
        height: 1200,
      },
    ],
  },
  category: "technology",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <SmoothScrollProvider
            options={{
              smooth: true,
              mobile: {
                smooth: true,
              },
              tablet: {
                smooth: true,
              },
            }}
          >
          {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}