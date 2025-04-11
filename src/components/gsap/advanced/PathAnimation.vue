<template>
  <div class="demo-card">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">路径动画</h2>
    <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
      <div ref="pathBox" class="w-16 h-16 bg-indigo-500 rounded-full shadow-md"></div>
      <svg class="absolute w-full h-full top-0 left-0" viewBox="0 0 300 300">
        <path ref="motionPath" d="M50,150 C100,50 200,50 250,150 S400,250 250,250" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-600"></path>
      </svg>
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
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

// 引用元素
const pathBox = ref<HTMLElement | null>(null)
const motionPath = ref<SVGPathElement | null>(null)

// 路径动画
const playAnimation = () => {
  if (!pathBox.value || !motionPath.value) return
  
  gsap.to(pathBox.value, {
    duration: 3,
    motionPath: {
      path: motionPath.value,
      align: motionPath.value,
      alignOrigin: [0.5, 0.5]
    },
    ease: 'power1.inOut',
    onComplete: () => console.log('路径动画完成')
  })
}

const resetAnimation = () => {
  if (!pathBox.value) return
  gsap.to(pathBox.value, {
    duration: 0.5,
    x: 0,
    y: 0,
    ease: 'power2.out'
  })
}

onMounted(() => {
  // 设置初始状态
  if (pathBox.value) {
    gsap.set(pathBox.value, { x: 0, y: 0 })
  }
})
</script>