import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { i18n } from './i18n';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

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

const app = createApp(App);

app.use(router);
app.use(i18n);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
