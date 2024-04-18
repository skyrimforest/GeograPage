import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  // css:{
	// 	//* css模块化
	// 	 modules: { // css模块化 文件以.module.[css|less|scss]结尾
	// 	     generateScopedName: '[name]__[local]___[hash:base64:5]',
	// 	     hashPrefix: 'prefix',
	//     },
	// }
})
