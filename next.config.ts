import 'shared/config/env';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  turbopack: {
    root: __dirname,
  },

  output: 'standalone',
};

export default nextConfig;
