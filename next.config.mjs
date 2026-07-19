/** @type {import('next').NextConfig} */
const basePath = process.env.PAGES_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    unoptimized: true,
    qualities: [75, 82, 90],
  },
};

export default nextConfig;
