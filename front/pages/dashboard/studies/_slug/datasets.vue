<template>
  <div class="w-full">
    <StudySidebar :is-create="isCreate" />

    <div class="px-4 mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Size</th>
                  <th scope="col" class="relative py-3.5 pl-2 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="_file in files" :key="_file._id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ _file.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatBytes(_file.size) }}</td>
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button class="text-indigo-600 hover:text-indigo-900 mr-6" @click.prevent="downloadFile(_file._id, _file.name)">
                      <font-awesome-icon :icon="['fa', 'download']" :class="['flex-shrink-0 -ml-1 mr-3 h-4 w-4']" aria-hidden="true" />
                    </button>
                    <button class="text-red-600 hover:text-red-900" @click.prevent="deleteFile(_file._id)">
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
    <div class="px-4 mt-6">
      <form enctype="multipart/form-data" @submit.prevent="handleStudyForm">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Import Datasets</h3>
              <p class="mt-1 text-sm text-gray-500">Import Excel file containing your datasets.</p>
            </div>

            <div class="grid gap-6">
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center flex flex-col justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" style=" fill:#000000;">
                    <path fill="#e3f2ff" d="M57,51H39c-1.105,0-2-0.895-2-2V13c0-1.105,0.895-2,2-2h18c1.105,0,2,0.895,2,2v36 C59,50.105,58.105,51,57,51z"></path>
                    <path fill="#72caaf" d="M36.832,57.948c0,0.426-0.235,0.688-0.376,0.805c-0.141,0.118-0.435,0.304-0.859,0.231h0.001 l-30.69-5.416c-1.007-0.178-1.738-1.049-1.738-2.072V10.504c0-1.023,0.731-1.894,1.738-2.072l30.69-5.416 c0.424-0.071,0.719,0.113,0.859,0.231c0.141,0.117,0.376,0.379,0.376,0.805V57.948z"></path>
                    <path fill="#5dbc9d" d="M7.031,30c-2.221,0-4.017,1.81-4,4.031l0.137,17.465c0,1.023,0.731,1.894,1.738,2.072l30.69,5.416h0 c0.424,0.073,0.719-0.113,0.859-0.231c0.141-0.117,0.376-0.379,0.376-0.805l0.144-23.923c0.013-2.219-1.781-4.024-4-4.024H7.031z"></path><path fill="#97e0bb" d="M36.456,3.247c-0.141-0.118-0.435-0.302-0.859-0.231L4.907,8.432 C3.899,8.61,3.168,9.481,3.168,10.504v4c0-1.023,0.731-1.894,1.738-2.072l30.69-5.416c0.424-0.071,0.719,0.113,0.859,0.231 c0.141,0.117,0.376,0.379,0.376,0.805v-4C36.832,3.626,36.596,3.364,36.456,3.247z"></path><path fill="#c5e4fa" d="M37 11H43V51H37z"></path><path fill="#8d6c9f" d="M57,10H38V5.384c0-0.889-0.391-1.727-1.072-2.298c-0.681-0.572-1.573-0.813-2.45-0.656L5.305,7.578 C3.39,7.916,2,9.572,2,11.517v38.967c0,1.944,1.39,3.601,3.305,3.938l29.174,5.148h0c0.174,0.031,0.349,0.046,0.523,0.046 c0.7,0,1.381-0.244,1.926-0.702C37.609,58.343,38,57.505,38,56.616V52h19c1.654,0,3-1.346,3-3V13C60,11.346,58.654,10,57,10z M36,56.616c0,0.405-0.224,0.654-0.357,0.766c-0.133,0.112-0.416,0.289-0.817,0.22h0L5.652,52.453C4.695,52.284,4,51.456,4,50.483 V11.517c0-0.973,0.695-1.801,1.652-1.97l29.173-5.148c0.401-0.067,0.684,0.107,0.817,0.22C35.776,4.729,36,4.979,36,5.384V56.616z M58,49c0,0.552-0.449,1-1,1H38v-6h3c0.552,0,1-0.447,1-1s-0.448-1-1-1h-3v-4h3c0.552,0,1-0.447,1-1s-0.448-1-1-1h-3v-4h3 c0.552,0,1-0.447,1-1s-0.448-1-1-1h-3v-4h3c0.552,0,1-0.447,1-1s-0.448-1-1-1h-3v-4h3c0.552,0,1-0.447,1-1s-0.448-1-1-1h-3v-6h19 c0.551,0,1,0.448,1,1V49z"></path><path fill="#8d6c9f" d="M51 18h-6c-.552 0-1 .447-1 1s.448 1 1 1h6c.552 0 1-.447 1-1S51.552 18 51 18zM51 24h-6c-.552 0-1 .447-1 1s.448 1 1 1h6c.552 0 1-.447 1-1S51.552 24 51 24zM51 30h-6c-.552 0-1 .447-1 1s.448 1 1 1h6c.552 0 1-.447 1-1S51.552 30 51 30zM51 36h-6c-.552 0-1 .447-1 1s.448 1 1 1h6c.552 0 1-.447 1-1S51.552 36 51 36zM51 42h-6c-.552 0-1 .447-1 1s.448 1 1 1h6c.552 0 1-.447 1-1S51.552 42 51 42z"></path><path fill="#faefde" d="M26.545,20.161c-0.463-0.301-1.083-0.17-1.383,0.294l-5.662,8.71l-5.662-8.71 c-0.301-0.464-0.921-0.595-1.383-0.294c-0.463,0.302-0.595,0.921-0.293,1.384L18.307,31l-6.146,9.455 c-0.301,0.463-0.169,1.082,0.293,1.384C12.624,41.948,12.812,42,12.999,42c0.327,0,0.648-0.16,0.839-0.455l5.662-8.71l5.662,8.71 C25.353,41.84,25.674,42,26.001,42c0.187,0,0.376-0.052,0.544-0.161c0.463-0.302,0.595-0.921,0.293-1.384L20.693,31l6.146-9.455 C27.14,21.082,27.008,20.463,26.545,20.161z"></path>
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileUpload($event)" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">XLSX, CSV up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click.prevent="submitFile">Upload</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import StudySidebar from '~/components/dashboard/StudySidebar.vue';

export default {
  name: 'StudyDatasets',
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
      file: '',
      files: []
    }
  },
  computed: {
    isCreate() {
      return this.$route.params.slug === 'create';
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      if (!this.isCreate) {
        await this.$axios
          .get("/study/datasets/" + this.$route.params.slug)
          .then(({ data }) => {
            this.files = { ...data };
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },
    async handleStudyForm() {
      if (this.$route.params.slug) {
        await this.$axios
          .post("/study/" + this.$route.params.slug, { ...this.study })
          .then(({ data }) => {
            console.log(data);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitFile() {
      if (!this.file) return;
      const formData = new FormData();
      formData.append('path', '/uploads');
      formData.append('file', this.file, this.file.name);
      await this.$axios.post('/study/upload-dataset/' + this.$route.params.slug, formData, {
        onUploadProgress (progressEvent) {
          this.uploadPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      });

      this.init();
    },
    downloadFile(fileId, fileName) {
      if (!fileId) return;
      return this.$axios.get('/study/dataset/' + fileId + '/download', { responseType: 'blob' })
        .then((response) => {
          const url = URL.createObjectURL(new Blob([response.data], {
            type: 'application/vnd.ms-excel'
          }))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click();
        });
    },
    async deleteFile(fileId) {
      if (!fileId) return;
      await this.$axios.delete('/study/dataset/' + fileId);
      this.init();
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
  }
}
</script>
