import type { Metadata } from "next";
import { OpenApp } from "@/components/os/OpenApp";

export const metadata: Metadata = {
  title: "Work",
  description: "Arbio, Position One, Flohh, TUHH. What Nam built where.",
};

export default function WorkPage() {
  return <OpenApp app="work" />;
}
