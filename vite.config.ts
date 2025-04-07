import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { loadEnv } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  
  return {
    // 路径别名配置
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      }
    },
    
    // 插件配置
    plugins: [
      vue(),
      tailwindcss(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
      }),
      // 自动导入组件
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: true,
      }),
      // 构建分析插件 - 仅在生产环境使用
      mode === 'production' && visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: 'dist/stats.html',
      }),
    ],
    
    // 开发服务器配置
    server: {
      port: 3000,
      open: true,
      cors: true,
    },
    
    // 构建优化配置
    build: {
      // 输出目录
      outDir: env.VITE_APP_OUTPUT_DIR || 'dist',
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 启用源码映射
      sourcemap: false,
      // 启用压缩
      minify: 'terser',
      // Terser 配置
      terserOptions: {
        compress: {
          drop_console: env.VITE_APP_DROP_CONSOLE === 'true',
          drop_debugger: mode === 'production',
        },
      },
      // 分块策略
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          // 分包配置
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            gsap: ['gsap'],
          },
        },
      },
    },
    
    // 预构建优化
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'gsap'],
    },
  }
})
