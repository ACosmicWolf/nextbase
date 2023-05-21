/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        hostname: "firebasestorage.googleapis.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
