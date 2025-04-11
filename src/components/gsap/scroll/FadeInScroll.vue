<template>
  <div ref="scrollTrigger" class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 flex items-center justify-center">
    <div class="w-32 h-32 bg-red-500 rounded-lg opacity-0"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 引用元素
const scrollTrigger = ref<HTMLElement | null>(null)
let trigger: ScrollTrigger | null = null

// 滚动触发动画
const setupScrollAnimation = () => {
  if (!scrollTrigger.value) return
  
  // 获取子元素，确保它存在
  const element = scrollTrigger.value.firstElementChild
  if (!element) return
  
  // 滚动触发元素 - 淡入动画
  trigger = ScrollTrigger.create({
    trigger: scrollTrigger.value,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => {
      gsap.to(element, {
        duration: 0.8,
        opacity: 1,
        scale: 1.2,
        ease: 'power2.out'
      })
    },
    onLeaveBack: () => {
      gsap.set(element, {
        opacity: 0,
        scale: 1
      })
    }
  })
}

onMounted(() => {
  setupScrollAnimation()
})

onBeforeUnmount(() => {
  // 清理资源
  if (trigger) {
    trigger.kill()
  }
})
</script>