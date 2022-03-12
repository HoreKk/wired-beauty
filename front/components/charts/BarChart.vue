<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props: ['data', 'options'],
    watch: {
      data() {
        this.$data._chart.update();
      }
    },
    mounted() {
      this.renderChart(this.data, this.options);
    }
  }
</script>
