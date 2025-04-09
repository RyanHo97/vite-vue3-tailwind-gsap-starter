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
    base: '/',
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
      // 启用压缩
      minify: 'terser',
      // 调整分块大小警告限制
      chunkSizeWarningLimit: 500,
      // Terser 配置 - 简化压缩选项
      terserOptions: {
        compress: {
          drop_console: true,
          pure_funcs: ['console.log', 'console.warn', 'console.info', 'console.debug'],
          passes: 4,
          ecma: 2020,
          toplevel: true,
          keep_infinity: true,
          module: true,
        },
        format: {
          ecma: 2020 // 输出ES2020格式
        },
      },
      // 资源处理
      assetsDir: 'assets',
      // 内联小于此大小的资源
      assetsInlineLimit: 4096,
      // 分块策略
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          // 分包配置
          manualChunks: (id) => {
            // Vue相关库打包在一起
            if (id.includes('node_modules/vue') || 
                id.includes('node_modules/vue-router') || 
                id.includes('node_modules/pinia')) {
              return 'vue-core';
            }
            
            // GSAP库单独打包
            if (id.includes('node_modules/gsap')) {
              return 'gsap';
            }

            // Three.js模块分包
            if (id.includes('node_modules/three')) {
              // 核心模块
              if (id.includes('core') || id.includes('math') || id.includes('constants.js') || 
                  id.includes('Scene.js') || id.includes('Object3D.js') || id.includes('Layers.js') || 
                  id.includes('WebGLRenderer.js') || id.includes('Camera.js')) {
                return 'three-core';
              }
              // 几何模块
              if (id.includes('geometries') || id.match(/Geometry\.js$/)) {
                return 'three-geometries';
              }
              // 材质模块
              if (id.includes('materials') || id.match(/Material\.js$/)) {
                return 'three-materials';
              }
              // 其他模块
              return 'three-extras';
            }
          },
        },
      },
    },
    
    // 预构建优化
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'gsap'],
      exclude: ['three']
    },
  }
})
