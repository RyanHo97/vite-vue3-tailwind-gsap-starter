<template>
  <footer class="bg-gray-100 dark:bg-gray-800 py-4 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-gray-500 dark:text-gray-400 text-sm">
        {{ new Date().getFullYear() }} © Ryanho97
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores'

// 使用Pinia store管理暗黑模式
const themeStore = useThemeStore()
</script>
