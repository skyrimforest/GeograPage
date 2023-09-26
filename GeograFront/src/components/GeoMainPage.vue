<template>
 <div class="common-layout">
    <div id="container" style="height: 50vh; width: 100%"></div>
  </div>
</template>

<script>
window._AMapSecurityConfig = {
  securityJsCode: '1984d81295a26fdd896ec896bd1a72ed', 
}
import AMapLoader from "@amap/amap-jsapi-loader"
import { reactive, ref, toRefs, onMounted, nextTick, defineProps } from 'vue';
import { shallowRef } from '@vue/reactivity'
export default {
  name: "MainPage",
  components: {

  },
  methods: {},
  data: () => ({
  }),
};
</script>

<style>
.common-layout {
  width: 100%;
  height: 100vh;
  position: fixed;
  /*overflow-x: hidden;*/
  /*overflow-y: hidden;*/
  background-size: cover !important;
  background-image: url(../assets/Login.png);
}
</style>