import type { Metadata } from "next";
import { OpenApp } from "@/components/os/OpenApp";

export const metadata: Metadata = {
  title: "Content",
  description: "@namb.tech on TikTok and the FAANG/MANGO+ für Deutsche Discord.",
};

export default function ContentPage() {
  return <OpenApp app="content" />;
}
