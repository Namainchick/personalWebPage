import type { Metadata } from "next";
import { OpenApp } from "@/components/os/OpenApp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email, LinkedIn, GitHub, TikTok.",
};

export default function ContactPage() {
  return <OpenApp app="mail" />;
}
