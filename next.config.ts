import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    domains: ['tomsher.co', 'luxmanager.luxmetallic.com'], // Add 'tomsher.co' to the list of allowed domains
  },
  httpAgentOptions: {
    keepAlive: false,
  },
  // // Ignore errors - CHANGE DURING PRODUCTION
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // const NextConfig = {
  //   reactStrictMode: false,
  // }


};

export default nextConfig;
