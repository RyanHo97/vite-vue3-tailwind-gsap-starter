<template>
  <div class="demo-card">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">3D变换</h2>
    <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
      <div ref="threeDBox" class="w-16 h-16 bg-green-500 shadow-md transform-style-preserve-3d"></div>
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
const threeDBox = ref<HTMLElement | null>(null)

// 3D变换动画
const playAnimation = () => {
  if (!threeDBox.value) return
  
  gsap.to(threeDBox.value, {
    duration: 2,
    rotationX: 360,
    rotationY: 180,
    scale: 1.5,
    backgroundColor: '#10b981',
    ease: 'power2.inOut',
    repeat: 1,
    yoyo: true
  })
}

const resetAnimation = () => {
  if (!threeDBox.value) return
  gsap.to(threeDBox.value, {
    duration: 0.5,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    backgroundColor: '#10b981',
    ease: 'power2.out'
  })
}

onMounted(() => {
  // 设置初始状态
  if (threeDBox.value) {
    gsap.set(threeDBox.value, { rotationY: 0, rotationX: 0 })
  }
})
</script>