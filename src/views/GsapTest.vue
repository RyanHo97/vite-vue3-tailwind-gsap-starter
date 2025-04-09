<template>
  <div class="gsap-container h-screen">
    <div class="flex h-full">
      <!-- 左侧菜单 -->
      <SideMenu 
        :menu-items="menuItems" 
        title="GSAP 案例" 
        @select-item="selectExample"
      />
      
      <!-- 右侧内容区域 -->
      <div class="flex-1 p-4 overflow-y-auto border-l border-gray-200 dark:border-gray-700">
        <div v-if="currentExample === 'basic'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 基础动画示例 -->
      <div class="demo-card">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">基础动画</h2>
        <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
          <div ref="basicBox" class="w-16 h-16 bg-blue-500 rounded-md shadow-md"></div>
          <div class="mt-4">
            <button @click="playBasicAnimation" class="btn-primary">播放动画</button>
            <button @click="resetBasicAnimation" class="btn-secondary ml-2">重置</button>
          </div>
        </div>
      </div>
      
      <!-- 时间轴动画示例 -->
      <div class="demo-card">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">时间轴动画</h2>
        <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
          <div class="flex space-x-4">
            <div ref="timelineBox1" class="w-12 h-12 bg-red-500 rounded-md shadow-md"></div>
            <div ref="timelineBox2" class="w-12 h-12 bg-green-500 rounded-md shadow-md"></div>
            <div ref="timelineBox3" class="w-12 h-12 bg-yellow-500 rounded-md shadow-md"></div>
          </div>
          <div class="mt-4">
            <button @click="playTimelineAnimation" class="btn-primary">播放时间轴</button>
            <button @click="resetTimelineAnimation" class="btn-secondary ml-2">重置</button>
          </div>
        </div>
      </div>
      
      <!-- 文本动画示例 -->
      <div class="demo-card">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">文本动画</h2>
        <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
          <h3 ref="textAnimation" class="text-2xl font-bold dark:text-white opacity-0">GSAP 让动画变得简单!</h3>
          <div class="mt-4">
            <button @click="playTextAnimation" class="btn-primary">播放文本动画</button>
            <button @click="resetTextAnimation" class="btn-secondary ml-2">重置</button>
          </div>
        </div>
      </div>
      
      <!-- 滚动触发动画示例 -->
      <div class="demo-card">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">交互动画</h2>
        <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
          <div 
            ref="hoverBox" 
            class="w-24 h-24 bg-purple-500 rounded-md shadow-md mx-auto cursor-pointer flex items-center justify-center text-white font-bold"
          >
            悬停我
          </div>
          <div class="mt-4 text-center">
            <p class="text-sm text-gray-600 dark:text-gray-300">将鼠标悬停在上方的方块上</p>
          </div>
        </div>
      </div>
        </div>
        
        <div v-if="currentExample === 'advanced'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 路径动画示例 -->
          <div class="demo-card">
            <h2 class="text-xl font-semibold mb-4 dark:text-white">路径动画</h2>
            <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
              <div ref="pathBox" class="w-16 h-16 bg-indigo-500 rounded-full shadow-md"></div>
              <svg class="absolute w-full h-full top-0 left-0" viewBox="0 0 300 300">
                <path ref="motionPath" d="M50,150 C100,50 200,50 250,150 S400,250 250,250" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-600"></path>
              </svg>
              <div class="mt-4">
                <button @click="playPathAnimation" class="btn-primary">播放动画</button>
                <button @click="resetPathAnimation" class="btn-secondary ml-2">重置</button>
              </div>
            </div>
          </div>
          
          <!-- 变形动画示例 -->
          <div class="demo-card">
            <h2 class="text-xl font-semibold mb-4 dark:text-white">变形动画</h2>
            <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
              <div ref="morphBox" class="w-24 h-24 bg-pink-500 rounded-md shadow-md mx-auto"></div>
              <div class="mt-4">
                <button @click="playMorphAnimation" class="btn-primary">播放动画</button>
                <button @click="resetMorphAnimation" class="btn-secondary ml-2">重置</button>
              </div>
            </div>
          </div>
          
          <!-- 物理动画示例 -->
          <div class="demo-card">
            <h2 class="text-xl font-semibold mb-4 dark:text-white">物理动画</h2>
            <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
              <div ref="physicsBox" class="w-12 h-12 bg-yellow-500 rounded-full shadow-md"></div>
              <div class="mt-4">
                <button @click="playPhysicsAnimation" class="btn-primary">播放动画</button>
                <button @click="resetPhysicsAnimation" class="btn-secondary ml-2">重置</button>
              </div>
            </div>
          </div>
          
          <!-- 3D变换动画示例 -->
          <div class="demo-card">
            <h2 class="text-xl font-semibold mb-4 dark:text-white">3D变换</h2>
            <div class="demo-content bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 relative overflow-hidden">
              <div ref="threeDBox" class="w-16 h-16 bg-green-500 shadow-md transform-style-preserve-3d"></div>
              <div class="mt-4">
                <button @click="play3DAnimation" class="btn-primary">播放动画</button>
                <button @click="reset3DAnimation" class="btn-secondary ml-2">重置</button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="currentExample === 'scroll'" class="p-4">
          <h2 class="text-2xl font-semibold mb-6 dark:text-white">滚动触发动画</h2>
          <div class="space-y-8">
            <!-- 滚动触发元素 -->
            <div ref="scrollTrigger1" class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 flex items-center justify-center">
              <div class="w-32 h-32 bg-red-500 rounded-lg opacity-0"></div>
            </div>
            
            <!-- 视差滚动元素 -->
            <div ref="scrollTrigger2" class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 overflow-hidden relative">
              <div ref="parallaxBox" class="w-32 h-32 bg-blue-500 rounded-lg absolute"></div>
            </div>
            
            <!-- 滚动进度指示器 -->
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64 flex flex-col items-center justify-center">
              <div ref="progressIndicator" class="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-full mb-4">
                <div class="h-full bg-green-500 rounded-full w-0"></div>
              </div>
              <p class="text-gray-700 dark:text-gray-300">滚动页面查看动画效果</p>
            </div>
            
            <!-- 滚动触发的时间轴动画 -->
            <div ref="scrollTrigger3" class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-64">
              <div class="flex space-x-4">
                <div ref="scrollBox1" class="w-16 h-16 bg-purple-500 rounded-lg"></div>
                <div ref="scrollBox2" class="w-16 h-16 bg-orange-500 rounded-lg"></div>
                <div ref="scrollBox3" class="w-16 h-16 bg-teal-500 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGraphicsEngine } from '../composables/useGraphicsEngine'
