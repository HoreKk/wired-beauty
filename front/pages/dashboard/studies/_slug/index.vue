<template>
  <div class="w-full">
    <aside class="">
      <StudySidebar />
    </aside>

    <div class="px-4 mt-6">
      <form @submit.prevent="handleStudyForm">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">{{ isCreate ? 'Create a new Study' : 'Editing Study' }}</h3>
              <p class="mt-1 text-sm text-gray-500">Edit the study informations.</p>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="studyName" class="relative whitespace-nowrap text-sm font-medium text-gray-700">Study name</label>
                <div class="mt-1 rounded-md shadow-sm flex">
                  <input id="studyName" v-model="study.name" type="text" name="studyName" autocomplete="username" class="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300" />
                </div>
              </div>

              <div class="col-span-3">
                <label for="about" class="relative whitespace-nowrap text-sm font-medium text-gray-700">Description</label>
                <div class="mt-1">
                  <textarea id="about" v-model="study.description" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                </div>
                <p class="mt-2 text-sm text-gray-500">Brief description of the study.</p>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click.prevent="handleStudyForm">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import StudySidebar from '~/components/dashboard/StudySidebar.vue';

export default {
  name: 'StudyConf',
  components: {
    StudySidebar
  },
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      study: {
          name: "",
          description: "",
        },
    }
  },
  computed: {
    isCreate() {
      return this.$route.params.slug === 'create';
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      if (!this.isCreate) {
        await this.$axios
          .get("/study/" + this.$route.params.slug)
          .then(({ data }) => {
            this.study = { ...data };
          })
          .catch((e) => {
            console.error(e);
          });
      } 
    },
    async handleStudyForm() {
      if (this.isCreate) {
        await this.$axios
          .post("/study/create", { ...this.study })
          .then(({ data }) => {
            console.log(data);
            this.$router.push('/dashboard/studies/' + data._id);
          })
          .catch((e) => {
            console.error(e);
          });
      } else if (this.$route.params.slug) {
        await this.$axios
          .post("/study/" + this.$route.params.slug, { ...this.study })
          .then(({ data }) => {
            console.log(data);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
  }
}
</script>
