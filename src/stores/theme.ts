export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false
  }),
  
  getters: {
    currentTheme: (state) => state.isDarkMode ? 'dark' : 'light'
  },
  
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      this.updateDOMClass()
      this.saveThemePreference()
    },
    
    setDarkMode(value: boolean) {
      this.isDarkMode = value
      this.updateDOMClass()
      this.saveThemePreference()
    },
    
    updateDOMClass() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    
    saveThemePreference() {
      localStorage.setItem('darkMode', this.isDarkMode ? 'dark' : 'light')
    },
    
    initTheme() {
      if (typeof window !== 'undefined') {
        const savedMode = localStorage.getItem('darkMode')
        if (savedMode) {
          this.setDarkMode(savedMode === 'dark')
        } else {
          // 检测系统主题偏好
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          this.setDarkMode(prefersDark)
        }
      }
    }
  }
})