<template>
  <div class="w-full px-8 py-10">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Users</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add user</button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Fullname</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="user in users" :key="user._id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ user.firstname + ' ' + user.lastname }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ roles[user.type] }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Edit<span class="sr-only">, {{ user.firstname }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- This example requires Tailwind CSS v2.0+ -->
      <div class="bg-white px-3 py-4 flex items-center justify-between border-t border-gray-200">
        <div class="flex-1 flex justify-between sm:hidden">
          <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
          <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              {{ ' ' }}
              <span class="font-medium">
                {{ (pagination.page - 1) * pagination.numberPerPage + 1 }}
              </span>
              {{ ' ' }}
              to
              {{ ' ' }}
              <span class="font-medium">
                {{ pagination.numberPerPage * pagination.page > pagination.count ? pagination.count : pagination.numberPerPage * pagination.page }}
              </span>
              {{ ' ' }}
              of
              {{ ' ' }}
              <span class="font-medium">
                {{ pagination.count }}
              </span>
              {{ ' ' }}
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button @click="--pagination.page" :disabled="pagination.page === 1" class="relative not-disabled:cursor-pointer inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-75 disabled:bg-gray-100">
                <font-awesome-icon :icon="['fa', 'chevron-left']" />
              </button>
              <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
              <button v-for="page in pageArray" :key="page" @click="pagination.page = page" :class="[page == pagination.page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50']" class="relative cursor-pointer inline-flex items-center px-4 py-2 border text-sm font-medium"> 
                {{ page }}
              </button>
              <button @click="++pagination.page" :disabled="pagination.page === pageArray.length" class="relative not-disabled:cursor-pointer inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-75 disabled:bg-gray-100">
                <font-awesome-icon :icon="['fa', 'chevron-right']" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DashboardUsersList',
  layout: 'dashboard',
  data() {
    return {
      pagination: {
        page: 1,
        numberPerPage: 4,
        count: 0,
      },
      users: [],
      roles: ['Client', 'Admin'],
    }
  },
  computed: {
    pageArray() { 
      return [...Array(Math.round(this.pagination.count / this.pagination.numberPerPage)).keys()].map(x => ++x)
    }
  },
  watch: {
    'pagination.page'() {
      this.fetchUsers();
    },
  },
  async mounted() {
    const response = await this.$axios.get('/user/count')
    this.pagination.count = response.data

    await this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      const response = await this.$axios.get('/user', {
        params: this.pagination,
      })
      this.users = response.data
    }
  },
}

</script>