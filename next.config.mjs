/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Tell Next.js to generate a static export into `out/`
  // when you run `next build`.
  output: "export",
  images: {
    unoptimized: true,
  },

  // GitHub Pages serves this repo at:
  // https://keepvaibin.github.io/aminecraftserver
  // so in production we need a basePath + assetPrefix.
  basePath: isProd ? "/aminecraftserver" : "",
  assetPrefix: isProd ? "/aminecraftserver/" : "",
};

export default nextConfig;
