// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    remotePatterns: [
      {
        hostname: 'm.media-amazon.com',
      },
      {
        hostname: 'www.bcliquorstores.com',
      },
    ],
  },
};

export default nextConfig;
