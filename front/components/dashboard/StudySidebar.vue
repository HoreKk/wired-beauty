<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="mt-4 ml-4 border-b border-gray-200 w-full">
    <div class="sm:flex sm:items-baseline">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Study</h3>
      <div class="mt-4 sm:mt-0 sm:ml-10">
        <nav class="-mb-px flex space-x-8">
          <NuxtLink v-for="(item, index) in navigation" :key="index" :class="['whitespace-nowrap pb-4 px-1 font-medium text-sm']" :to="`/dashboard/studies/` + $route.params.slug + [item.link ? '/' + item.link : '']" :event="isCreate ? '' : 'click'" >
            <font-awesome-icon :icon="['fa', item.icon]" :class="['flex-shrink-0 -ml-1 mr-3 h-4 w-4']" aria-hidden="true" />
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'StudySidebar',
  props: {
    isCreate: { type: Boolean, default: false }
  },
  data() {
    return {
      navigation: [
        { name: 'Informations', link: '', icon: 'clipboard-check' },
        { name: 'Datasets', link: 'datasets', icon: 'table' },
        { name: 'Data vision', link: 'reports', icon: 'atom' },
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

.nuxt-link-exact-active {
  @apply !bg-transparent;
}

.nuxt-link-active {
  @apply !bg-transparent;
}

a.nuxt-link {
  @apply bg-transparent border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2
}

a.nuxt-link-exact-active {
  @apply border-indigo-500 text-indigo-600 border-b-2
}

</style>
