const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  /**
   * Export estático para Cloudflare Pages. Sin servidor de imágenes
   * (los assets se optimizan en build con scripts/optimize-images.mjs).
   * Redirects y cache headers viven en public/_redirects y public/_headers.
   */
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
