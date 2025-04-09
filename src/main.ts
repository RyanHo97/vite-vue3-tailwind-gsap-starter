import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { useGraphicsEngine } from './composables/useGraphicsEngine'

const initApp = async () => {
  // Initialize graphics engine
  const { initializeEngines } = useGraphicsEngine()
  await initializeEngines()

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}

initApp()