import SideMenu from '../components/layout/SideMenu.vue'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

// 引用元素
const basicBox = ref<HTMLElement | null>(null)
const timelineBox1 = ref<HTMLElement | null>(null)
const timelineBox2 = ref<HTMLElement | null>(null)
const timelineBox3 = ref<HTMLElement | null>(null)
const textAnimation = ref<HTMLElement | null>(null)
const hoverBox = ref<HTMLElement | null>(null)
// 高级动画元素
const pathBox = ref<HTMLElement | null>(null)
const motionPath = ref<SVGPathElement | null>(null)
const morphBox = ref<HTMLElement | null>(null)
const physicsBox = ref<HTMLElement | null>(null)
const threeDBox = ref<HTMLElement | null>(null)
// 滚动触发元素
const scrollTrigger1 = ref<HTMLElement | null>(null)
const scrollTrigger2 = ref<HTMLElement | null>(null)
const scrollTrigger3 = ref<HTMLElement | null>(null)
const parallaxBox = ref<HTMLElement | null>(null)
const progressIndicator = ref<HTMLElement | null>(null)
const scrollBox1 = ref<HTMLElement | null>(null)
const scrollBox2 = ref<HTMLElement | null>(null)
const scrollBox3 = ref<HTMLElement | null>(null)

// 使用图形引擎
const { loadEngine, isEngineLoaded } = useGraphicsEngine()

// 时间轴实例
let timeline: gsap.core.Timeline
let scrollTimeline: gsap.core.Timeline

