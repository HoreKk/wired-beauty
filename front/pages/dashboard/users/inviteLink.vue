<template>
  <div class="w-full px-8 py-10">
    <div class="flex w-full items-center">
      <div class="flex flex-col w-full">
        <div class="flex items-center">
          <button class="flex w-9 h-9 justify-center items-center bg-indigo-400 rounded-full" @click="$router.go(-1)">
            <font-awesome-icon :icon="['fa', 'angles-left']" />
          </button>
          <h1 class="ml-3 text-xl font-semibold text-gray-900">
            Créer un lien d'invitation
          </h1>
        </div>
        <FormulateForm v-model="formValues" class="login-form mt-8 w-full" :form-errors="formErrors" @submit="sendInviteLink">
          <h2 class="form-title"></h2>
          <FormulateInput
            name="firstname"
            type="text"
            label="Firstname"
            placeholder="Firstname"
            validation="required"
          />
          <FormulateInput
            name="lastname"
            type="text"
            label="Lastname"
            placeholder="Lastname"
            validation="required"
          />
          <FormulateInput
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            validation="required|email"
          />
          <FormulateInput
            class="mt-6"
            type="submit"
            label="Créer"
          />
        </FormulateForm>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DashboardUser',
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      formValues: { 
        password: Math.random().toString(36).substr(2, 10),
        enabled: false,
      },
      formErrors: [],
    }
  },
  methods: {
    async sendInviteLink() {
      try {
        await this.$axios.post('/auth/security/request-password-reset', { ...this.formValues })
        this.$router.push('/dashboard/users')
      } catch (e) {
        this.formErrors = [e.response.data.message]
      }
    }
  }
}

</script>