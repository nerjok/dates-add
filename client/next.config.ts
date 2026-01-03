import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  /* config options here */
};

// export default nextConfig;
const withNextIntl = createNextIntlPlugin("./app/config/request.ts");
export default withNextIntl(nextConfig);
