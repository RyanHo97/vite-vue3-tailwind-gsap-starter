<template>
  <div class="demo-card">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">物理动画</h2>
    <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
      <div ref="physicsBox" class="w-12 h-12 bg-yellow-500 rounded-full shadow-md"></div>
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
const physicsBox = ref<HTMLElement | null>(null)

// 物理动画
const playAnimation = () => {
  if (!physicsBox.value) return
  
  gsap.to(physicsBox.value, {
    duration: 1,
    y: 150,
    ease: 'bounce.out',
    onComplete: () => {
      gsap.to(physicsBox.value, {
        duration: 0.8,
        x: 100,
        ease: 'power2.inOut'
      })
    }
  })
}

const resetAnimation = () => {
  if (!physicsBox.value) return
  gsap.to(physicsBox.value, {
    duration: 0.5,
    x: 0,
    y: 0,
    ease: 'power2.out'
  })
}

onMounted(() => {
  // 设置初始状态
  if (physicsBox.value) {
    gsap.set(physicsBox.value, { y: 0 })
  }
})
</script>