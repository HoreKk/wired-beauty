<template>
  <div class="w-full px-8 py-10">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Studies</h1>
        <p class="mt-2 text-sm text-gray-700">List of all the past and current Studies</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <NuxtLink to="studies/create" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add study</NuxtLink>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Study name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Prototypes</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sample size</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="relative py-3.5 pl-2 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="study in studies" :key="study.name">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ study.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ study.prototypes && study.prototypes.length > 0 ? study.prototypes.map(p => p) : '' }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ study.sampleSize }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ study.startDate }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ study.endDate }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ study.status }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <NuxtLink :to="'studies/' + study._id" class="text-indigo-600 hover:text-indigo-900">
                      <span class="sr-only">, {{ study.name }}</span>
                      <font-awesome-icon :icon="['fa', 'pen-to-square']" :class="['flex-shrink-0 -ml-1 mr-3 h-4 w-4']" aria-hidden="true" />
                    </NuxtLink>
                    <button class="text-red-600 hover:text-red-900" @click.prevent="deleteStudy(study._id)">
                      <font-awesome-icon :icon="['fa', 'trash-can']" :class="['flex-shrink-0 -ml-1 mr-3 h-4 w-4']" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudiesList',
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      reportLists: [],
      studies: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$axios
        .get("/study/studies")
        .then(({ data }) => {
          if (data.length > 0) {
            this.studies = { ...data };
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    async deleteStudy(studyId) {
      if (!studyId) return;
      await this.$axios.delete('/study/studies/' + studyId);
      this.init();
    },
  }
}
</script>
