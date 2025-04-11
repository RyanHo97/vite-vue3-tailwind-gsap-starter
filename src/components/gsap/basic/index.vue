<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <BasicAnimation />
    <TimelineAnimation />
    <TextAnimation />
    <HoverAnimation />
  </div>
</template>

<script setup lang="ts">
import BasicAnimation from './BasicAnimation.vue'
import TimelineAnimation from './TimelineAnimation.vue'
import TextAnimation from './TextAnimation.vue'
import HoverAnimation from './HoverAnimation.vue'
</script>