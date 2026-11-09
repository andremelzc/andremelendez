import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Incrusta el CSS en el HTML: quita un viaje de red antes del primer
    // pintado (LCP en móvil con throttling real: 1,66 s -> 0,85 s). Es una
    // función experimental de Next; para desactivarla basta borrar esta línea.
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
