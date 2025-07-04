<script setup lang="ts">
definePageMeta({
  layout: 'plain',
})

const isLoggedIn = useIsLoggedIn()
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <div class="badge badge-lg badge-primary badge-outline">Nuxt App</div>
      <h1 class="text-2xl">The Ultimate Guide to Vue Performance</h1>
    </div>
    <div>{{ isLoggedIn }}</div>
  </div>
</template>
