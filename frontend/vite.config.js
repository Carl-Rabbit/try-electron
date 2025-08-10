import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // 关键配置：将基础路径设置为空字符串或 './'
  // 这会使所有资源的路径都变成相对路径
  base: './', 
});
