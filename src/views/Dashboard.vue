<template>
  <div class="dashboard-container">
    <div class="navbar-area">
      <AppNavbar />
    </div>

    <button class="mobile-sidebar-toggle" @click="toggleRightSidebar">
      <font-awesome-icon :icon="['fas', 'bell']" />
      <font-awesome-icon
        v-if="isRightSidebarOpen"
        :icon="['fas', 'times']"
        class="close-icon"
      />
    </button>
    <div class="dashboard-content-area">
      <div class="dashboard-grid">
        <div class="dashboard-card overview-card">
          <div class="card-item">
            <span class="card-label">Son 24 Saat Süt</span>
            <p class="card-value">
              7,265
              <span class="change positive"
                >+10.01% <font-awesome-icon :icon="['fas', 'caret-up']"
              /></span>
            </p>
          </div>
          <div class="card-item">
            <span class="card-label">Dün Toplam Süt</span>
            <p class="card-value">
              3,671
              <span class="change negative"
                >-0.03% <font-awesome-icon :icon="['fas', 'caret-down']"
              /></span>
            </p>
          </div>
          <div class="card-item">
            <span class="card-label">Sağım İnek Sayısı</span>
            <p class="card-value">
              156
              <span class="change positive"
                >+15.03% <font-awesome-icon :icon="['fas', 'caret-up']"
              /></span>
            </p>
          </div>
          <div class="card-item">
            <span class="card-label">Ortalama Süt</span>
            <p class="card-value">
              2,318
              <span class="change positive"
                >+8.08% <font-awesome-icon :icon="['fas', 'caret-up']"
              /></span>
            </p>
          </div>
        </div>

        <div class="dashboard-card large-chart-card">
          <div class="card-header-tabs">
            <h3 class="card-title">Toplam Süt</h3>
            <div class="tabs">
              <button class="tab-button active">Sağlanan Hayvan Sayısı</button>
              <button class="tab-button">Sağım Süresi</button>
              <button class="tab-button">24 Saat</button>
              <button class="tab-button">10 Gün Ortalama</button>
            </div>
            <div class="date-selector">
              <button class="period-button">
                Bugün <font-awesome-icon :icon="['fas', 'chevron-down']" />
              </button>
            </div>
          </div>
          <div class="chart-wrapper">
            <LineChart
              :chart-data="lineChartData"
              :chart-options="lineChartOptions"
            />
          </div>
        </div>

        <div class="dashboard-card status-card">
          <h3 class="card-title">Çiftlik Başarı Durumu</h3>
          <ul class="status-list">
            <li>
              Tohumlama
              <span class="status-bar"><span style="width: 70%"></span></span>
            </li>
            <li>
              Sağım Süresi
              <span class="status-bar"><span style="width: 50%"></span></span>
            </li>
            <li>
              Tedaviler
              <span class="status-bar"><span style="width: 85%"></span></span>
            </li>
            <li>
              Protokoller
              <span class="status-bar"><span style="width: 60%"></span></span>
            </li>
            <li>
              Veri Girişi
              <span class="status-bar"><span style="width: 90%"></span></span>
            </li>
            <li>
              Kızgınlıklar
              <span class="status-bar"><span style="width: 75%"></span></span>
            </li>
          </ul>
        </div>

        <div class="dashboard-card small-chart-card">
          <h3 class="card-title">Haftalık Süt Üretimi</h3>
          <div class="chart-wrapper">
            <BarChart
              :chart-data="barChartData"
              :chart-options="barChartOptions"
            />
          </div>
        </div>

        <div class="dashboard-card small-chart-card">
          <h3 class="card-title">İnek Envanteri</h3>
          <div class="chart-wrapper small-donut-chart-wrapper">
            <DoughnutChart
              :chart-data="doughnutChartData"
              :chart-options="doughnutChartOptions"
            />
          </div>
          <ul class="legend-list">
            <li>
              <span
                class="legend-color"
                style="background-color: #4caf50"
              ></span>
              Tohumlanmamış <span class="legend-value">52.1%</span>
            </li>
            <li>
              <span
                class="legend-color"
                style="background-color: #2196f3"
              ></span>
              Tohumlanmış <span class="legend-value">22.8%</span>
            </li>
            <li>
              <span
                class="legend-color"
                style="background-color: #ffc107"
              ></span>
              Gebe <span class="legend-value">13.9%</span>
            </li>
            <li>
              <span
                class="legend-color"
                style="background-color: #9e9e9e"
              ></span>
              Kuru <span class="legend-value">11.2%</span>
            </li>
          </ul>
        </div>
        <div class="dashboard-card small-chart-card weather-card">
          <h3 class="card-title"></h3>
          <weather-widget />
        </div>

        <div class="dashboard-card full-width-card">
          <h3 class="card-title">Planlanmış İşlemler</h3>
          <div class="placeholder-content">
            <p>Burada planlanmış işlemlerin listesi veya takvimi yer alacak.</p>
          </div>
        </div>
      </div>
    </div>

    <div :class="['right-sidebar-area', { 'is-open': isRightSidebarOpen }]">
      <button class="sidebar-close-button" @click="toggleRightSidebar">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
      <RightSidebar />
    </div>
  </div>
