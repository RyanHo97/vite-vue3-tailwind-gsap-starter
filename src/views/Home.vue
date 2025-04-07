<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  gsap.from('.logo', {
    duration: 1.5,
    opacity: 0,
    y: -50,
    ease: 'elastic.out(1, 0.5)'
  })
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden transition-colors duration-300 dark:bg-gray-900">
    <!-- 主要内容 -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center">
      <div class="mx-auto text-center">
        <!-- Logo -->
        <div class="flex justify-center mb-24">
          <img 
            src="/vite.svg" 
            class="logo w-24 h-24 filter drop-shadow-lg"
            alt="Vite logo" 
          />
        </div>
        
        <!-- 标题 -->
        <h1 class="hero-title text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Vite + Vue 3 + Tailwind + GSAP
        </h1>
        
        <!-- 副标题 -->
        <p class="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
          现代化前端开发脚手架
        </p>
        
        <!-- 按钮组 -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <router-link to="/about" class="action-btn px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 dark:from-blue-500 dark:to-indigo-500">
            了解更多
          </router-link>
          <router-link to="/contact" class="action-btn px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            联系我们
          </router-link>
        </div>
        
        <!-- 特性卡片 -->
        <div class="feature-cards grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div class="feature-card p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-blue-500 dark:text-blue-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 dark:text-white">高性能</h3>
            <p class="text-gray-600 dark:text-gray-300">基于Vite构建，享受闪电般的开发体验</p>
          </div>
          
          <div class="feature-card p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-purple-500 dark:text-purple-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 dark:text-white">现代设计</h3>
            <p class="text-gray-600 dark:text-gray-300">TailwindCSS提供的优雅UI设计系统</p>
          </div>
          
          <div class="feature-card p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-green-500 dark:text-green-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 dark:text-white">流畅动画</h3>
            <p class="text-gray-600 dark:text-gray-300">GSAP提供专业级的动画效果</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>