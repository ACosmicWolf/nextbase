import { Metadata } from "next";
import AuthProvider from "./AuthProvider";

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
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
