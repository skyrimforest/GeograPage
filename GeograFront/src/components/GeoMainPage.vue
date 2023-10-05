<template>
 <div class="common-layout">
  <div class="menu-box">
    <DispMenuBox></DispMenuBox>
  </div>
  <div class="info-box">
    <DispInfoBox></DispInfoBox>
  </div>
  <div class="map-box">
    <MapContainer></MapContainer>
  </div>
  </div>
</template>

<script>
import MapContainer from '../views/MapContainer.vue';
import DispMenuBox from '../views/DispMenuBox.vue';
import DispInfoBox from '../views/DispInfoBox.vue';
export default {
  name: "MainPage",
  components: {
    MapContainer,
    DispMenuBox,
    DispInfoBox,
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
.menu-box{
  position: absolute;
  top: 50px;
  backdrop-filter: blur(10px);
  border-radius: 10px; 
  z-index: 2;
}
.info-box{
  position: absolute;
  top: 50px;
  backdrop-filter: blur(30px);
  border-radius: 10px; 
  right: 20px;
  z-index: 3;
}
.map-box{
  position: relative;
  z-index: 1;
}
</style>