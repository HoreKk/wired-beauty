<template>
  <div class="flex flex-col">
    <h1 class="text-lg font-bold">USER CONNECTER {{ $auth.user.email }}</h1>
    <button @click="logout" class="bg-red-500 rounded-xl px-4 py-2">
      Se deconnecter
    </button>
  </div>
</template>

<script>

export default {
  name: 'DashboardPage',
  middleware: 'auth',
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/dashboard/login')
    }
  }
}
</script>
