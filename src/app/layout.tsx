import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "buildnow",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/image/favicon-light.ico",
        href: "/image/favicon-light.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/image/favicon-dark.ico",
        href: "/image/favicon-dark.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
