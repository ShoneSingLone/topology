// main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Rack from "./Rack.vue";
import "./style.scss";

const app = createApp(Rack);

app.use(ElementPlus);
app.mount("#app");
