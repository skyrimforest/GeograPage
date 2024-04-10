import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

// 引入pinia
import { createPinia } from "pinia";

//引入elementplus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/dark/css-vars.css";


//引入router
import router from "./router";

// import BaiduMap from 'vue-baidu-map-3x'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: '7grWESH2pHiM5OimlyUaVFqAzO9pPQNn',
//   // v:'2.0',  // 默认使用3.0
//   // type: 'WebGL' // ||API 默认API  (使用此模式 BMap=BMapGL)
// });
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");
