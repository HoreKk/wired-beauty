<template>
  <div v-editable="blok" class="py-2 text-center">
    <p class="rounded-lg border w-1/4 p-5 text-vxs">
      {{ blok.description }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'ComponentDescRight',
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
.text-vxs{
 font-size:0.5rem;
}
</style>
