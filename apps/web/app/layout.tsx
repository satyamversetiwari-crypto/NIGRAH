import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NIGRAH — Financial Threat Intelligence",
  description: "An intelligence and predictive technology initiative connecting public evidence, financial threat behavior, and emerging patterns.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
