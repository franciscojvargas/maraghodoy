import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { es: "/", en: "/en" },
  },
};

export default function Home() {
  return <HomeClient />;
}
