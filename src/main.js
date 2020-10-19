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

// TODO PD1-4593 Implement storage of configuration in environment variables
Vue.use(GoogleAuth, {client_id: '239259465909-dbffdi86j3oo5gra41cis2l2f9ghbmrn.apps.googleusercontent.com'});
Vue.googleAuth().load();

new Vue({
  render: h => h(App),
}).$mount('#app');
