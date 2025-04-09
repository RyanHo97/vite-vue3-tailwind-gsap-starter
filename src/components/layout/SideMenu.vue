<script setup lang="ts">
defineProps<{
  menuItems: {
    title: string
    id: string
    active?: boolean
  }[]
  title?: string
}>()

const emit = defineEmits(['select-item'])

const handleItemClick = (itemId: string) => {
  emit('select-item', itemId)
}
</script>

<template>
  <div class="side-menu bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full transition-colors duration-300">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">{{ title || '案例菜单' }}</h2>
    </div>
    <ul class="py-2">
      <li 
        v-for="item in menuItems" 
        :key="item.id"
        class="px-4 py-2 cursor-pointer transition-colors duration-200"
        :class="item.active 
          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
        @click="handleItemClick(item.id)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.side-menu {
  width: 240px;
  min-width: 240px;
}
</style>