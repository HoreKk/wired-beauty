<template>
  <div v-editable="blok">
    <div class="flex space-x-8 text-xs justify-center py-3">
      <div class="flex space-x-2">
        <h2 class="">{{ blok.firstTitle }}</h2>
        <p>-</p>
        <NuxtLink class="underline font-semibold" to="">{{ blok.link.cached_url }}</NuxtLink>
        <h2 class="">{{ blok.secondTitle }}</h2>
        <p>-</p>
        <h2 class="">{{ blok.desc }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ComponentInfoTitle',
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
</style>
