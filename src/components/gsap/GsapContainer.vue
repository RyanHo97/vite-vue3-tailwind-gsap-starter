<template>
  <div class="gsap-container h-screen">
    <div class="flex h-full relative" :class="{ 'menu-collapsed': !isMenuOpen }">
      <!-- 左侧菜单 -->
      <SideMenu 
        :menu-items="menuItems" 
        title="GSAP 案例" 
        @select-item="selectExample"
        @menu-toggle="handleMenuToggle"
      />
      
      <!-- 右侧内容区域 -->
      <div class="flex-1 p-4 overflow-y-auto border-l border-gray-200 dark:border-gray-700 w-full transition-all duration-300">
        <BasicAnimations v-if="currentExample === 'basic'" />
        <AdvancedAnimations v-if="currentExample === 'advanced'" />
        <ScrollAnimations v-if="currentExample === 'scroll'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useGraphicsEngine } from '../../composables/useGraphicsEngine'
import SideMenu from '../layout/SideMenu.vue'
import BasicAnimations from './basic/index.vue'
import AdvancedAnimations from './advanced/index.vue'
import ScrollAnimations from './scroll/ScrollAnimations.vue'

// 使用图形引擎
const { loadEngine, isEngineLoaded } = useGraphicsEngine()

// 控制侧边栏状态
const isMenuOpen = ref(true)

// 菜单项配置
const menuItems = ref([
  { id: 'basic', title: '基础动画', active: true },
  { id: 'advanced', title: '高级动画', active: false },
  { id: 'scroll', title: '滚动触发动画', active: false }
])

// 当前选中的示例
const currentExample = ref('basic')

// 选择示例
const selectExample = (id: string) => {
  currentExample.value = id
  
  // 更新菜单项激活状态
  menuItems.value = menuItems.value.map(item => ({
    ...item,
    active: item.id === id
  }))
}

// 处理菜单切换事件
const handleMenuToggle = (isOpen: boolean) => {
  isMenuOpen.value = isOpen
}

onMounted(async () => {
  try {
    // 确保GSAP引擎已加载
    if (!isEngineLoaded('gsap')) {
      await loadEngine('gsap')
    }
  } catch (error) {
    console.error('Failed to initialize GSAP:', error)
  }
})
</script>

<style scoped>
.gsap-container {
  width: 100%;
}

.flex {
  display: flex;
  width: 100%;
}

.flex > :first-child {
  border-right: 1px solid #e5e7eb;
  dark:border-gray-700;
  transition: width 0.3s ease, min-width 0.3s ease;
}

/* 当菜单收起时的样式 */
.menu-collapsed > div:first-child {
  width: 0 !important;
  min-width: 0 !important;
  overflow: hidden;
  border-right: none;
}

.menu-collapsed > div:last-child {
  flex: 1;
  width: 100%;
}
</style>