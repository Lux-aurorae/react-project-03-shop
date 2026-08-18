import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS 압축을 끕니다.
    // Vite의 기본 압축기(lightningcss)가 배포 환경에서 빠지는 경우가 있어,
    // "로컬은 되는데 Vercel 빌드만 실패"하는 문제를 미리 막기
    cssMinify: false,
  },
});