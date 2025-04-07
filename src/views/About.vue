<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  gsap.from('.about-content', {
    duration: 1,
    opacity: 0,
    y: 20,
    stagger: 0.2,
    ease: 'power3.out'
  })
})
</script>

<template>
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 about-content">关于我们</h1>
      
      <div class="space-y-6">
        <p class="text-lg text-gray-700 about-content">
          这是一个基于Vite、Vue 3、TailwindCSS和GSAP构建的现代化前端开发脚手架。我们致力于提供最佳的开发体验和性能优化。
        </p>
        
        <p class="text-lg text-gray-700 about-content">
          这个项目整合了当前最流行的前端技术栈，帮助开发者快速搭建高质量的Web应用。
        </p>
        
        <h2 class="text-2xl font-semibold mt-8 mb-4 about-content">技术栈</h2>
        
        <ul class="list-disc pl-6 space-y-2">
          <li class="text-lg text-gray-700 about-content">Vite - 极速的前端构建工具</li>
          <li class="text-lg text-gray-700 about-content">Vue 3 - 渐进式JavaScript框架</li>
          <li class="text-lg text-gray-700 about-content">TailwindCSS - 实用优先的CSS框架</li>
          <li class="text-lg text-gray-700 about-content">GSAP - 专业级的JavaScript动画库</li>
          <li class="text-lg text-gray-700 about-content">TypeScript - 类型安全的JavaScript超集</li>
          <li class="text-lg text-gray-700 about-content">Vue Router - Vue.js官方路由</li>
        </ul>
      </div>
      
      <div class="mt-12 about-content">
        <router-link to="/" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>