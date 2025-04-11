<template>
  <div class="demo-card">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">时间轴动画</h2>
    <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
      <div class="flex space-x-4">
        <div ref="timelineBox1" class="w-12 h-12 bg-red-500 rounded-md shadow-md"></div>
        <div ref="timelineBox2" class="w-12 h-12 bg-green-500 rounded-md shadow-md"></div>
        <div ref="timelineBox3" class="w-12 h-12 bg-yellow-500 rounded-md shadow-md"></div>
      </div>
      <div class="mt-4">
        <button @click="playAnimation" class="btn-primary">播放时间轴</button>
        <button @click="resetAnimation" class="btn-secondary ml-2">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

// 引用元素
const timelineBox1 = ref<HTMLElement | null>(null)
const timelineBox2 = ref<HTMLElement | null>(null)
const timelineBox3 = ref<HTMLElement | null>(null)

// 时间轴实例
let timeline: gsap.core.Timeline

// 创建时间轴
const createTimeline = () => {
  timeline = gsap.timeline()
  
  if (!timelineBox1.value || !timelineBox2.value || !timelineBox3.value) return
  
  timeline
    .to(timelineBox1.value, { duration: 0.5, y: 50, ease: 'power1.out' })
    .to(timelineBox2.value, { duration: 0.5, y: 50, ease: 'power1.out' }, '-=0.25')
    .to(timelineBox3.value, { duration: 0.5, y: 50, ease: 'power1.out' }, '-=0.25')
    .to([timelineBox1.value, timelineBox2.value, timelineBox3.value], {
      duration: 0.8,
      rotation: 360,
      scale: 1.2,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.3)'
    })
}

// 播放时间轴动画
const playAnimation = () => {
  if (!timeline) createTimeline()
  timeline.play(0)
}

// 重置时间轴动画
const resetAnimation = () => {
  if (!timelineBox1.value || !timelineBox2.value || !timelineBox3.value) return
  
  gsap.to([timelineBox1.value, timelineBox2.value, timelineBox3.value], {
    duration: 0.5,
    y: 0,
    rotation: 0,
    scale: 1,
    ease: 'power2.out'
  })
}

onMounted(() => {
  // 初始化可以在这里设置
})

onBeforeUnmount(() => {
  // 清理资源
  if (timeline) {
    timeline.kill()
  }
})
</script>