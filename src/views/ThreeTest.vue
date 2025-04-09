<template>
  <div class="three-container">
    
    <div class="flex h-[calc(100vh)]">
      <!-- 左侧菜单 -->
      <SideMenu 
        :menu-items="menuItems" 
        title="Three.js 案例" 
        @select-item="selectExample"
      />
      
      <!-- 右侧内容区域 -->
      <div class="flex-1 p-4 overflow-y-auto bg-black">
        <div v-if="currentExample === 'basic'" class="h-full" ref="container"></div>
        
        <div v-if="currentExample === 'geometry'" class="h-full" ref="container"></div>
        
        <div v-if="currentExample === 'lighting'" class="h-full" ref="container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGraphicsEngine } from '../composables/useGraphicsEngine'
import SideMenu from '../components/layout/SideMenu.vue'

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  TorusGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PointLight,
  Mesh
} from 'three'
import { useThemeStore } from '../stores/theme'

const container = ref<HTMLElement | null>(null)
const { loadEngine, isEngineLoaded } = useGraphicsEngine()
const themeStore = useThemeStore()

// 菜单项配置
const menuItems = ref([
  { id: 'basic', title: '基础立方体', active: true },
  { id: 'geometry', title: '几何体示例', active: false },
  { id: 'lighting', title: '光照与材质', active: false }
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
  
  // 清理旧场景
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = 0
  }
  if (container.value) {
    container.value.innerHTML = ''
  }
  if (scene) {
    while(scene.children.length > 0) { 
      scene.remove(scene.children[0]); 
    }
  }
  if (renderer) {
    renderer.dispose()
  }
  if (lights && lights.length > 0) {
    lights.forEach(light => scene?.remove(light))
    lights = []
  }
  
  // 确保DOM更新完成后再重新初始化场景
  nextTick(() => {
    initThree()
  })
}

// Three.js 相关变量
let scene: Scene
let camera: PerspectiveCamera
let renderer: WebGLRenderer
let cube: Mesh
let lights: PointLight[] = []

// 动画帧ID
let animationFrameId: number

// 初始化Three.js场景
const initThree = () => {
  if (!container.value) return

  // 创建场景
  scene = new Scene()

  // 创建相机
  camera = new PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  // 创建渲染器
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)

  // 根据当前示例初始化不同场景
  if (currentExample.value === 'basic') {
    // 基础立方体
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ 
      color: themeStore.isDarkMode ? 0x00aaff : 0x00ff00, 
      wireframe: true 
    })
    cube = new Mesh(geometry, material)
    scene.add(cube)
  } else if (currentExample.value === 'geometry') {
    // 几何体示例
    const geometries = [
      new SphereGeometry(1, 32, 32),
      new ConeGeometry(1, 2, 32),
      new TorusGeometry(1, 0.4, 16, 32)
    ]
    
    geometries.forEach((geo, i) => {
      const material = new MeshBasicMaterial({ 
        color: themeStore.isDarkMode ? 0x00ff00 : 0x00aaff, 
        wireframe: true,
        transparent: true,
        opacity: 0.8
      })
      const mesh = new Mesh(geo, material)
      mesh.position.x = (i - 1) * 3
      scene.add(mesh)
    })
  } else if (currentExample.value === 'lighting') {
    // 光照与材质
    const geometry = new SphereGeometry(1, 32, 32)
    const material = new MeshPhongMaterial({ 
      color: themeStore.isDarkMode ? 0x333333 : 0xffffff,
      shininess: 100,
      specular: themeStore.isDarkMode ? 0x222222 : 0x111111
    })
    cube = new Mesh(geometry, material)
    scene.add(cube)
    
    // 添加光源 - 根据主题模式调整强度和颜色
    const lightIntensity = themeStore.isDarkMode ? 0.8 : 1.5
    const lightColor1 = themeStore.isDarkMode ? 0xaa0000 : 0xff5555
    const lightColor2 = themeStore.isDarkMode ? 0x00aa00 : 0x55ff55
    
    const light1 = new PointLight(lightColor1, lightIntensity, 10)
    light1.position.set(3, 3, 3)
    scene.add(light1)
    
    const light2 = new PointLight(lightColor2, lightIntensity, 10)
    light2.position.set(-3, -3, 3)
    scene.add(light2)
  }

  // 开始动画循环
  animate()
}

// 动画循环
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  // 旋转立方体
  if (cube) {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  renderer.render(scene, camera)
}

// 处理窗口大小变化
const handleResize = () => {
  if (!container.value) return

  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

onMounted(async () => {
  try {
    // 确保Three.js引擎已加载
    if (!isEngineLoaded('three')) {
      await loadEngine('three')
    }
    
    // 初始化场景
    initThree()
    window.addEventListener('resize', handleResize)
    
    // 监听主题变化
    watch(() => themeStore.isDarkMode, () => {
      selectExample(currentExample.value)
    })
  } catch (error) {
    console.error('Failed to initialize Three.js:', error)
  }
})

onBeforeUnmount(() => {
  // 清理资源
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', handleResize)
  
  if (container.value) {
    container.value.innerHTML = ''
  }
  
  // 清理光源
  if (lights && lights.length > 0) {
    lights.forEach(light => scene.remove(light))
    lights = []
  }
})
</script>

<style scoped>
.three-container {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
}
</style>