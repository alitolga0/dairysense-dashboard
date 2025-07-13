import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    navbar: {
      links: {
        dashboard: "Dashboard",
        reports: "Reports",
        protocols: "Protocols",
        definedEvents: "Defined Events",
        settings: "Settings",
        eventLog: "Event Log",
        treatments: "Treatments",
        agenda: "Agenda"
      },
      footer: "Vet. Ali Tolga Çakır",
      ariaLabelToggle: "Toggle Menu",
      ariaLabelClose: "Close Menu"
    },
  },
  tr: {
    navbar: {
      links: {
        dashboard: "Kontrol Paneli",
        reports: "Raporlar",
        protocols: "Protokoller",
        definedEvents: "Tanımlı Olaylar",
        settings: "Ayarlar",
        eventLog: "Tanımlanmamış Olaylar",
        treatments: "Tedaviler",
        agenda: "Ajanda"
      },
      
      ariaLabelToggle: "Menüyü Aç/Kapat",
      ariaLabelClose: "Menüyü Kapat"
    },
  }
};

export const i18n = createI18n({
  locale: 'tr',
  fallbackLocale: 'en',
  legacy: false,
  messages
});
