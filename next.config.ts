import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),
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
