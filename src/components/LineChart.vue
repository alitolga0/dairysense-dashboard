<template>
  <canvas ref="chart"></canvas>
</template>

<script>
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

export default {
  name: 'LineChart',
  props: {
    chartData: { type: Object, required: true },
    chartOptions: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  mounted() {
    const ctx = this.$refs.chart.getContext('2d');
    this.chartInstance = new ChartJS(ctx, {
      type: 'line',
      data: this.chartData,
      options: {
        ...this.chartOptions,
        interaction: {
          mode: 'nearest',
          intersect: false,
          events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']
        },
        plugins: {
          tooltip: {
            mode: 'nearest',
            intersect: false,
            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']
          },
          legend: { display: false }
        }
      }
    });
  },
  watch: {
    chartData: {
      deep: true,
      handler(newData) {
        if (this.chartInstance) {
          this.chartInstance.data = newData;
          this.chartInstance.update();
        }
      }
    },
    chartOptions: {
      deep: true,
      handler(newOptions) {
        if (this.chartInstance) {
          this.chartInstance.options = newOptions;
          this.chartInstance.update();
        }
      }
    }
  },
  beforeUnmount() {
    if (this.chartInstance) this.chartInstance.destroy();
  }
};
</script>
