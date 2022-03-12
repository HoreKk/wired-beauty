<template>
  <div
    v-editable="blok"
    class="">
    <component
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
      :is="blok.component" />
  </div>
</template>

<script>
export default {
  name: "ComponentPage",
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
