/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allowing external souce for images
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com', 'nextui.org'],
    remotePatterns: [
      {
        protocol: `${process.env.IMG_URL_API_PROTOCOL}`,
        hostname: `${process.env.IMG_URL_API_HOST}`,
        port: `${process.env.IMG_URL_API_PORT}`,
        pathname: `${process.env.IMG_URL_API_PATH}`
      }
    ]
  },
  reactStrictMode: false
};

module.exports = nextConfig;
