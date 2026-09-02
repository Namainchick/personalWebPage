import type { Metadata } from "next";
import { OpenApp } from "@/components/os/OpenApp";

export const metadata: Metadata = {
  title: "Hackathons",
  description: "Six hackathon wins in eight months: Hangzhou, Amsterdam, Hamburg, Berlin.",
};

export default function HackathonsPage() {
  return <OpenApp app="finder" item="hackathons" />;
}
