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
import i18n from './i18n';

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
console.log(i18n);
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