</template>

<script>
import WeatherWidget from "../components/WeatherWidget.vue";
import AppNavbar from "../components/Navbar.vue";
import RightSidebar from "../components/RightSidebar.vue";
import LineChart from "../components/LineChart.vue";
import BarChart from "../components/BarChart.vue";
import DoughnutChart from "../components/DoughnutChart.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretUp,
  faCaretDown,
  faChevronDown,
  faBell,
  faTimes,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCaretUp,
  faCaretDown,
  faChevronDown,
  faBell,
  faTimes,
  faCalendarAlt
);

export default {
  name: "DashboardView",
  components: {
    AppNavbar,
    RightSidebar,
    FontAwesomeIcon,
    LineChart,
    BarChart,
    DoughnutChart,
    WeatherWidget,
  },
  data() {
    return {
      isRightSidebarOpen: false,

      lineChartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Toplam Süt",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            borderColor: "#007bff",
            pointBackgroundColor: "#007bff",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#007bff",
            data: [10000, 15000, 12000, 20000, 18000, 25000, 22000],
            fill: true,
            tension: 0.4,
            borderWidth: 2,
          },
          {
            label: "10 Gün Ortalama",
            backgroundColor: "rgba(255, 193, 7, 0.1)",
            borderColor: "#ffc107",
            pointBackgroundColor: "#ffc107",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#ffc107",
            data: [8000, 10000, 9000, 15000, 13000, 18000, 16000],
            fill: false,
            tension: 0.4,
            borderWidth: 1,
            borderDash: [5, 5],
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { borderDash: [5, 5], color: "#eee" },
            ticks: {
              callback: function (value) {
                return value / 1000 + "K";
              },
            },
          },
        },
      },

      barChartData: {
        labels: [
          "Ocak",
          "Şubat",
          "Mart",
          "Nisan",
          "Mayıs",
          "Haziran",
          "Temmuz",
        ],
        datasets: [
          {
            label: "Haftalık Süt Üretimi",
            backgroundColor: [
              "#88B04B",
              "#5D8AA8",
              "#D9B380",
              "#A4C639",
              "#7B68EE",
              "#C70039",
              "#4682B4",
            ],
            data: [15000, 22000, 18000, 25000, 19000, 27000, 23000],
            borderRadius: 5,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { borderDash: [5, 5], color: "#eee" },
            ticks: {
              callback: function (value) {
                return value / 1000 + "K";
              },
            },
          },
        },
      },

      doughnutChartData: {
        labels: ["Tohumlanmamış", "Tohumlanmış", "Gebe", "Kuru"],
        datasets: [
          {
            backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#9E9E9E"],
            data: [52.1, 22.8, 13.9, 11.2],
          },
        ],
      },
      doughnutChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed) {
                  label += context.parsed + "%";
                }
                return label;
              },
            },
            mode: "point",
            intersect: false,
          },
        },
      },
    };
  },
  methods: {
    toggleRightSidebar() {
      this.isRightSidebarOpen = !this.isRightSidebarOpen;
    },
  },
};
</script>
<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f4f7fa;
  overflow-x: hidden;
}

.navbar-area {
  flex-shrink: 0;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
}

.dashboard-content-area {
  flex-grow: 1;
  padding: 25px;
  box-sizing: border-box;
  margin-left: 250px;
  margin-right: 320px;
  padding-top: 25px;
}

.page-title {
  font-size: 26px;
  color: #333;
  margin-bottom: 25px;
  font-weight: 700;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.dashboard-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.dashboard-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.overview-card {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  background: none;
  box-shadow: none;
  padding: 0;
}
.overview-card .card-item {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}
.overview-card .card-label {
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
}
.overview-card .card-value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
  display: flex;
  align-items: baseline;
}
.overview-card .change {
  font-size: 14px;
  font-weight: normal;
  margin-left: 8px;
  display: flex;
  align-items: center;
}
.overview-card .change.positive {
  color: #28a745;
}
.overview-card .change.negative {
  color: #dc3545;
}
.overview-card .change svg {
  margin-left: 3px;
}

