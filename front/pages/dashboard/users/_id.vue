<template>
  <div class="w-full px-8 py-10">
    <div class="flex w-full items-center">
      <div class="flex flex-col w-full">
        <h1 class="text-xl font-semibold text-gray-900">
          {{ userState }} un utilisateur
        </h1>
        <FormulateForm v-model="formValues" class="login-form mt-8 w-full" :form-errors="formErrors" @submit="saveUser">
          <h2 class="form-title"></h2>
          <FormulateInput
            v-model="user.firstname"
            name="firstname"
            type="text"
            label="Firstname"
            placeholder="Your firstname"
            validation="required"
          />
          <FormulateInput
            v-model="user.lastname"
            name="lastname"
            type="text"
            label="Lastname"
            placeholder="Your lastname"
            validation="required"
          />
          <FormulateInput
            v-model="user.email"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            validation="required|email"
          />
          <FormulateInput
            v-model="user.type"
            name="type"
            type="select"
            :options="rolesUser"
          />
          <div class="double-wide">
            <FormulateInput
              name="password"
              type="password"
              label="Password"
              placeholder="Your password"
              :validation="$route.params.id !== 'new' ? 'optional|min:8' : 'required|min:8'"
            />
            <FormulateInput
              name="password_confirm"
              type="password"
              label="Confirm your password"
              placeholder="Confirm password"
              :validation="$route.params.id !== 'new' ? 'optional|confirm|min:8' : 'required|confirm|min:8'"
              validation-name="Confirmation"
            />
          </div>
          <FormulateInput
            class="mt-6"
            type="submit"
            :label="userState"
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
  async asyncData({ params, $axios }) {
    if (params.id.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        const response = await $axios.get(`/user/${params.id}`)
        return { user: response.data }
      } catch (e) {
        console.log(e)
      }
    } else {
      return { user: { type: 0 } }
    }
  },
  data() {
    return {
      user: {},
      formValues: {},
      formErrors: [],
      rolesUser: [
        { label: 'Client', value: 0 },
        { label: 'Admin', value: 1 },
      ]
    }
  },
  computed: {
    fullName() {
      return `${this.user.firstname} ${this.user.lastname}`
    },
    userState() {
      return this.$route.params.id !== 'new' ? 'Modifier' : 'Créer'
    }
  },
  methods: {
    async saveUser() {
      if (this.userState === 'Modifier') {
        try {
          await this.$axios.put(`/user/update/${this.$route.params.id}`, { ...this.formValues })
          this.$router.push('/dashboard/users')
        } catch (e) {
          this.formErrors = [e.response.data.message]
        }
      } else {
        try {
          await this.$axios.post('/auth/register', { ...this.formValues, type: parseInt(this.formValues.type) })
          this.$router.push('/dashboard/users')
        } catch (e) {
          this.formErrors = [e.response.data.message]
        }
      }
    }
  }
}

</script>