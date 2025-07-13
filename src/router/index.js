import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Reports from '../views/Reports.vue';
import Protocols from '../views/Protocols.vue';
import DefinedEvents from '../views/DefinedEvents.vue';
import EventLog from '../views/EventLog.vue';
import Settings from '../views/Settings.vue';
import Treatments from '../views/Treatments.vue';
import Agenda from '../views/Agenda.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  },
  {
    path: '/protocols',
    name: 'Protocols',
    component: Protocols,
  },
  {
    path: '/defined-events',
    name: 'DefinedEvents',
    component: DefinedEvents,
  },
  {
    path: '/event-log',
    name: 'EventLog',
    component: EventLog,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/treatments',
    name: 'Treatments',
    component: Treatments,
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
