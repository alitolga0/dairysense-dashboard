<template>
  <nav class="navbar-wrapper">
    <!-- Masaüstü Menü -->
    <div class="navbar-desktop">
      <div class="navbar__header">
        <img src="@/assets/logo.jpg" alt="Logo" class="navbar__logo" />
      </div>

      <ul class="navbar__links-desktop">
        <li v-for="(link, idx) in localizedLinks" :key="idx">
          <router-link :to="link.path" class="navbar__link">
            <font-awesome-icon :icon="['fas', link.icon]" class="navbar__icon" />
            {{ link.key }}
          </router-link>
        </li>
      </ul>

      <!-- Dil butonları -->
      <div class="language-switcher" style="padding: 0 20px 10px; text-align: center">
        <button
          @click="changeLanguage('tr')"
          :disabled="$i18n.locale === 'tr'"
          class="lang-btn"
        >
          Türkçe
        </button>
        <button
          @click="changeLanguage('en')"
          :disabled="$i18n.locale === 'en'"
          class="lang-btn"
        >
          English
        </button>
      </div>

      <!-- Footer -->
      <div class="navbar__footer-desktop">
        <span class="navbar__footer-text">Vet. Ali Tolga Çakir</span>
      </div>
    </div>

    <!-- Mobil Menü Toggle -->
    <div class="navbar-mobile-header">
      <button
        class="navbar__toggle"
        :class="{ 'is-active': isMenuOpen }"
        :aria-label="isMenuOpen ? ariaLabelClose : ariaLabelToggle"
        :title="isMenuOpen ? ariaLabelClose : ariaLabelToggle"
        @click="toggleMenu"
      >
        <font-awesome-icon
          :icon="isMenuOpen ? ['fas', 'times'] : ['fas', 'bars']"
        />
      </button>
      <img src="@/assets/logo.jpg" alt="Logo" class="navbar__logo-mobile" />
    </div>

    <!-- Mobil Menü İçeriği -->
    <transition name="slide-fade">
      <div
        v-if="isMenuOpen"
        class="mobile-menu-overlay"
        @click.self="closeMenu"
      >
        <div class="mobile-menu-content">
          <ul class="navbar__links-mobile">
            <li v-for="(link, idx) in localizedLinks" :key="idx">
              <router-link
                :to="link.path"
                class="navbar__link"
                @click="closeMenu"
              >
                <font-awesome-icon :icon="['fas', link.icon]" class="navbar__icon" />
                {{ link.key }}
              </router-link>
            </li>
          </ul>

          <!-- Mobil Dil butonları -->
          <div class="language-switcher" style="padding: 10px 20px; text-align: center">
            <button
              @click="changeLanguage('tr')"
              :disabled="$i18n.locale === 'tr'"
              class="lang-btn"
            >
              Türkçe
            </button>
            <button
              @click="changeLanguage('en')"
              :disabled="$i18n.locale === 'en'"
              class="lang-btn"
            >
              English
            </button>
          </div>

          <!-- Mobil Footer -->
          <div class="navbar__footer-mobile">
            <span class="navbar__footer-text">Vet. Ali Tolga Çakir</span>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faTimes,
  faChartLine,
  faFileAlt,
  faBook,
  faClipboardList,
  faCog,
  faHistory,
  faHandHoldingMedical,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBars,
  faTimes,
  faChartLine,
  faFileAlt,
  faBook,
  faClipboardList,
  faCog,
  faHistory,
  faHandHoldingMedical,
  faCalendarAlt
);

import { useI18n } from "vue-i18n";

