import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Verify your account | Instagram",
  description: "",
};

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-gray-200`}>
        {children}
      </body>
    </html>
  );
}
