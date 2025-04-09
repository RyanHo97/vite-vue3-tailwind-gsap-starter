<script setup lang="ts">
import { gsap } from 'gsap'
import { useRoute } from 'vue-router'
import MobileMenu from './MobileMenu.vue'
import { useThemeStore } from '@/stores'

// 使用Pinia store管理暗黑模式
const themeStore = useThemeStore()

// 计算属性：获取当前暗黑模式状态
const isDarkMode = computed(() => themeStore.isDarkMode)

// 切换暗黑模式的方法
const toggleDarkMode = () => themeStore.toggleDarkMode()

const route = useRoute()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 确保 GSAP 动画在元素加载后执行
onMounted(() => {
  // 添加安全检查
  const logo = document.querySelector('.nav-logo')
  const navItems = document.querySelectorAll('.nav-item')
  const themeToggle = document.querySelector('.theme-toggle')

  if (logo) {
    gsap.from(logo, {
      duration: 1,
      opacity: 0,
      x: -20,
      ease: 'power2.out',
    })
  }

  if (navItems.length > 0) {
    gsap.from(navItems, {
      duration: 0.5,
      opacity: 0,
      y: -10,
      stagger: 0.1,
      ease: 'power1.out',
      delay: 0.3,
    })
  }
  
  if (themeToggle) {
    gsap.from(themeToggle, {
      duration: 0.8,
      opacity: 0,
      scale: 0.5,
      ease: 'back.out(1.7)',
      delay: 0.5
    })
  }
})
</script>

<template>
  <!-- 完整的导航结构 -->
  <nav class="sticky top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- 左侧logo和导航 -->
        <div class="flex items-center">
          <!-- Logo部分 -->
          <router-link 
            to="/" 
            class="flex items-center space-x-2 group"
            aria-label="首页"
          >
            <span class="text-2xl font-bold text-gray-800 dark:text-white">
              <span class="text-blue-600 dark:text-blue-400">Ryan</span>Ho
            </span>
          </router-link>

          <!-- 桌面导航菜单 -->
          <div class="hidden lg:flex lg:ml-12 lg:space-x-8">
            <router-link
              v-for="link in [
                { path: '/', name: '首页' },
                { path: '/about', name: '关于' },
                { path: '/gsapTest', name: 'GSAP' },
                { path: '/threeTest', name: 'Threejs' },
              ]"
              :key="link.path"
              :to="link.path"
              class="nav-item px-3 py-2 text-base font-medium transition-colors duration-300"
              :class="
                route.path === link.path
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              "
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>

        <!-- 右侧操作区域 -->
        <div class="flex items-center space-x-6">
          <!-- 暗黑模式切换 -->
          <button
            @click="toggleDarkMode"
            class="theme-toggle p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            :aria-label="isDarkMode ? '切换到亮色模式' : '切换到暗色模式'"
          >
            <svg
              class="w-6 h-6 text-gray-700 dark:text-gray-300"
              :class="{ 'rotate-180': isDarkMode }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="isDarkMode"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- 移动端菜单按钮 -->
          <button
            @click="toggleMenu"
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            :aria-label="isMenuOpen ? '关闭菜单' : '打开菜单'"
          >
            <svg
              class="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <MobileMenu 
      :is-open="isMenuOpen" 
      @close="isMenuOpen = false" 
      :current-route="route.path"
    />
  </nav>
</template>

<style scoped>
/* 确保动画流畅 */
.nav-item {
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.nav-item:hover::after,
.router-link-active::after {
  width: 100%;
}
</style>