<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <PathAnimation />
    <MorphAnimation />
    <PhysicsAnimation />
    <ThreeDAnimation />
  </div>
</template>

<script setup lang="ts">
import PathAnimation from './PathAnimation.vue'
import MorphAnimation from './MorphAnimation.vue'
import PhysicsAnimation from './PhysicsAnimation.vue'
import ThreeDAnimation from './ThreeDAnimation.vue'
</script>