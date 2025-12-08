/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Make sure this matches your repo name exactly!
  basePath: isProd ? "/aminecraftserver" : "",
  assetPrefix: isProd ? "/aminecraftserver/" : "",
};

export default nextConfig;