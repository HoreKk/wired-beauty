<template>
  <div class="w-full">
    <StudySidebar :is-create="isCreate" />
    <div class="px-4">
      <form enctype="multipart/form-data" @submit.prevent="exportData">
        <div class="shadow sm:rounded-md sm:overflow-hidden mt-8 mb-8">
          <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Report Builder</h3>
              <p class="mt-1 text-sm text-gray-500">Generate a Study report from imported datasets.</p>
            </div>
            <div class="flex flex-row w-full justify-items-start">
              <div class="w-1/3 mr-8">
                <p class="mb-2 text-sm text-gray-500">Select one or multiple datasets</p>
                <MultipleSelect v-model="selectedDataset" :options="datasets" placeholder="Select your datasets" label="name" :multiple="true" track-by="name"></MultipleSelect>
              </div>
              <div class="w-1/3">
                <p class="mb-2 text-sm text-gray-500">Select one or multiple sheets that contains the data</p>
                <MultipleSelect v-model="selectedSheet" :options="sheets" placeholder="Select Sheets" label="name" :multiple="true" track-by="name"></MultipleSelect>
              </div>
            </div>

            <div class="grid gap-6">
              <div class="mt-6 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <h1 class="font-bold text-lg leading-6 text-gray-900">Score 1 Anti-oxydation</h1>
                <div class="my-8 flex flex-row justify-evenly">
                  <LineChart :key="keyChart" :data="stepOneChart" :options="stepOneChart.options" />
                  <ScatterChart :key="keyChart" :data="stepOneChart.graph1" :options="stepOneChart.graph1.options" />
                  <ScatterChart :key="keyChart" :data="stepOneChart.graph2" :options="stepOneChart.graph2.options" />
                </div>
                <div class="mx-14">
                  <label for="comment" class="block text-sm font-medium text-gray-700">Add comment</label>
                  <div class="mt-3">
                    <textarea v-model="stepOneChart.comment" rows="4" name="comment" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <h1 class="font-semibold text-lg leading-6 text-gray-900">Score 2 Moisturizing</h1>
                <div class="my-8 flex flex-row justify-evenly">
                  <LineChart :key="keyChart" :data="stepTwoChart" :options="stepTwoChart.options" />
                  <ScatterChart :key="keyChart" :data="stepTwoChart.graph1" :options="stepTwoChart.graph1.options" />
                  <ScatterChart :key="keyChart" :data="stepTwoChart.graph2" :options="stepTwoChart.graph2.options" />
                </div>
                <div class="mx-14">
                  <label for="comment" class="block text-sm font-medium text-gray-700">Add comment</label>
                  <div class="mt-3">
                    <textarea v-model="stepTwoChart.comment" rows="4" name="comment" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <h1 class="font-semibold text-lg leading-6 text-gray-900">Score 3 Protecting (Barrière)</h1>
                <div class="my-8 flex flex-row justify-evenly">
                  <LineChart :key="keyChart" :data="stepThreeChart" :options="stepThreeChart.options" />
                  <ScatterChart :key="keyChart" :data="stepThreeChart.graph1" :options="stepThreeChart.graph1.options" />
                  <ScatterChart :key="keyChart" :data="stepThreeChart.graph2" :options="stepThreeChart.graph2.options" />
                </div>
                <div class="mx-14">
                  <label for="comment" class="block text-sm font-medium text-gray-700">Add comment</label>
                  <div class="mt-3">
                    <textarea v-model="stepThreeChart.comment" rows="4" name="comment" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click.prevent="exportData">Export</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import StudySidebar from '~/components/dashboard/StudySidebar.vue';
import MultipleSelect from '~/components/MultipleSelect.vue';
import LineChart from '~/components/charts/LineChart.vue';
import ScatterChart from '~/components/charts/ScatterChart.vue';

