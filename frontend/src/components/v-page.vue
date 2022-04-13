<template>
  <div class="my-12 md:mt-[4.25rem] resolve-w-h p-2">
    <div v-if="$slots['before-title']" class="mb-4">
      <slot name="before-title" />
    </div>

    <div v-if="$slots.title" class="mb-2">
      <slot name="title" />
    </div>

    <div v-if="$slots['after-title']" class="mb-4">
      <slot name="after-title" />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts"></script>
