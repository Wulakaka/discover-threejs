<script setup lang="ts"></script>

<template>
  <div
    class="grid grid-cols-2 grid-rows-2 gap-2 w-[128px] aspect-square bg-white rounded-full overflow-clip relative"
  >
    <div
      v-for="i of [1, 2, 4, 3]"
      :key="i"
      class="hover:bg-amber-500 cursor-pointer bg-gray-300 flex items-center justify-center"
    >
      <IconArrow
        :style="{ '--no': i }"
        class="rotate-[calc(90deg*var(--no)-135deg)]"
      />
    </div>

    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[calc(50%_+_0.25rem)] aspect-square rounded-full overflow-clip p-2"
    >
      <div
        class="hover:bg-amber-500 cursor-pointer bg-gray-300 aspect-square rounded-full"
      >
        5
      </div>
    </div>
  </div>
</template>

<style scoped></style>
