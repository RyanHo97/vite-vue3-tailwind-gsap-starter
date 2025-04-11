<template>
  <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 flex flex-col items-center justify-center">
    <div ref="progressContainer" class="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-full mb-4">
      <div ref="progressBar" class="h-full bg-green-500 rounded-full w-0"></div>
    </div>
    <p class="text-gray-700 dark:text-gray-300">滚动页面查看动画效果</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 引用元素
const progressContainer = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)
let trigger: ScrollTrigger | null = null

// 滚动进度指示器
const setupProgressIndicator = () => {
  if (!progressContainer.value || !progressBar.value) return
  
  // 滚动进度指示器
  trigger = ScrollTrigger.create({
    trigger: progressContainer.value,
    start: 'top center',
    end: 'bottom center',
    onUpdate: (self) => {
      if (progressBar.value) {
        gsap.to(progressBar.value, {
          width: `${self.progress * 100}%`,
          duration: 0.1
        })
      }
    }
  })
}

onMounted(() => {
  setupProgressIndicator()
})

onBeforeUnmount(() => {
  // 清理资源
  if (trigger) {
    trigger.kill()
  }
})
</script>