<template>
  <div :class="{'dark:bg-gray-900 dark:text-white': isDarkMode}">
    <Navbar />
    
    <main class="flex-grow">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@components/layout/Navbar.vue'
import Footer from '@components/layout/Footer.vue'
import { useThemeStore } from '@/stores'

const themeStore = useThemeStore()
const isDarkMode = computed(() => themeStore.isDarkMode)

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
.dark {
  --primary-color: #60a5fa;
  --secondary-color: #34d399;
  --text-color: #f3f4f6;
  --bg-color: #111827;
  --accent-color: #a78bfa;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>