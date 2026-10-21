import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "./components/SiteNav";
import RouteTransition from "./components/RouteTransition";

export const metadata: Metadata = {
  title: "Yasin Alam — Rooted in Bengal",
  description: "Software engineer and digital maker from West Bengal."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteNav/><RouteTransition>{children}</RouteTransition></body></html>;
}
