<template>
  <div class="min-h-full flex items-center justify-center w-[350px]">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Reinitialize password</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="resetPassword">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Password</label>
            <input v-model="reset.password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
          </div>
          <div>
            <label for="password" class="sr-only">Password confirm</label>
            <input v-model="reset.confirmPassword" name="passwordConfirm" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password confirm">
          </div>
        </div>

        <div v-if="formError" class="mt-6">
          <span>{{ formError }}</span>
        </div>

        <div class="flex items-center justify-center">
          <div class="text-sm">
            <NuxtLink to="/dashboard/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account ?
            </NuxtLink>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Reinitialize password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ResetPasswordPage',
  layout: 'simple',
  async asyncData({ redirect, $axios, query }) {
    if (query.token) {
      try {
        const response = await $axios.get(`/auth/security/verify-token`, { params: { token: query.token } })
        if (!response.data.success) redirect('/dashboard/login')
      } catch(e) {
        redirect('/dashboard/login')
      }
    } else {
      redirect('/dashboard/login')
    }
  },
  data() {
    return {
      reset: {
        password: '',
        confirmPassword: ''
      },
      formError: null
    }
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.passwordConfirm) {
        this.formError = 'Password and password confirm must be the same';
      } else {
        try {
          await this.$axios.post(`/auth/security/reset-password`, { ...this.reset, token: this.$route.query.token })
          this.$router.push('/dashboard/login')
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>