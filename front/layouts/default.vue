<template>
  <div>
    <CoreHeader />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/core/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer
  }
}
</script>
