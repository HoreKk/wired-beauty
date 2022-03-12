<template>
  <div class="w-full">
    <StudySidebar :is-create="isCreate" />
    <div class="px-4 mt-6">
      <form enctype="multipart/form-data" @submit.prevent="handleStudyForm">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Report Builder</h3>
              <p class="mt-1 text-sm text-gray-500">Generate a Study report from imported datasets.</p>
            </div>
            <div class="">
              <p class="mb-2 text-sm text-gray-500">Select one or multiple datasets</p>
              <MultipleSelect v-model="selectedDataset" :options="datasets" placeholder="Select your datasets" label="name" :multiple="true" track-by="name"></MultipleSelect>
            </div>
            <div class="mt-4">
              <p class="mb-2 text-sm text-gray-500">Select the sheet that contains data keys</p>
              <MultipleSelect v-model="selectedSheet" :options="sheets" placeholder="Select Sheets" label="name" :multiple="true" track-by="name"></MultipleSelect>
            </div>

            <div class="grid gap-6">
              <h2 class="font-semibold text-lg leading-6 text-gray-900">Score 1 Anti-oxydation</h2>
              <div class="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <h3 class="text-center text-lg leading-6 font-medium text-gray-900">Average VITC & SKC from T0 to T14, Criteria 1 = Anti-oxydation, Sample size (N = 1000)</h3>
                <BarChart :data="stepOneChart" :options="{ responsive: true, maintainAspectRatio: false }" />
                <BarChart :data="stepOneChartCloud" :options="{ responsive: true, maintainAspectRatio: false }" />
              </div>

              <h2 class="font-semibold text-lg leading-6 text-gray-900">Score 2 Moisturizing</h2>
              <div class="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <h3 class="text-center text-lg leading-6 font-medium text-gray-900">Average VITC & SKC from T0 to T14, Criteria 2 = Moisturizing, Sample size (N = 1000)</h3>
                <BarChart :data="stepTwoChart" :options="{ responsive: true, maintainAspectRatio: false }" />
              </div>

              <h2 class="font-semibold text-lg leading-6 text-gray-900">Score 3 Protecting (Barrière)</h2>
              <div class="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <h3 class="text-center text-lg leading-6 font-medium text-gray-900">Average VITC & SKC from T0 to T14, Criteria 3 = Protecting (Barrière), Sample size (N = 1000)</h3>
                <BarChart :data="stepThreeChart" :options="{ responsive: true, maintainAspectRatio: false }" />
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
import MultipleSelect from '~/components/MultipleSelect.vue';
import BarChart from '~/components/charts/BarChart.vue';

