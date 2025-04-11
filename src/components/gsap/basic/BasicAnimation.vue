<template>
  <div class="demo-card">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">基础动画</h2>
    <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
      <div ref="basicBox" class="w-16 h-16 bg-blue-500 rounded-md shadow-md"></div>
      <div class="mt-4">
        <button @click="playAnimation" class="btn-primary">播放动画</button>
        <button @click="resetAnimation" class="btn-secondary ml-2">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// 引用元素
const basicBox = ref<HTMLElement | null>(null)

// 基础动画
const playAnimation = () => {
  if (!basicBox.value) return
  
  gsap.to(basicBox.value, {
    duration: 1,
    x: 200,
    rotation: 360,
    backgroundColor: '#ff6b6b',
    ease: 'back.out(1.7)',
    onComplete: () => console.log('动画完成')
  })
}

const resetAnimation = () => {
  if (!basicBox.value) return
  
  gsap.to(basicBox.value, {
    duration: 0.5,
    x: 0,
    rotation: 0,
    backgroundColor: '#3b82f6',
    ease: 'power2.out'
  })
}

onMounted(() => {
  // 初始化状态可以在这里设置
})
</script>