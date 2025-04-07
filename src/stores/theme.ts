import { defineStore } from 'pinia'

// 定义暗黑模式状态管理的store
export const useThemeStore = defineStore('theme', {
  // 状态
  state: () => ({
    isDarkMode: false
  }),
  
  // getters
  getters: {
    // 获取当前主题模式
    currentTheme: (state) => state.isDarkMode ? 'dark' : 'light'
  },
  
  // actions
  actions: {
    // 切换暗黑模式
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      this.updateDOMClass()
      this.saveThemePreference()
    },
    
    // 设置暗黑模式
    setDarkMode(value: boolean) {
      this.isDarkMode = value
      this.updateDOMClass()
      this.saveThemePreference()
    },
    
    // 更新DOM类
    updateDOMClass() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    
    // 保存主题偏好到本地存储
    saveThemePreference() {
      localStorage.setItem('darkMode', this.isDarkMode ? 'dark' : 'light')
    },
    
    // 从本地存储初始化主题
    initTheme() {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode === 'dark') {
        this.setDarkMode(true)
      }
    }
  }
})