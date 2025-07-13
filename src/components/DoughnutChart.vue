<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
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
        cutout: '70%',
        interaction: {
          mode: 'nearest',
          intersect: false,
          events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'] // ÖNEMLİ
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'nearest',
            intersect: false,
            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'], // ÖNEMLİ
            callbacks: {
              label: context => {
                let label = context.label || '';
                if (label) label += ': ';
                if (context.parsed) label += context.parsed + '%';
                return label;
              }
            }
          }
        }
      })
    }
  }
};
</script>
