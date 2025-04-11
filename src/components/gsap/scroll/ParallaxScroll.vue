<template>
  <div ref="scrollContainer" class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 overflow-hidden relative">
    <div ref="parallaxBox" class="w-32 h-32 bg-blue-500 rounded-lg absolute"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 引用元素
const scrollContainer = ref<HTMLElement | null>(null)
const parallaxBox = ref<HTMLElement | null>(null)
let tween: gsap.core.Tween | null = null

// 视差滚动效果
const setupParallaxEffect = () => {
  if (!scrollContainer.value || !parallaxBox.value) return
  
  // 视差滚动效果
  tween = gsap.to(parallaxBox.value, {
    y: 100,
    scrollTrigger: {
      trigger: scrollContainer.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}

onMounted(() => {
  setupParallaxEffect()
})

onBeforeUnmount(() => {
  // 清理资源
  if (tween) {
    tween.kill()
  }
})
</script>