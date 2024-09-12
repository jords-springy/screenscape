import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/style.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const app = createApp(App);

app.config.globalProperties.$toast = toast;

app.use(store);
app.use(router);
app.mount('#app');

AOS.init();
