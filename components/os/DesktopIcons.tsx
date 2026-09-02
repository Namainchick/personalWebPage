import { AppIcon } from "./icons";
import { site } from "@/data/site";

export function DesktopIcons() {
  return (
    <a
      className="os-icon"
      href={site.cvPath}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open CV as PDF in a new tab"
    >
      <AppIcon id="cv" size={52} />
      <span>CV.pdf</span>
    </a>
  );
}