export default {
  name: 'StudyReports',
  components: {
    StudySidebar,
    LineChart,
    ScatterChart,
    MultipleSelect
  },
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      selectedDataset: [],
      datasets: [],
      selectedSheet: [],
      sheets: [],
      stepOneChart: {
        labels: [],
        datasets: [],
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        comment: '',
        graph1: {
          labels: [],
          datasets: [],
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        },
        graph2: {
          labels: [],
          datasets: [],
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        }
      },
      stepTwoChart: {
        labels: [],
        datasets: [],
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        comment: '',
        graph1: {
          datasets: [],
          labels: [],
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        },
        graph2: {
          datasets: [],
          labels: [],
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        }
      },
      stepThreeChart: {
        labels: [],
        datasets: [],
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        comment: '',
        graph1: {
          labels: [],
          datasets: [],
          options: {}
        },
        graph2: {
          labels: [],
          datasets: [],
          options: {}
        }
      },
      keyChart: 0
    }
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

      // Criteria 1 = Anti-oxydation
      this.generateCharts(1);
      // Criteria 1 = Hydration
      this.generateCharts(2);
      // Criteria 1 = Protection
      this.generateCharts(3);
      // Rerender charts
      this.keyChart++;
    },
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
    async exportData() {
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
    generateCharts(scoreId) {
      let data = this.selectedSheet.flatMap(sheet => sheet.data);
      data = data.map(col => col);
      const stepsChart = {
        labels: [],
        datasets: [],
        options: {},
        comment: '',
        graph1: {
          labels: [],
          datasets: [],
          options: {}
        },
        graph2: {
          labels: [],
          datasets: [],
          options: {}
        }
      };
      stepsChart.labels = ['T0_day 0', 'Timme_day 0 after application', 'T7_day 7', 'T14_day 14'];
      stepsChart.graph1.labels = ['T0_day 0', 'Timme_day 0 after application', 'T7_day 7', 'T14_day 14'];
      stepsChart.graph2.labels = ['T0_day 0', 'Timme_day 0 after application', 'T7_day 7', 'T14_day 14'];
      const AvgVITC = [];
      const AvgSKC = [];
      const ScatterVITC = [];
      const ScatterSKC = [];
      for (let i = 0; i < 4; i ++) {
        AvgVITC[i] = data.filter(d => d.product_code === 100218 && d.session_id === i+1 && d.score_skinbiosense === scoreId);
        ScatterVITC[i] = data.filter(d => d.product_code === 100218 && d.session_id === i+1 && d.score_skinbiosense === scoreId).map((d) => {
          return {
            'x': d.session_id,
            'y': d.mesure
          };
        });
        AvgVITC[i] = AvgVITC[i].reduce((p, c) => p + c.mesure, 0 ) / AvgVITC[i].length;
        AvgSKC[i] = data.filter(d => d.product_code === 417432 && d.session_id === i+1 && d.score_skinbiosense === scoreId);
        ScatterSKC[i] = data.filter(d => d.product_code === 417432 && d.session_id === i+1 && d.score_skinbiosense === scoreId).map((d) => {
          return {
            'x': d.session_id,
            'y': d.mesure
          };
        });
        AvgSKC[i] = AvgSKC[i].reduce((p, c) => p + c.mesure, 0 ) / AvgSKC[i].length;
      }
      stepsChart.graph1 = {
        labels: ['TO_day 0', 'Timme_day 0 after application', 'T7_day 7', 'T14_day 14'],
        datasets: [
          {
            label: 'Average_VITC',
            backgroundColor: '#FF7F50',
            data: AvgVITC.map((d, i) => {return { x: i+1, y: d }}),
            fill: false,
            borderColor: 'blue',
            borderWidth: 6,
            pointRadius: 6,
            pointStyle : 'line'
          },
          {
            label: 'VITC',
            backgroundColor: '#FF7F50',
            data: ScatterVITC.reduce((acc, curVal) => acc.concat(curVal), []),
            fill: false,
            borderColor: '#F97F50',
            borderWidth: 3,
            pointRadius: 3,
            borderCapStyle : 'round'
          }
        ],
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'VitC build up power at T0, TImme, T7 and T14'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'uA.V'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'N° Session'
              }
            }]
          },
        }
      };
      stepsChart.graph2 = {
        labels: ['T0_day 0', 'TImme_day 0 after application', 'T7_day 7', 'T14_day 14'],
        datasets: [
          {
            label: 'Average_SKC',
            backgroundColor: '#6495ED',
            data: AvgSKC.map((d, i) => {return { x: i+1, y: d }}),
            fill: false,
            borderColor: 'red',
            borderWidth: 6,
            pointRadius: 6,
            pointStyle : 'line'
          },
          {
            label: 'SKC',
            backgroundColor: '#6495ED',
            data: ScatterSKC.reduce((acc, curVal) => acc.concat(curVal), []),
            fill: false,
            borderColor: '#6495ED',
            borderWidth: 3,
            pointRadius: 3,
            borderCapStyle : 'round'
          }
        ],
        options: {
          responsive: true, 
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'SkinCeuticals build up power at T0, TImme, T7 and T14'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'uA.V'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'N° Session'
              }
            }]
          },
        }
      };
      stepsChart.datasets.push({
          label: 'VITC',
          backgroundColor: '#FF7F50',
          data: AvgVITC,
          fill: false,
          borderColor: '#F97F50',
          borderWidth: 3,
          pointRadius: 3,
          borderDash: [0,6],
          borderCapStyle : 'round',
          lineTension: 0
        },
        {
          label: 'SKC',
          backgroundColor: '#6495ED',
          data: AvgSKC,
          fill: false,
          borderColor: '#6495ED',
          borderWidth: 3,
          pointRadius: 3,
          borderDash: [0,6],
          borderCapStyle : 'round',
          lineTension: 0
        });
      stepsChart.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'uA.V'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'N° Session'
            }
          }]
        },
        title: {
          display: true,
          text: 'VitC & SkinCeuticals build up power at T0, TImme, T7 and T14'
        }
      }
      if (scoreId === 1) this.stepOneChart = stepsChart;
      if (scoreId === 2) this.stepTwoChart = stepsChart;
      if (scoreId === 3) this.stepThreeChart = stepsChart;
    }
  }
}
</script>
