import type { Metadata } from "next";
import { OpenApp } from "@/components/os/OpenApp";

export const metadata: Metadata = {
  title: "Projects",
  description: "Minus One, football prediction models, claude-multi-account, Hundewelt.space.",
};

export default function ProjectsPage() {
  return <OpenApp app="finder" item="projects" />;
}
