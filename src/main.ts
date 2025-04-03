import './assets/main.css';

import twMergeDirective from 'tailwind-merge-vue-directive';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(twMergeDirective);

app.mount('#app');