.weather-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-card weather-widget {
  width: 100%;
}

.large-chart-card {
  grid-column: span 2;
}
.card-header-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
}
.card-header-tabs .card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
.card-header-tabs .tabs {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}
.card-header-tabs .date-selector {
  margin-top: 5px;
}
.card-header-tabs .tab-button {
  background: #f0f0f0;
  border: 1px solid #ddd;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  color: #555;
  transition: all 0.2s ease;
}
.card-header-tabs .tab-button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
.card-header-tabs .tab-button:hover:not(.active) {
  background: #e9e9e9;
}
.period-button {
  background: #fff;
  border: 1px solid #ddd;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 5px;
}
.period-button:hover {
  background: #f8f8f8;
}

.chart-wrapper {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.large-line-chart {
  min-height: 280px;
}

.status-card {
  grid-column: span 1;
}
.status-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}
.status-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 500;
  color: #555;
}
.status-bar {
  background-color: #e1e1e1;
  border-radius: 10px;
  flex: 1;
  height: 12px;
  margin-left: 15px;
  overflow: hidden;
  position: relative;
}
.status-bar span {
  display: block;
  height: 100%;
  background-color: #007bff;
  border-radius: 10px;
  position: relative;
  transition: width 0.3s ease;
}

.small-chart-card {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
}
.small-chart-card .card-title {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.small-donut-chart-wrapper {
  width: 100%;
  height: 180px;
  max-width: 280px;
  margin: 0 auto;
}

.legend-list {
  list-style: none;
  padding: 0;
  margin: 15px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.legend-list li {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #555;
}
.legend-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 3px;
}
.legend-value {
  margin-left: 5px;
  font-weight: 600;
}

.full-width-card {
  grid-column: 1 / -1;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.dashboard-grid::-webkit-scrollbar {
  display: none;
}

.mobile-sidebar-toggle {
  display: none;
  position: fixed;
  top: 15px;
  right: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  font-size: 18px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease;
}

.mobile-sidebar-toggle:hover {
  background-color: #0056b3;
}

.mobile-agenda-button:hover {
  background-color: #0056b3;
}

.sidebar-close-button {
  display: none;
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #555;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

.sidebar-close-button:hover {
  color: #000;
}

@media (min-width: 769px) and (max-width: 1200px) {
  .dashboard-container {
    flex-direction: row;
  }
  .dashboard-content-area {
    margin-left: 250px;
    margin-right: 0;
    padding: 20px;
  }

  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .overview-card,
  .large-chart-card,
  .full-width-card {
    grid-column: 1 / -1;
  }
  .status-card,
  .small-chart-card {
    grid-column: span 1;
  }
  .card-header-tabs {
    flex-direction: column;
    align-items: flex-start;
  }
  .card-header-tabs .tabs {
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 8px;
  }
  .card-header-tabs .date-selector {
    width: 100%;
    margin-top: 10px;
  }
  .period-button {
    width: 100%;
    justify-content: space-between;
  }

  .mobile-sidebar-toggle,
  .mobile-agenda-button {
    display: none;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  .navbar-area {
    width: 100%;
    position: fixed;
    height: 64px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  .dashboard-content-area {
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-top: 74px !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .mobile-sidebar-toggle,
  .mobile-agenda-button {
    display: flex;
  }

  .mobile-sidebar-toggle {
    padding: 10px;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 18px;
    align-items: center;
    justify-content: center;
  }

  .sidebar-close-button {
    display: block;
  }

  .page-title {
    font-size: 22px;
    margin-bottom: 15px;
  }
  .dashboard-grid {
    grid-template-columns: 1fr !important;
    gap: 15px !important;
  }
  .dashboard-card {
    grid-column: 1 / -1 !important;
    padding: 15px !important;
  }
  .overview-card {
    grid-template-columns: 1fr !important;
  }
  .overview-card .card-item {
    padding: 15px !important;
  }
  .card-header-tabs {
    flex-direction: column;
    align-items: flex-start;
  }
  .card-header-tabs .tabs {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    gap: 8px;
  }
  .card-header-tabs .tab-button {
    width: 100%;
    text-align: center;
  }
  .card-header-tabs .date-selector {
    width: 100%;
    margin-top: 10px;
  }
  .period-button {
    width: 100%;
    justify-content: space-between;
  }
  .legend-list {
    justify-content: flex-start;
  }
}
</style>
