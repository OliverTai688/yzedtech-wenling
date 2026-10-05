/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // PRD-003 §4.5（PLN-004 Batch A5）：希塔課程原有兩份資料、兩組詳細頁，
  // 合併後舊網址轉址到保留的那一頁。
  async redirects() {
    return [
      { source: '/training/theta-basic-cert', destination: '/training/theta-basic', permanent: true },
      { source: '/training/theta-adv-cert', destination: '/training/theta-advanced-dna', permanent: true },
      { source: '/training/theta-dig-deeper-cert', destination: '/training/theta-dig-deeper', permanent: true },
      // PRD-003 §4.14：FAQ 不再是獨立頁，首頁有精選、各服務與課程頁有自己的常見問題
      { source: '/faq', destination: '/#home-faq', permanent: true },
    ];
  },
};

export default nextConfig;
