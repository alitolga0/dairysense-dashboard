<template>
  <div>
    <button
      class="mobile-notification-toggle"
      @click="toggleSidebar"
      aria-label="Sidebar aç/kapat"
    >
      <font-awesome-icon :icon="['fas', 'bell']" />
    </button>

    <aside :class="['right-sidebar', { 'is-open': isOpen }]">
      <button
        class="mobile-sidebar-close"
        @click="closeSidebar"
        aria-label="Sidebar kapat"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>

      <div class="sidebar-content">
        <div class="sidebar-section notifications-section">
          <h3 class="section-title">
            <font-awesome-icon :icon="['fas', 'bell']" class="section-icon" />
            Bildirimler
          </h3>
          <ul class="notification-list">
            <li
              class="notification-item"
              @click="
                showDetail(
                  'Yeni Giriş Yapılmamış',
                  'Henüz yeni giriş yapılmadı.'
                )
              "
            >
              <font-awesome-icon
                :icon="['fas', 'exclamation-circle']"
                class="item-icon"
              />
              <span class="notification-text">Yeni Giriş Yapılmamış</span>
              <span class="notification-time">Bugün</span>
            </li>
            <li
              class="notification-item"
              @click="
                showDetail(
                  '4 Yeni Kızgınlık',
                  'Son 39 dakikada 4 yeni kızgınlık tespit edildi.'
                )
              "
            >
              <font-awesome-icon :icon="['fas', 'fire']" class="item-icon" />
              <span class="notification-text">4 Yeni Kızgınlık</span>
              <span class="notification-time">39 dakika önce</span>
            </li>
            <li
              class="notification-item"
              @click="
                showDetail(
                  '2 Kayıtsız Taşma Algılandı.',
                  'Sistem 12 saat önce 2 kayıtsız taşma durumu algıladı.'
                )
              "
            >
              <font-awesome-icon
                :icon="['fas', 'exclamation-triangle']"
                class="item-icon"
              />
              <span class="notification-text">2 Kayıtsız Taşma Algılandı.</span>
              <span class="notification-time">12 saat önce</span>
            </li>
            <li
              class="notification-item"
              @click="
                showDetail(
                  '4 Tohumlama Yapıldı',
                  'Son tohumlama detayları. Detay için tıklayınız...'
                )
              "
            >
              <font-awesome-icon
                :icon="['fas', 'seedling']"
                class="item-icon"
              />
              <span class="notification-text">4 Tohumlama Yapıldı</span>
              <span class="notification-time">10 saat önce</span>
            </li>
          </ul>
        </div>

        <div class="sidebar-section recent-actions-section">
          <h3 class="section-title">
            <font-awesome-icon
              :icon="['fas', 'history']"
              class="section-icon"
            />
            Son İşlemler
          </h3>
          <ul class="action-list">
            <li
              class="action-item"
              @click="
                showDetail(
                  'Gebelik Teşhisi : 24 Numara',
                  '24 numaralı hayvana gebelik teşhisi konuldu.'
                )
              "
            >
              <font-awesome-icon
                :icon="['fas', 'stethoscope']"
                class="item-icon"
              />
              <span class="action-text">Gebelik Teşhisi : 24 Numara</span>
              <span class="action-time">3 saat önce</span>
            </li>
            <li
              class="action-item"
              @click="
                showDetail(
                  'Kuruya ayrılış : 242 Numara',
                  '242 numaralı hayvan kuruya ayrıldı.'
                )
              "
            >
              <font-awesome-icon :icon="['fas', 'bed']" class="item-icon" />
              <span class="action-text">Kuruya ayrılış : 242 Numara</span>
              <span class="action-time">3 saat önce</span>
            </li>
            <li
              class="action-item"
              @click="
                showDetail(
                  'Düşük bildirimi : 2402',
                  '2402 numaralı düşük bildirimi.'
                )
              "
            >
              <font-awesome-icon
                :icon="['fas', 'times-circle']"
                class="item-icon"
              />
              <span class="action-text">Düşük bildirimi : 2402</span>
              <span class="action-time">12 saat önce</span>
            </li>
            <li
              class="action-item"
              @click="
                showDetail(
                  '1 Yeni Hayvan Eklendi : 2991',
                  '2991 numaralı yeni hayvan ekleme işlemi.'
                )
              "
            >
              <font-awesome-icon
                :icon="['fas', 'plus-circle']"
                class="item-icon"
              />
              <span class="action-text">1 Yeni Hayvan Eklendi : 2991</span>
              <span class="action-time">Dün</span>
            </li>
            <li
              class="action-item"
              @click="
                showDetail(
                  'Sürüden Çıkarıldı : 203',
                  '203 numaralı hayvan sürüden çıkarıldı.'
                )
              "
            >
              <font-awesome-icon
                :icon="['fas', 'minus-circle']"
                class="item-icon"
              />
              <span class="action-text">Sürüden Çıkarıldı : 203</span>
              <span class="action-time">4 gün önce</span>
            </li>
          </ul>
        </div>

        <div class="sidebar-section doctors-section">
          <h3 class="section-title">
            <font-awesome-icon
              :icon="['fas', 'user-md']"
              class="section-icon"
            />
            Hekimler
          </h3>
          <ul class="doctor-list">
            <li v-for="(doctor, idx) in doctors" :key="idx" class="doctor-item">
              <div class="doctor-header" @click="toggleDoctorDetail(idx)">
                <img
                  :src="doctor.avatar"
                  :alt="doctor.name"
                  class="doctor-avatar"
                />
                <span class="doctor-name">{{ doctor.name }}</span>
                <font-awesome-icon
                  :icon="['fas', doctor.isOpen ? 'chevron-up' : 'chevron-down']"
                  class="toggle-icon"
                />
              </div>
              <transition name="fade">
                <div v-if="doctor.isOpen" class="doctor-detail">
                  <p><strong>Telefon:</strong> {{ doctor.phone }}</p>
                  <p><strong>E-posta:</strong> {{ doctor.email }}</p>
                  <p><strong>Uzmanlık:</strong> {{ doctor.specialty }}</p>
                </div>
              </transition>
            </li>
          </ul>
        </div>
      </div>

      <div
        v-if="isModalOpen"
        class="detail-modal-overlay"
        @click.self="closeModal"
      >
        <div class="detail-modal-content">
          <button class="close-modal-button" @click="closeModal">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
          <h4>{{ modalTitle }}</h4>
          <p>{{ modalDetail }}</p>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faTimes,
  faExclamationCircle,
  faFire,
  faExclamationTriangle,
  faSeedling,
  faStethoscope,
  faBed,
  faTimesCircle,
  faPlusCircle,
  faMinusCircle,
  faHistory,
  faUserMd,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBell,
  faTimes,
  faExclamationCircle,
  faFire,
  faExclamationTriangle,
  faSeedling,
  faStethoscope,
  faBed,
  faTimesCircle,
  faPlusCircle,
  faMinusCircle,
  faHistory,
  faUserMd,
  faChevronUp,
  faChevronDown
);

