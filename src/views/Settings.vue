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
      <h1 class="page-title">Ayarlar Sayfası</h1>
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
import AppNavbar from "../components/Navbar.vue";
import RightSidebar from "../components/RightSidebar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faBell, faTimes);

export default {
  name: "SettingView",
  components: {
    AppNavbar,
    RightSidebar,
    FontAwesomeIcon,
  },
  data() {
    return {
      isRightSidebarOpen: false,
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
  font-weight: 700;
  margin-bottom: 20px;
}

.right-sidebar-area {
  width: 300px;
  position: fixed;
  top: 0;
  right: -300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.05);
  transition: right 0.3s ease;
  z-index: 1000;
}
.right-sidebar-area.is-open {
  right: 0;
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

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  .navbar-area {
    width: 100%;
    height: 64px;
    position: fixed;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  .dashboard-content-area {
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-top: 74px !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
  .mobile-sidebar-toggle {
    display: flex;
  }
  .sidebar-close-button {
    display: block;
  }
}
</style>
