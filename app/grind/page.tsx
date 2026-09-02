import type { Metadata } from "next";
import { OpenApp } from "@/components/os/OpenApp";

export const metadata: Metadata = {
  title: "The Grind",
  description: "NeetCode 150 progress, synced hourly from GitHub.",
};

export default function GrindPage() {
  return <OpenApp app="grind" />;
}
