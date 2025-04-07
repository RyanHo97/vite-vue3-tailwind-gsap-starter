# ⚡ Vite6 + 🖖 Vue3 + 🎨 TailwindCSS4 + ✨ GSAP3 Starter

🚀 **Modern Frontend Boilerplate for Animation-Rich Apps**
🌟 开箱即用的交互动画开发模板 | Production-Ready Starter Kit

[![Vite](https://img.shields.io/badge/Vite-6.2.0-%23646CFF?logo=vite)](https://github.com/vitejs/vite)
[![Vue](https://img.shields.io/badge/Vue-3.5.0-%234FC08D?logo=vuedotjs)](https://github.com/vuejs/core)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.0-%2306B6D4?logo=tailwindcss)](https://github.com/tailwindlabs/tailwindcss)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.0-%238800FF?logo=greensock)](https://github.com/greensock/GSAP)

## ✨ Features 核心功能

- ⚡ **Vite 6** - 极速启动 + 闪电般的热更新
- 🖖 **Vue 3 Composition API** - 更灵活的代码组织方式
- 🎨 **TailwindCSS 4** - 原子化CSS + JIT引擎
- ✨ **GSAP 3** - 专业级动画解决方案
- 🛠 **Pre-configured** - 内置ESLint + Prettier + TypeScript
- 📱 **Mobile-friendly** - 响应式设计开箱即用

## 🚀 Quick Start 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/RyanHo97/vite-vue3-tailwind-gsap-starter

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm run dev
```

## 🎯 Project Structure 项目结构

```
├── src
│   ├── assets            # 静态资源
│   ├── components        # 组件
│   ├── composables       # Vue组合式函数
│   ├── styles            # 全局样式
│   ├── utils             # 工具函数
│   ├── views             # 页面视图
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── index.html            # 主HTML文件
└── vite.config.ts        # Vite配置
```

## 🌈 Examples 示例代码

### 基础GSAP动画

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.from('.box', {
    duration: 1,
    x: -100,
    opacity: 0,
    ease: 'back.out(1.7)'
  })
})
</script>

<template>
  <div class="box w-20 h-20 bg-blue-500 rounded-lg"></div>
</template>
```

### 响应式设计

```vue
<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="w-full md:w-1/2 bg-red-100 p-4">左侧内容</div>
    <div class="w-full md:w-1/2 bg-blue-100 p-4">右侧内容</div>
  </div>
</template>
```

## 🤝 Contributing 贡献指南

欢迎提交PR或Issue！请确保：

1. 代码符合ESLint规范
2. 提交信息遵循Conventional Commits
3. 新功能需附带测试用例

## 📜 License 许可证

MIT