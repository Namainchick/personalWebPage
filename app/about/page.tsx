import type { Metadata } from "next";
import { OpenApp } from "@/components/os/OpenApp";

export const metadata: Metadata = {
  title: "About",
  description: "Who Nam is, in a terminal: Product Engineer at Arbio, CS at TUHH, hackathons, TikTok.",
};

export default function AboutPage() {
  return <OpenApp app="terminal" />;
}
