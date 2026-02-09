const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  powerByHeader: false,
  async redirects() {
    return [
      { source: "/principal", destination: "/#principal", permanent: false },
      { source: "/rider", destination: "/#rider", permanent: false },
      { source: "/contacto", destination: "/#contacto", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
