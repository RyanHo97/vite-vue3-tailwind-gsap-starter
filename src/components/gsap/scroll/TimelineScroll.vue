<template>
  <div ref="scrollContainer" class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64">
    <div class="flex space-x-4">
      <div ref="scrollBox1" class="w-16 h-16 bg-purple-500 rounded-lg"></div>
      <div ref="scrollBox2" class="w-16 h-16 bg-orange-500 rounded-lg"></div>
      <div ref="scrollBox3" class="w-16 h-16 bg-teal-500 rounded-lg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 引用元素
const scrollContainer = ref<HTMLElement | null>(null)
const scrollBox1 = ref<HTMLElement | null>(null)
const scrollBox2 = ref<HTMLElement | null>(null)
const scrollBox3 = ref<HTMLElement | null>(null)

// 时间轴实例
let scrollTimeline: gsap.core.Timeline | null = null

// 滚动触发的时间轴动画
const setupTimelineAnimation = () => {
  if (!scrollContainer.value || !scrollBox1.value || 
      !scrollBox2.value || !scrollBox3.value) return
  
  // 滚动触发的时间轴动画
  scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: scrollContainer.value,
      start: 'top center',
      end: 'bottom center',
      scrub: 1
    }
  })
  
  scrollTimeline
    .to(scrollBox1.value, { x: 100, rotation: 360 })
    .to(scrollBox2.value, { x: 50, rotation: 180 }, '<')
    .to(scrollBox3.value, { x: -100, rotation: 360 }, '<')
}

onMounted(() => {
  setupTimelineAnimation()
})

onBeforeUnmount(() => {
  // 清理资源
  if (scrollTimeline) {
    scrollTimeline.kill()
  }
})
</script>