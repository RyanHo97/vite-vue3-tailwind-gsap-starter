<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
const route = useRoute()
</script>

<template>
  <div v-if="isOpen" class="lg:hidden">
    <div class="pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 transition-colors duration-300">
      <router-link
        to="/"
        class="block px-3 py-2 text-base font-medium"
        :class="
          route.path === '/'
            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
            : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white'
        "
        @click="emit('close')"
      >
        首页
      </router-link>
      <router-link
        to="/about"
        class="block px-3 py-2 text-base font-medium"
        :class="
          route.path === '/about'
            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
            : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white'
        "
        @click="emit('close')"
      >
        关于
      </router-link>
      <router-link
        to="/contact"
        class="block px-3 py-2 text-base font-medium"
        :class="
          route.path === '/contact'
            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
            : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white'
        "
        @click="emit('close')"
      >
        联系
      </router-link>
    </div>
  </div>
</template>
