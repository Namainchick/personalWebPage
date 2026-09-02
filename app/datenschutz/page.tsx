import type { Metadata } from "next";
import { OpenApp } from "@/components/os/OpenApp";

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false } };

export default function DatenschutzPage() {
  return <OpenApp app="text" item="datenschutz" />;
}
