<template>
  <div :class="{isDarkMode}">
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