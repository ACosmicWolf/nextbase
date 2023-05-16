import "./globals.scss";

import NavMenu from "./NavMenu";
import { Metadata } from "next";
import AuthProvider from "./AuthProvider";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NextBase",
  description: "A Social media website built with Next.js and Firebase",
  keywords: "nextjs, firebase, social media, typescript, react, nextbase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <AuthProvider>
          <NavMenu />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
