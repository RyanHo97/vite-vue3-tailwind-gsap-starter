<template>
  <div class="three-container">
    
    <div class="flex h-[calc(100vh)] relative" :class="{ 'menu-collapsed': !isMenuOpen }">
      <!-- 左侧菜单 -->
      <SideMenu 
        :menu-items="menuItems" 
        title="Three.js 案例" 
        @select-item="selectExample"
        @menu-toggle="handleMenuToggle"
      />
      
      <!-- 右侧内容区域 -->
      <div class="flex-1 p-4 overflow-y-auto bg-black w-full transition-all duration-300">
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

// 控制侧边栏状态
const isMenuOpen = ref(true)

// 菜单项配置
const menuItems = ref([
  { id: 'basic', title: '基础立方体', active: true },
  { id: 'geometry', title: '几何体示例', active: false },
  { id: 'lighting', title: '光照与材质', active: false }
])

// 当前选中的示例
const currentExample = ref('basic')

// 处理菜单切换事件
const handleMenuToggle = (isOpen: boolean) => {
  isMenuOpen.value = isOpen
}

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
    // 确保在场景切换后重新调整大小
    handleResize()
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 设置像素比例，提高清晰度
  container.value.appendChild(renderer.domElement)
  
  // 确保初始尺寸正确
  handleResize()

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
    
    // 调整模型位置和大小以适应容器
    adjustModelToContainer(cube)
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
      
      // 调整几何体模型大小以适应容器
      adjustModelToContainer(mesh)
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
    
    // 调整光照场景中的模型大小以适应容器
    adjustModelToContainer(cube)
    
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

// 调整模型大小和位置以适应容器
const adjustModelToContainer = (model: Mesh) => {
  if (!container.value || !model) return
  
  // 获取容器的宽高比
  const containerAspect = container.value.clientWidth / container.value.clientHeight
  
  // 根据容器宽高比调整模型的缩放
  const scale = containerAspect < 1 ? 0.8 : 1.2
  model.scale.set(scale, scale, scale)
  
  // 根据容器大小调整相机位置
  const cameraDistance = containerAspect < 1 ? 6 : 5
  camera.position.z = cameraDistance
  
  // 根据容器大小调整模型位置
  // 在移动设备上（竖屏）调整Y轴位置
  if (containerAspect < 1) {
    model.position.y = model.position.y || 0 // 保留原始Y轴位置
  }
  
  camera.updateProjectionMatrix()
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

// ResizeObserver实例
let resizeObserver: ResizeObserver | null = null

// 处理容器大小变化
const handleResize = (entries?: ResizeObserverEntry[]) => {
  if (!container.value || !camera || !renderer) return
  
  // 获取容器的当前尺寸
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  
  // 更新相机宽高比
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  
  // 更新渲染器尺寸
  renderer.setSize(width, height)
  
  // 更新像素比例，确保在高DPI显示器上渲染清晰
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  // 如果当前场景中有模型，调整模型大小以适应新的容器尺寸
  if (cube) {
    adjustModelToContainer(cube)
  }
  
  // 对于几何体示例，需要调整所有模型
  if (currentExample.value === 'geometry' && scene) {
    scene.children.forEach(child => {
      if (child instanceof Mesh) {
        adjustModelToContainer(child)
      }
    })
  }
}

onMounted(async () => {
  try {
    // 确保Three.js引擎已加载
    if (!isEngineLoaded('three')) {
      await loadEngine('three')
    }
    
    // 初始化场景
    initThree()
    
    // 使用ResizeObserver监听容器尺寸变化
    if (container.value) {
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(container.value)
    }
    
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
  
  // 清理ResizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  
  if (container.value) {
    container.value.innerHTML = ''
  }
  
  // 清理光源
  if (lights && lights.length > 0) {
    lights.forEach(light => scene.remove(light))
    lights = []
  }
  
  // 清理渲染器
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.three-container {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
}

/* 菜单收起状态下的样式 */
.menu-collapsed .side-menu {
  width: 0;
  min-width: 0;
}
</style>