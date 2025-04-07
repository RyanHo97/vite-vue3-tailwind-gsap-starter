<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const name = ref('')
const email = ref('')
const message = ref('')
const isSubmitted = ref(false)

const handleSubmit = () => {
  // 这里只是模拟提交，实际项目中应该调用API
  isSubmitted.value = true
  setTimeout(() => {
    name.value = ''
    email.value = ''
    message.value = ''
    isSubmitted.value = false
  }, 3000)
}

onMounted(() => {
  gsap.from('.contact-item', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    stagger: 0.15,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div class="min-h-screen p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 contact-item">联系我们</h1>
      
      <div v-if="!isSubmitted" class="space-y-6">
        <div class="contact-item">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入您的姓名"
          >
        </div>
        
        <div class="contact-item">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入您的邮箱"
          >
        </div>
        
        <div class="contact-item">
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">留言</label>
          <textarea 
            id="message" 
            v-model="message" 
            rows="5" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入您的留言"
          ></textarea>
        </div>
        
        <div class="contact-item">
          <button 
            @click="handleSubmit" 
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            :disabled="!name || !email || !message"
          >
            提交
          </button>
        </div>
      </div>
      
      <div v-else class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded contact-item">
        <p>感谢您的留言，我们会尽快回复！</p>
      </div>
      
      <div class="mt-12 contact-item">
        <router-link to="/" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>