import './plugins/axios'
import { createApp } from "vue";
import router from "./router/index";
import store from "./store/index"
import App from "./App";
import './plugins/element.js'
import installElementPlus from './plugins/element'


const app = createApp(App);

app.use(router).use(store)
installElementPlus(app)

app.mount("#app");