// 路径动画
const playPathAnimation = () => {
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

const resetPathAnimation = () => {
  if (!pathBox.value) return
  gsap.to(pathBox.value, {
    duration: 0.5,
    x: 0,
    y: 0,
    ease: 'power2.out'
  })
}

// 变形动画
const playMorphAnimation = () => {
  if (!morphBox.value) return
  
  gsap.to(morphBox.value, {
    duration: 1.5,
    borderRadius: '50%',
    scale: 1.2,
    backgroundColor: '#ec4899',
    ease: 'elastic.out(1, 0.3)',
    repeat: 1,
    yoyo: true
  })
}

const resetMorphAnimation = () => {
  if (!morphBox.value) return
  gsap.to(morphBox.value, {
    duration: 0.5,
    borderRadius: '0.5rem',
    scale: 1,
    backgroundColor: '#ec4899',
    ease: 'power2.out'
  })
}

// 物理动画
const playPhysicsAnimation = () => {
  if (!physicsBox.value) return
  
  gsap.to(physicsBox.value, {
    duration: 1,
    y: 150,
    ease: 'bounce.out',
    onComplete: () => {
      gsap.to(physicsBox.value, {
        duration: 0.8,
        x: 100,
        ease: 'power2.inOut'
      })
    }
  })
}

const resetPhysicsAnimation = () => {
  if (!physicsBox.value) return
  gsap.to(physicsBox.value, {
    duration: 0.5,
    x: 0,
    y: 0,
    ease: 'power2.out'
  })
}

// 3D变换动画
const play3DAnimation = () => {
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

const reset3DAnimation = () => {
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

// 滚动触发动画
const setupScrollAnimations = () => {
  if (!scrollTrigger1.value || !scrollTrigger2.value || 
      !scrollTrigger3.value || !parallaxBox.value || 
      !progressIndicator.value || !scrollBox1.value || 
      !scrollBox2.value || !scrollBox3.value) return
  
  // 滚动触发元素1 - 淡入动画
  ScrollTrigger.create({
    trigger: scrollTrigger1.value,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => {
      gsap.to(scrollTrigger1.value?.firstElementChild, {
        duration: 0.8,
        opacity: 1,
        scale: 1.2,
        ease: 'power2.out'
      })
    },
    onLeaveBack: () => {
      gsap.set(scrollTrigger1.value?.firstElementChild, {
        opacity: 0,
        scale: 1
      })
    }
  })
  
  // 视差滚动效果
  gsap.to(parallaxBox.value, {
    y: 100,
    scrollTrigger: {
      trigger: scrollTrigger2.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
  
  // 滚动进度指示器
  ScrollTrigger.create({
    trigger: progressIndicator.value,
    start: 'top center',
    end: 'bottom center',
    onUpdate: (self) => {
      gsap.to(progressIndicator.value?.firstElementChild, {
        width: `${self.progress * 100}%`,
        duration: 0.1
      })
    }
  })
  
  // 滚动触发的时间轴动画
  scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: scrollTrigger3.value,
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

// 菜单项配置
const menuItems = ref([
  { id: 'basic', title: '基础动画', active: true },
  { id: 'advanced', title: '高级动画', active: false },
  { id: 'scroll', title: '滚动触发动画', active: false }
])

// 当前选中的示例
const currentExample = ref('basic')

// 选择示例
const selectExample = (id: string) => {
  currentExample.value = id
  
  // 更新菜单项激活状态
  menuItems.value = menuItems.value.map(item => ({
    ...item,
    active: item.id === id
  }))
}
// 基础动画
const playBasicAnimation = () => {
  if (!basicBox.value) return
  
  gsap.to(basicBox.value, {
    duration: 1,
    x: 200,
    rotation: 360,
    backgroundColor: '#ff6b6b',
    ease: 'back.out(1.7)',
    onComplete: () => console.log('动画完成')
  })
}

const resetBasicAnimation = () => {
  if (!basicBox.value) return
  
  gsap.to(basicBox.value, {
    duration: 0.5,
    x: 0,
    rotation: 0,
    backgroundColor: '#3b82f6',
    ease: 'power2.out'
  })
}

// 时间轴动画
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

const playTimelineAnimation = () => {
  if (!timeline) createTimeline()
  timeline.play(0)
}

const resetTimelineAnimation = () => {
  if (!timelineBox1.value || !timelineBox2.value || !timelineBox3.value) return
  
  gsap.to([timelineBox1.value, timelineBox2.value, timelineBox3.value], {
    duration: 0.5,
    y: 0,
    rotation: 0,
    scale: 1,
    ease: 'power2.out'
  })
}

// 文本动画
const playTextAnimation = () => {
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

const resetTextAnimation = () => {
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

// 悬停动画
const setupHoverAnimation = () => {
  if (!hoverBox.value) return
  
  hoverBox.value.addEventListener('mouseenter', () => {
    gsap.to(hoverBox.value, {
      duration: 0.3,
      scale: 1.2,
      backgroundColor: '#9333ea',
      rotation: 15,
      ease: 'power2.out'
    })
  })
  
  hoverBox.value.addEventListener('mouseleave', () => {
    gsap.to(hoverBox.value, {
      duration: 0.3,
      scale: 1,
      backgroundColor: '#8b5cf6',
      rotation: 0,
      ease: 'power2.in'
    })
  })
}

onMounted(async () => {
  try {
    // 确保GSAP引擎已加载
    if (!isEngineLoaded('gsap')) {
      await loadEngine('gsap')
    }
    
    // 初始化动画
    setupHoverAnimation()
    setupScrollAnimations()
    
    // 设置初始状态
    if (textAnimation.value) {
      gsap.set(textAnimation.value, { opacity: 0, y: 20 })
    }
    
    // 设置高级动画初始状态
    if (pathBox.value) {
      gsap.set(pathBox.value, { x: 0, y: 0 })
    }
    if (morphBox.value) {
      gsap.set(morphBox.value, { borderRadius: '0.5rem' })
    }
    if (physicsBox.value) {
      gsap.set(physicsBox.value, { y: 0 })
    }
    if (threeDBox.value) {
      gsap.set(threeDBox.value, { rotationY: 0, rotationX: 0 })
    }
  } catch (error) {
    console.error('Failed to initialize GSAP:', error)
  }
})

onBeforeUnmount(() => {
  // 清理资源
  if (timeline) {
    timeline.kill()
  }
})
</script>

<style scoped>
.gsap-container {
  width: 100%;
}

.flex > :first-child {
  border-right: 1px solid #e5e7eb;
  dark:border-gray-700;
}

.demo-card {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.dark .demo-card {
  background-color: #1f2937;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.demo-card:hover {
  transform: translateY(-5px);
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #9ca3af;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #6b7280;
}
</style>