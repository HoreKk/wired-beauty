<template>
  <div>
    <CoreHeader />
    <Nuxt />
  </div>
</template>

<script>
import CoreHeader from '~/components/core/Header.vue'

export default {
  name: 'DefaultLayout',
  components: {
    CoreHeader
  }
}
</script>
