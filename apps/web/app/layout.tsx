import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NIGRAH — Check before you pay",
  description: "Understand suspicious financial messages with clear, evidence-led guidance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
