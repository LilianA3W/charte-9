import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un package-lock.json existe dans un dossier parent : on fixe la racine
  // pour que Turbopack ne remonte pas jusqu'à D:\LBD\Documents\claude.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
