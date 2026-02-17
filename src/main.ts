import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import { mergeDirective } from "./tailwind";
import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(mergeDirective);

app.mount("#app");
