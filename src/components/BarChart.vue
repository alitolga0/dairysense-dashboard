<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
          events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']  // ÖNEMLİ
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'] // ÖNEMLİ
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { borderDash: [5, 5], color: '#eee' },
            ticks: {
              callback: value => value / 1000 + 'K'
            }
          }
        }
      })
    }
  }
};
</script>
