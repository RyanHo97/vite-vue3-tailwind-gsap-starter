<template>
  <div class="demo-card">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">变形动画</h2>
    <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
      <div ref="morphBox" class="w-24 h-24 bg-pink-500 rounded-md shadow-md mx-auto"></div>
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
const morphBox = ref<HTMLElement | null>(null)

// 变形动画
const playAnimation = () => {
  if (!morphBox.value) return
  
  gsap.to(morphBox.value, {
    duration: 1.5,
    borderRadius: '50%',
    scale: 1.2,
    backgroundColor: '#ec4899',
    ease: 'elastic.out(1, 0.3)',
    repeat: 1,
    yoyo: true
  })
}

const resetAnimation = () => {
  if (!morphBox.value) return
  gsap.to(morphBox.value, {
    duration: 0.5,
    borderRadius: '0.5rem',
    scale: 1,
    backgroundColor: '#ec4899',
    ease: 'power2.out'
  })
}

onMounted(() => {
  // 设置初始状态
  if (morphBox.value) {
    gsap.set(morphBox.value, { borderRadius: '0.5rem' })
  }
})
</script>