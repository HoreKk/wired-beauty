<template>
  <div class="flex justify-center">
    <form class="flex flex-col items-center mt-12" @submit.prevent="userLogin">
      <h1 class="font-bold text-2xl">Login</h1>
      <div class="flex flex-col mt-4">
        <label>Email</label>
        <input v-model="login.email" type="text" />
      </div>
      <div class="flex flex-col mt-4">
        <label>Password</label>
        <input v-model="login.password" type="password" />
      </div>
      <div class="mt-4">
        <button class="bg-blue-500 rounded-lg px-4 py-2" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  mounted() {
    console.log(this.$auth.loggedIn)
  },
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', { data: this.login })
        this.$auth.setUser(response)
        this.$router.push('/dashboard')
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>