<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-6 dark:text-white">滚动触发动画</h2>
    <div class="space-y-8">
      <!-- 滚动触发元素 -->
      <FadeInScroll />
      
      <!-- 视差滚动元素 -->
      <ParallaxScroll />
      
      <!-- 滚动进度指示器 -->
      <ProgressIndicator />
      
      <!-- 滚动触发的时间轴动画 -->
      <TimelineScroll />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 导入模块化组件
import FadeInScroll from './FadeInScroll.vue'
import ParallaxScroll from './ParallaxScroll.vue'
import ProgressIndicator from './ProgressIndicator.vue'
import TimelineScroll from './TimelineScroll.vue'

onBeforeUnmount(() => {
  // 清理所有ScrollTrigger实例
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>