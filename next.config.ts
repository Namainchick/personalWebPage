import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),
  async rewrites() {
    return [
      { source: "/cv", destination: "/Namanh_Bui_Vu_CV.pdf" },
      { source: "/cv.pdf", destination: "/Namanh_Bui_Vu_CV.pdf" },
      { source: "/resume", destination: "/Namanh_Bui_Vu_CV.pdf" },
      { source: "/resume.pdf", destination: "/Namanh_Bui_Vu_CV.pdf" },
      { source: "/lebenslauf", destination: "/Namanh_Bui_Vu_CV.pdf" },
    ];
  },
  async redirects() {
    return [
      { source: "/erfahrungen", destination: "/work", permanent: true },
      { source: "/erfahrungen/:id", destination: "/work/:id", permanent: true },
      { source: "/projekte", destination: "/projects", permanent: true },
      { source: "/projekte/:id", destination: "/projects/:id", permanent: true },
      { source: "/competitions", destination: "/hackathons", permanent: true },
      { source: "/coding", destination: "/grind", permanent: true },
      { source: "/kontakt", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
