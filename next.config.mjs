/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // removed basePath and assetPrefix because on a custom subdomain,
  // app is served from the root "/"
};

export default nextConfig;