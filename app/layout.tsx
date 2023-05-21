import "./globals.scss";

import NavMenu, { BottomNavMenu } from "./NavMenu";
import { Metadata } from "next";
import AuthProvider from "./AuthProvider";

import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "700"],
});

import previewimage from "@/public/previewimage.svg";

export const metadata: Metadata = {
  title: "NextBase",
  description: "A Social media website built with Next.js and Firebase",
  keywords: "nextjs, firebase, social media, typescript, react, nextbase",
  openGraph: {
    locale: "en_US",
    url: "https://nextbase.vercel.app",
    title: "NextBase",
    description: "A Social media website built with Next.js and Firebase",
    images: [
      {
        url: previewimage.src,
        width: 800,
        height: 400,
        alt: "NextBase",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: previewimage.src,
        width: 800,
        height: 400,
        alt: "NextBase",
      },
    ],
    card: "summary_large_image",
    title: "NextBase",
    description: "A Social media website built with Next.js and Firebase",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rubik.className}>
      <body>
        <AuthProvider>
          <NavMenu />
          <div className="children">{children}</div>
          <BottomNavMenu />
        </AuthProvider>
      </body>
    </html>
  );
}
