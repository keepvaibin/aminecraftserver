/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // We removed basePath and assetPrefix because on a custom subdomain,
  // your app is served from the root "/"
};

export default nextConfig;