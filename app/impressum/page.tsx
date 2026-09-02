import type { Metadata } from "next";
import { OpenApp } from "@/components/os/OpenApp";

export const metadata: Metadata = { title: "Impressum", robots: { index: false } };

export default function ImpressumPage() {
  return <OpenApp app="text" item="impressum" />;
}