export default {
  name: 'StudyReports',
  components: {
    StudySidebar,
    BarChart,
    MultipleSelect
  },
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      selectedDataset: [],
      datasets: [],
      sheets: [],
      selectedSheet: [],
      columns: [],
      selectedColumns: [],
      firstOption: [],
      firstOptionList: [],
      stepOneChart: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '#41B38A',
            data: []
          }
        ]
      },
      stepTwoChart: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '#41B38A',
            data: []
          }
        ]
      },
      stepThreeChart: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '#41B38A',
            data: []
          }
        ]
      },
      files: []
    }
  },
  computed: {
    isCreate() {
      return this.$route.params.slug === 'create';
    },
  },
  watch: {
    selectedDataset() {
      this.$axios.post('/study/report/datasets', this.selectedDataset)
      .then((response) => {
        this.sheets = response.data;
      });

    },
    selectedSheet() {
      let cols = this.selectedSheet.flatMap(sheet => sheet.data);
      cols = cols.map(col => Object.keys(col))
      cols = [].concat(...cols);
      cols = [...new Set(cols)];
      this.columns = cols;

      let data = this.selectedSheet.flatMap(sheet => sheet.data);
      data = data.map(col => col);

      // Criteria 1 = Anti-oxydation
      this.stepOneChart.labels = ['TO_jour 0', 'Timme_jour 0 après application', 'T7_jour 7', 'T14_jour 14'];
      const AvgVITC = [];
      const AvgSKC = [];
      for (let i = 0; i < 4; i ++) {
        AvgVITC[i] = data.filter(d => d.product_code === 100218 && d.session_id === i+1 && d.score_skinbiosense === 1);
        AvgVITC[i] = AvgVITC[i].reduce((p, c) => p + c.mesure, 0 ) / AvgVITC[i].length;
        AvgSKC[i] = data.filter(d => d.product_code === 417432 && d.session_id === i+1 && d.score_skinbiosense === 1);
        AvgSKC[i] = AvgSKC[i].reduce((p, c) => p + c.mesure, 0 ) / AvgSKC[i].length;

      }
      this.stepOneChart.datasets = [ {
          label: 'VITC',
          backgroundColor: '#FF7F50',
          data: AvgVITC
        },
        {
          label: 'SKC',
          backgroundColor: '#6495ED',
          data: AvgSKC
        } ];

      // Criteria 2 = Moisturizing
      this.stepTwoChart.labels = ['TO_jour 0', 'Timme_jour 0 après application', 'T7_jour 7', 'T14_jour 14'];
      const AvgVITC2 = [];
      const AvgSKC2 = [];
      for (let i = 0; i < 4; i ++) {
        AvgVITC2[i] = data.filter(d => d.product_code === 100218 && (d.session_id === i+1) && d.score_skinbiosense === 2);
        AvgVITC2[i] = AvgVITC2[i].reduce((p, c) => p + c.mesure, 0 ) / AvgVITC2[i].length;
        AvgSKC2[i] = data.filter(d => d.product_code === 417432 && d.session_id === i+1 && d.score_skinbiosense === 2);
        AvgSKC2[i] = AvgSKC2[i].reduce((p, c) => p + c.mesure, 0 ) / AvgSKC2[i].length;

      }
      this.stepTwoChart.datasets = [ {
          label: 'VITC',
          backgroundColor: '#FF7F50',
          data: AvgVITC2
        },
        {
          label: 'SKC',
          backgroundColor: '#6495ED',
          data: AvgSKC2
        } ];

      // Criteria 3 = Protecting
      this.stepThreeChart.labels = ['TO_jour 0', 'Timme_jour 0 après application', 'T7_jour 7', 'T14_jour 14'];
      const AvgVITC3 = [];
      const AvgSKC3 = [];
      for (let i = 0; i < 4; i ++) {
        AvgVITC3[i] = data.filter(d => d.product_code === 100218 && (d.session_id === i+1) && d.score_skinbiosense === 3);
        AvgVITC3[i] = AvgVITC3[i].reduce((p, c) => p + c.mesure, 0 ) / AvgVITC3[i].length;
        AvgSKC3[i] = data.filter(d => d.product_code === 417432 && d.session_id === i+1 && d.score_skinbiosense === 3);
        AvgSKC3[i] = AvgSKC3[i].reduce((p, c) => p + c.mesure, 0 ) / AvgSKC3[i].length;

      }
      this.stepThreeChart.datasets = [ {
          label: 'VITC',
          backgroundColor: '#FF7F50',
          data: AvgVITC3
        },
        {
          label: 'SKC',
          backgroundColor: '#6495ED',
          data: AvgSKC3
        } ];
    },
    selectedColumns() {
      let opts = this.selectedSheet.flatMap(sheet => sheet.data);
      opts = Object.keys(opts).filter(o => o.includes(this.selectedColumns))
      this.firstOptionList = opts;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$axios
        .get("/study/datasets/" + this.$route.params.slug)
        .then(({ data }) => {
          this.datasets = data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    blobToBase64(blob) {
      // eslint-disable-next-line promise/param-names
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    parseBuffer(fileId) {
      return this.$axios.get('/study/dataset/' + fileId + '/download', { responseType: 'blob' })
        .then((response) => {
      });
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
  }
}
</script>
