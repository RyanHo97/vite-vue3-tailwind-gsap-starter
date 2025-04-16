<template>
  <div class="demo-card">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">路径动画</h2>
    <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
      <!-- 动画元素 -->
      <div ref="pathBox" class="w-16 h-16 bg-indigo-500 rounded-full shadow-md absolute flex items-center justify-center">
        <span class="text-white text-xs font-bold">GSAP</span>
      </div>
      
      <!-- SVG路径 -->
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path 
          ref="motionPath" 
          d="M20,100 C90,20 200,20 300,100 C400,180 320,180 200,120" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          class="text-gray-300 dark:text-gray-600"
        />
      </svg>
      
      <!-- 控制按钮 -->
      <div class="absolute bottom-4 left-0 right-0 text-center">
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

// 注册MotionPathPlugin插件
gsap.registerPlugin(MotionPathPlugin)

// 引用元素
const pathBox = ref<HTMLElement | null>(null)
const motionPath = ref<SVGPathElement | null>(null)

// 路径动画
const playAnimation = () => {
  if (!pathBox.value || !motionPath.value) return
  
  // 使用MotionPathPlugin进行路径动画
  gsap.to(pathBox.value, {
    duration: 4,
    motionPath: {
      path: motionPath.value,
      align: 'self',  // 使用'self'而不是motionPath.value
      alignOrigin: [0.5, 0.5],
      autoRotate: true,
      start: 0,
      end: 1
    },
    ease: 'power1.inOut',
    onComplete: () => console.log('路径动画完成')
  })
}

// 重置动画
const resetAnimation = () => {
  if (!pathBox.value) return
  
  // 停止当前动画并重置位置
  gsap.killTweensOf(pathBox.value)
  gsap.to(pathBox.value, {
    duration: 0.5,
    x: 0,
    y: 0,
    rotation: 0,
    ease: 'power2.out'
  })
}

onMounted(() => {
  // 设置初始状态
  if (pathBox.value) {
    gsap.set(pathBox.value, { 
      x: 0, 
      y: 0,
      transformOrigin: '50% 50%' 
    })
  }
})
</script>