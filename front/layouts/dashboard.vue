<template>
  <div class="flex h-full">
    <CoreSidebar />
    <Nuxt />
  </div>
</template>

<script>
import CoreSidebar from '~/components/core/Sidebar.vue'

export default {
  name: 'DefaultLayout',
  components: { CoreSidebar },
  async mounted() {
    const currentUser = this.$auth.$storage.getCookie('user')
    if (currentUser) {
      const newUser = await this.$axios.get(`/user/${currentUser._id}`)
      if (JSON.stringify(currentUser) !== JSON.stringify(newUser)) {
        this.$auth.$storage.setUniversal('user', newUser.data, true)
        this.$auth.setUser(newUser.data)
      }
    } else {
      this.$router.push('/dashboard/login')
    }
    
  }
}
</script>

<style>

html,body, #__nuxt, #__layout{
  height:100%!important;
  width: 100%!important;
}

</style>
