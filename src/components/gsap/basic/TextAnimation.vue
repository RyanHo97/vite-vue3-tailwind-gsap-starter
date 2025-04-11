<template>
  <div class="demo-card">
    <h2 class="text-xl font-semibold mb-4 dark:text-white">文本动画</h2>
    <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
      <h3 ref="textAnimation" class="text-2xl font-bold dark:text-white opacity-0">GSAP 让动画变得简单!</h3>
      <div class="mt-4">
        <button @click="playAnimation" class="btn-primary">播放文本动画</button>
        <button @click="resetAnimation" class="btn-secondary ml-2">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

// 引用元素
const textAnimation = ref<HTMLElement | null>(null)

// 文本动画
const playAnimation = () => {
  if (!textAnimation.value) return
  
  gsap.to(textAnimation.value, {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: 'power3.out'
  })
  
  // 字符分割动画
  const text = textAnimation.value.textContent || ''
  textAnimation.value.innerHTML = ''
  
  // 创建字符包装元素
  text.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.textContent = char
    charSpan.style.display = 'inline-block'
    textAnimation.value?.appendChild(charSpan)
  })
  
  // 为每个字符添加动画
  gsap.from(textAnimation.value.children, {
    duration: 0.5,
    opacity: 0,
    y: 20,
    rotationX: 90,
    stagger: 0.05,
    ease: 'back.out',
    delay: 0.3
  })
}

const resetAnimation = () => {
  if (!textAnimation.value) return
  
  // 重置文本
  textAnimation.value.innerHTML = 'GSAP 让动画变得简单!'
  
  gsap.to(textAnimation.value, {
    duration: 0.5,
    opacity: 0,
    y: 20,
    ease: 'power2.in'
  })
}

onMounted(() => {
  // 设置初始状态
  if (textAnimation.value) {
    gsap.set(textAnimation.value, { opacity: 0, y: 20 })
  }
})
</script>