export default {
  name: "RightSidebar",
  components: { FontAwesomeIcon },
  data() {
    return {
      isOpen: false,
      isModalOpen: false,
      modalTitle: "",
      modalDetail: "",
      doctors: [
        {
          name: "Enes",
          avatar: require("@/assets/avatar-placeholder.jpg"),
          phone: "555-123-4567",
          email: "enes@example.com",
          specialty: "Büyükbaş Veteriner Hekimi",
          isOpen: false,
        },
        {
          name: "Furkan",
          avatar: require("@/assets/avatar-placeholder.jpg"),
          phone: "555-234-5678",
          email: "furkan@example.com",
          specialty: "Küçükbaş Veteriner Hekimi",
          isOpen: false,
        },
        {
          name: "Furkan",
          avatar: require("@/assets/avatar-placeholder.jpg"),
          phone: "555-345-6789",
          email: "furkan2@example.com",
          specialty: "Kanatlı Veteriner Hekimi",
          isOpen: false,
        },
        {
          name: "Murat",
          avatar: require("@/assets/avatar-placeholder.jpg"),
          phone: "555-456-7890",
          email: "murat@example.com",
          specialty: "Genel Veteriner Hekimi",
          isOpen: false,
        },
        {
          name: "Rıdvan",
          avatar: require("@/assets/avatar-placeholder.jpg"),
          phone: "555-567-8901",
          email: "ridvan@example.com",
          specialty: "Sürü Yönetimi Uzmanı",
          isOpen: false,
        },
        {
          name: "Emrah",
          avatar: require("@/assets/avatar-placeholder.jpg"),
          phone: "555-678-9012",
          email: "emrah@example.com",
          specialty: "Çiftlik Hayvanları Hekimi",
          isOpen: false,
        },
      ],
      isMobile: window.innerWidth <= 1200,
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;

      if (this.isMobile) {
        document.body.style.overflow = this.isOpen ? "hidden" : "";
      }
    },
    closeSidebar() {
      this.isOpen = false;

      if (!this.isModalOpen && this.isMobile) {
        document.body.style.overflow = "";
      }
    },
    showDetail(title, detail) {
      this.modalTitle = title;
      this.modalDetail = detail;
      this.isModalOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.isModalOpen = false;

      if (!this.isOpen) {
        document.body.style.overflow = "";
      }
    },
    toggleDoctorDetail(index) {
      this.doctors[index].isOpen = !this.doctors[index].isOpen;
    },
    handleResize() {
      const prevIsMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 1200;

      if (!this.isMobile && prevIsMobile && this.isOpen) {
        this.isOpen = false;
        document.body.style.overflow = "";
      }

      if (this.isMobile && this.isOpen) {
        document.body.style.overflow = "hidden";
      } else if (!this.isModalOpen) {
        document.body.style.overflow = "";
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);

    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.right-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: #f4f7fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 900;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1200px) {
  .right-sidebar {
    width: 280px;
    transform: translateX(100%);
    z-index: 1150;
  }
  .right-sidebar.is-open {
    transform: translateX(0);
  }
}

@media (min-width: 1201px) {
  .right-sidebar {
    transform: translateX(0);
  }
}

.mobile-notification-toggle {
  position: fixed;
  top: 15px;
  right: 15px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1060;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease;
}
.mobile-notification-toggle:hover {
  background-color: #0056b3;
}

@media (min-width: 1201px) {
  .mobile-notification-toggle {
    display: none !important;
  }
}
@media (max-width: 1200px) {
  .mobile-notification-toggle {
    display: flex;
  }
}

.mobile-sidebar-close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 28px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  z-index: 1;
  transition: color 0.2s ease;
}
.mobile-sidebar-close:hover {
  color: #333;
}

@media (min-width: 1201px) {
  .mobile-sidebar-close {
    display: none !important;
  }
}
@media (max-width: 1200px) {
  .mobile-sidebar-close {
    display: block;
  }
}

.sidebar-content {
  padding: 20px;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
}
@media (min-width: 1201px) {
  .sidebar-content {
    padding-top: 20px;
  }
}

.sidebar-section {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}
.section-icon {
  margin-right: 10px;
  color: #007bff;
}

.notification-list,
.action-list,
.doctor-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notification-item,
.action-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
}
.notification-item:hover,
.action-item:hover {
  background-color: #f9f9f9;
}
.notification-item:last-child,
.action-item:last-child {
  border-bottom: none;
}
.item-icon {
  margin-right: 8px;
  color: #007bff;
}
.notification-text,
.action-text {
  flex-grow: 1;
  color: #555;
}
.notification-time,
.action-time {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  white-space: nowrap;
}
.notification-detail {
  color: #007bff;
  font-size: 13px;
  cursor: pointer;
}

