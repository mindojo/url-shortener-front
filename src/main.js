import Vue from 'vue';
import App from './App.vue';
import Axios from 'axios';
import GoogleAuth from 'vue-google-auth';

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

Vue.config.productionTip = false;

const googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID;
Vue.use(GoogleAuth, {client_id: `${googleClientId}`});
Vue.googleAuth().load();

new Vue({
  render: h => h(App),
}).$mount('#app');
