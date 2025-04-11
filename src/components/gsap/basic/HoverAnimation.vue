<template>
  <div class="demo-card">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">交互动画</h2>
    <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
      <div 
        ref="hoverBox" 
        class="w-24 h-24 bg-purple-500 rounded-md shadow-md mx-auto cursor-pointer flex items-center justify-center text-white font-bold"
      >
        悬停我
      </div>
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-300">将鼠标悬停在上方的方块上</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// 引用元素
const hoverBox = ref<HTMLElement | null>(null)

// 悬停动画
const setupHoverAnimation = () => {
  if (!hoverBox.value) return
  
  hoverBox.value.addEventListener('mouseenter', () => {
    gsap.to(hoverBox.value, {
      duration: 0.3,
      scale: 1.2,
      backgroundColor: '#9333ea',
      rotation: 15,
      ease: 'power2.out'
    })
  })
  
  hoverBox.value.addEventListener('mouseleave', () => {
    gsap.to(hoverBox.value, {
      duration: 0.3,
      scale: 1,
      backgroundColor: '#8b5cf6',
      rotation: 0,
      ease: 'power2.in'
    })
  })
}

onMounted(() => {
  // 初始化动画
  setupHoverAnimation()
})
</script>