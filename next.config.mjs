import nextPWA from '@ducanh2912/next-pwa';

const isProd = process.env.NODE_ENV === 'production'; // 判断环境是否生产环境
const buildWithDocker = process.env.DOCKER === 'true'; // 判断是否使用 Docker 构建

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  workboxOptions: {
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 5000000, // 5MB
  },
});
/** @type {import('next').NextConfig} */

const nextConfig = {
  compress: isProd, // 开启 gzip 压缩
};

export default withPWA(nextConfig);
// export default isProd ? withBundleAnalyzer(withPWA(nextConfig)) : nextConfig;
// export default nextConfig;
