export const metadata = {
  title: "NextBase",
  description: "A Social media website built with Next.js and Firebase",
  keywords: "Next.js, Firebase, Social Media, NextBase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