.doctor-item {
  border-bottom: 1px solid #f0f0f0;
}
.doctor-item:last-child {
  border-bottom: none;
}
.doctor-header {
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.doctor-header:hover {
  background-color: #f9f9f9;
}
.doctor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  background-color: #eee;
}
.doctor-name {
  color: #333;
  font-weight: bold;
  flex-grow: 1;
}
.toggle-icon {
  margin-left: 10px;
  color: #666;
  transition: transform 0.2s ease;
}
.doctor-header .toggle-icon {
  transform: rotate(0deg);
}
.doctor-header[aria-expanded="true"] .toggle-icon {
  transform: rotate(180deg);
}

.doctor-detail {
  padding: 5px 0 10px 50px;
  font-size: 13px;
  color: #777;
  line-height: 1.5;
  overflow: hidden;
}
.doctor-detail p {
  margin-bottom: 5px;
}
.doctor-detail p:last-child {
  margin-bottom: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
  max-height: 200px;
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.detail-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(2px);
  overflow: auto;
}

.detail-modal-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  animation: fadeInScale 0.3s ease-out;
}

.close-modal-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
}
.close-modal-button:hover {
  color: #333;
}

.detail-modal-content h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 20px;
}
.detail-modal-content p {
  color: #666;
  line-height: 1.6;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
