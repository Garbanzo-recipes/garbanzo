import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faCheck,
  faCheckDouble,
  faPlus,
  faMinus,
  faPen,
  faDownload,
  faUpload,
  faShare,
  faClock,
  faShoppingCart,
  faUserFriends,
  faQrcode,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueQriously from 'vue-qriously';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

[
  faEdit,
  faCheck,
  faCheckDouble,
  faPlus,
  faMinus,
  faPen,
  faDownload,
  faUpload,
  faShare,
  faClock,
  faShoppingCart,
  faUserFriends,
  faQrcode,
  faAngleDown,
].forEach(item => library.add(item));

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueQriously);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
