"use client";

import Image from "next/image";
import type { CardDetail } from "@/data/homepage-details";

interface HomepageCardExpandedProps {
  detail: CardDetail;
  isColored: boolean;
}

export default function HomepageCardExpanded({
  detail,
  isColored,
}: HomepageCardExpandedProps) {
  const textClass = isColored ? "text-white/80" : "text-gray-600";
  const headingClass = isColored ? "text-white" : "text-gray-900";

  return (
    <div className="space-y-6">
      <h2 className={`text-3xl font-bold ${headingClass}`}>{detail.title}</h2>

      {detail.images && detail.images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {detail.images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`${detail.title} ${i + 1}`}
              width={400}
              height={256}
              className="rounded-xl max-h-64 object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      <p className={`text-base leading-relaxed whitespace-pre-line ${textClass}`}>
        {detail.content}
      </p>

      {detail.links && detail.links.length > 0 && (
        <div className="flex flex-wrap gap-4 pt-2">
          {detail.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className={`inline-flex items-center gap-1 font-medium transition-all duration-200 ${
                isColored
                  ? "text-white/80 hover:text-white"
                  : "text-teal-600 hover:text-teal-700"
              }`}
            >
              {link.label} &rarr;
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
