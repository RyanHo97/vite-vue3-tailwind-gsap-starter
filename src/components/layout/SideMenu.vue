<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
  menuItems: {
    title: string
    id: string
    active?: boolean
  }[]
  title?: string
}>()

const emit = defineEmits(['select-item', 'menu-toggle'])

// 控制侧边栏在移动设备上的展开/收起状态
const isMenuOpen = ref(true) // 默认为打开状态，但在移动设备上会被checkMobile()修改
const isMobile = ref(false)
const sideMenuRef = ref<HTMLElement | null>(null)

// 检测是否为移动设备
const checkMobile = () => {
  const wasMobile = isMobile.value
  isMobile.value = window.innerWidth < 768
  
  // 在移动设备上默认收起侧边栏
  if (isMobile.value) {
    // 只有在首次检测或从桌面切换到移动设备时才自动收起
    if (!wasMobile || (wasMobile !== isMobile.value)) {
      isMenuOpen.value = false
    }
  } else if (!isMobile.value && !isMenuOpen.value && (wasMobile !== isMobile.value)) {
    // 从移动设备切换到桌面时自动展开
    isMenuOpen.value = true
  }
}

// 切换侧边栏状态
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  animateMenu()
  // 通知父组件侧边栏状态已更改
  emit('menu-toggle', isMenuOpen.value)
}

// 使用GSAP动画切换侧边栏
const animateMenu = () => {
  if (!sideMenuRef.value) return
  
  if (isMenuOpen.value) {
    // 展开侧边栏
    gsap.to(sideMenuRef.value, {
      x: 0,
      width: isMobile.value ? '100%' : '240px',
      minWidth: isMobile.value ? '0' : '240px',
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        // 确保展开后样式正确
        if (sideMenuRef.value) {
          sideMenuRef.value.style.overflow = 'visible';
        }
      }
    })
  } else {
    // 收起侧边栏 - 修改动画逻辑，确保菜单收起后文字内容完全隐藏
    gsap.to(sideMenuRef.value, {
      x: isMobile.value ? '-100%' : '-100%',
      duration: 0.3,
      ease: 'power2.out',
      onStart: () => {
        // 开始动画时添加overflow:hidden，确保文字内容不可见
        if (sideMenuRef.value) {
          sideMenuRef.value.style.overflow = 'hidden';
        }
      },
      onComplete: () => {
        // 收起后设置宽度为0，确保不占用布局空间
        if (sideMenuRef.value) {
          gsap.set(sideMenuRef.value, { width: 0, minWidth: 0 });
        }
      }
    })
  }
}

const handleItemClick = (itemId: string) => {
  emit('select-item', itemId)
  // 在移动设备上点击菜单项后自动收起侧边栏
  if (isMobile.value) {
    isMenuOpen.value = false
    animateMenu()
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  // 初始化侧边栏位置
  if (sideMenuRef.value) {
    if (!isMenuOpen.value) {
      // 移动端时完全收起到左侧边缘
      gsap.set(sideMenuRef.value, { 
        x: '-100%',
        width: 0,
        minWidth: 0,
        overflow: 'hidden'
      })
    }
  }
})

// 在组件销毁前移除事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <!-- 三角形指示器 - 移到菜单外部，确保始终可见 -->
  <div 
    class="menu-toggle-triangle"
    @click="toggleMenu"
    :class="{ 'left-240': isMenuOpen && !isMobile }"
  >
    <div class="triangle" :class="{ 'triangle-open': isMenuOpen }"></div>
  </div>
  
  <!-- 侧边栏菜单 -->
  <div 
    ref="sideMenuRef"
    class="side-menu bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full transition-colors duration-300 fixed md:relative z-40"
    :class="{ 'menu-collapsed': !isMenuOpen }"
  >
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">{{ title || '案例菜单' }}</h2>
      <!-- 移动端关闭按钮 -->
      <button 
        v-if="isMobile && isMenuOpen" 
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        @click="toggleMenu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <ul class="py-2">
      <li 
        v-for="item in menuItems" 
        :key="item.id"
        class="px-4 py-2 cursor-pointer transition-colors duration-200"
        :class="item.active 
          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
        @click="handleItemClick(item.id)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
  
  <!-- 移动端背景遮罩 -->
  <div 
    v-if="isMobile && isMenuOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 z-30"
    @click="toggleMenu"
  ></div>
</template>

<style scoped>
.side-menu {
  width: 240px;
  min-width: 240px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: width 0.3s ease, min-width 0.3s ease;
}

.menu-collapsed {
  width: 0;
  min-width: 0;
  overflow: hidden; /* 添加overflow:hidden，确保文字内容不可见 */
}

/* 三角形指示器样式 */
.menu-toggle-triangle {
  position: fixed;
  top: 50%;
  left: 0; /* 默认位于左侧边缘 */
  transform: translateY(-50%);
  width: 28px; /* 增大按钮宽度 */
  height: 52px; /* 增大按钮高度 */
  background-color: rgba(59, 130, 246, 0.85); /* 蓝色背景带透明度 */
  border-radius: 0 8px 8px 0; /* 增大圆角 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 50; /* 确保在最上层 */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
}

/* 当菜单展开时，三角形指示器位置调整 */
.left-240 {
  left: 240px;
}

.triangle {
  width: 0;
  height: 0;
  border-top: 10px solid transparent; /* 增大三角形 */
  border-bottom: 10px solid transparent; /* 增大三角形 */
  border-right: 10px solid white; /* 默认指向右侧（关闭状态），增大三角形 */
  transition: transform 0.3s ease;
}

.triangle-open {
  transform: rotate(180deg); /* 旋转180度指向左侧（打开状态） */
}

@media (max-width: 768px) {
  .side-menu {
    width: 0; /* 默认收起状态 */
    min-width: 0;
    left: 0; /* 确保在移动端贴边放置 */
  }
  
  /* 当菜单展开时，铺满整个屏幕宽度 */
  .side-menu:not(.menu-collapsed) {
    width: 100% !important;
    max-width: 100%;
  }
  
  /* 移动端三角形指示器样式调整 */
  .menu-toggle-triangle {
    width: 32px; /* 在移动端进一步增大按钮宽度 */
    height: 56px; /* 在移动端进一步增大按钮高度 */
    background-color: rgba(59, 130, 246, 0.9); /* 增加透明度 */
  }
}
</style>