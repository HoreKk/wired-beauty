<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex md:w-64 h-full md:inset-y-0">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow" />
        </div>
        <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
          <div v-for="(item, index) in navigation" :key="index">
            <NuxtLink :class="['text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']" :to="item.link" >
              {{ item.name }}
            </NuxtLink>
          </div>
        </nav>
      </div>
      <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div class="flex items-center">
          <NuxtLink to="/dashboard/profile" class="flex w-9 h-9 justify-center items-center bg-slate-300 rounded-full">
            <font-awesome-icon :icon="['fas', 'gear']" />
          </NuxtLink>
          <button class="flex w-9 h-9 ml-2 justify-center items-center bg-red-400 rounded-full" @click="logout">
            <font-awesome-icon :icon="['fa', 'right-from-bracket']" />
          </button>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {{ $auth.user.firstname + '  ' + $auth.user.lastname }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CoreSidebar',
  data() {
    return {
      navigation: [
        { name: 'Dashboard', link: '/dashboard/stats' },
        { name: 'Users', link: '/dashboard/users' },
        { name: 'Studies', link: '/dashboard/studies' },
      ],
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/dashboard/login')
    }
  }
}
</script>

<style scoped>

.nuxt-link-active {
  @apply bg-gray-100 text-gray-900;
}

</style>