export default {
  name: "AppNavbar",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const { t, locale } = useI18n();

    // Sabit linkler, sadece key ve icon burada tutuluyor,
    // isimler i18n ile sağlanacak.
    const links = [
      { key: "dashboard", path: "/", icon: "chart-line" },
      { key: "reports", path: "/reports", icon: "file-alt" },
      { key: "protocols", path: "/protocols", icon: "book" },
      { key: "definedEvents", path: "/defined-events", icon: "clipboard-list" },
      { key: "settings", path: "/settings", icon: "cog" },
      { key: "eventLog", path: "/event-log", icon: "history" },
      { key: "treatments", path: "/treatments", icon: "hand-holding-medical" },
      { key: "agenda", path: "/agenda", icon: "calendar-alt" },
    ];

    // Dil değişimi metodu
    function changeLanguage(lang) {
      console.log(locale)
      locale.value = lang;
    }

    return {
      t,
      links,
      changeLanguage,
      locale,
    };
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    localizedLinks() {
      // i18n anahtarından link adını al
      return this.links.map((link) => ({
        ...link,
        name: this.t(`navbar.links.${link.key}`),
      }));
    },
    footerText() {
      return this.t("navbar.footer");
    },
    ariaLabelToggle() {
      return this.t("navbar.ariaLabelToggle");
    },
    ariaLabelClose() {
      return this.t("navbar.ariaLabelClose");
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? "hidden" : "";
    },
    closeMenu() {
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
        document.body.style.overflow = "";
      }
    },
    handleResize() {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.isMenuOpen = false;
        document.body.style.overflow = "";
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
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

.lang-btn {
  cursor: pointer;
  background: transparent;
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 5px 12px;
  margin: 0 5px;
  font-weight: 600;
  color: #007bff;
  transition: background-color 0.2s ease;
}
.lang-btn:disabled {
  cursor: default;
  opacity: 0.5;
  border-color: #999;
  color: #999;
  background-color: #f0f0f0;
}
.lang-btn:not(:disabled):hover {
  background-color: #007bff;
  color: white;
}
.navbar-wrapper {
  width: 250px;
  height: 100vh;
  position: relative;
  z-index: 1000;
}

.navbar-desktop {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  z-index: 1000;
}

.navbar__header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px 20px;
}

.navbar__logo {
  max-height: 70px;
  width: auto;
}

.navbar__links-desktop {
  list-style: none;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.navbar__footer-desktop {
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #eee;
  margin-top: auto;
  font-weight: bold;
  color: #555;
}

.navbar__link {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  white-space: nowrap;
  transition: background-color 0.3s;
}

.navbar__link:hover,
.navbar__link.router-link-exact-active {
  background-color: #e0f7fa;
  color: #007bff;
}

.navbar__icon {
  margin-right: 10px;
  font-size: 18px;
}

.navbar-mobile-header {
  display: none;
  width: 100%;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: flex;
  gap: 15px;
}

.navbar__toggle {
  background-color: white;
  border: none;
  font-size: 24px;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  order: 0;
}

.navbar__toggle:hover {
  background-color: #0056b3;
}

.navbar__toggle.is-active {
  background-color: #dc3545;
}

.navbar__logo-mobile {
  max-height: 45px;
  width: auto;
  order: 1;
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.mobile-menu-content {
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding-top: 75px;
  box-sizing: border-box;
}

.navbar__links-mobile {
  list-style: none;
  margin: 0;
  padding: 10px 0;
  flex-grow: 1;
  overflow-y: auto;
}

.navbar__footer-mobile {
  padding: 20px;
  border-top: 1px solid #eee;
  margin-top: auto;
  font-weight: bold;
  color: #555;
  text-align: center;
}

/* Vue Transition Sınıfları */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active .mobile-menu-content,
.slide-fade-leave-active .mobile-menu-content {
  transition: transform 0.3s ease-in-out;
}
.slide-fade-enter-from .mobile-menu-content,
.slide-fade-leave-to .mobile-menu-content {
  transform: translateX(-100%);
}

@media (max-width: 768px) {
  .navbar-desktop {
    display: none;
  }

  .navbar-mobile-header {
    display: flex;
  }

  .navbar__toggle {
    display: flex;
  }
}

@media (min-width: 769px) {
  .navbar-wrapper {
    width: 250px;
    flex-shrink: 0;
  }

  .navbar-desktop {
    display: flex;
  }

  .navbar-mobile-header,
  .navbar__toggle,
  .mobile-menu-overlay {
    display: none !important;
  }
}
</style>
