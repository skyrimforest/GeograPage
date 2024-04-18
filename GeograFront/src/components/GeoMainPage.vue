<template>
  <div class="common-layout">
    <AttrInputBox></AttrInputBox>
    <!-- <div class="menu-box">
      <DispMenuBox></DispMenuBox>
    </div> -->
    <div class="info-box">
      <DispInfoBox></DispInfoBox>
    </div>
    <div class="func-box">
      <DispFuncBox></DispFuncBox>
    </div>
    <!-- <div class="func-show-box">
    <DispFuncShowBox></DispFuncShowBox>
  </div> -->
    <div class="map-box">
      <NewMapContainer></NewMapContainer>
    </div>
  </div>
</template>

<script>
// 地图选型
// import MapContainer from "../views/MapContainer.vue";
// import NewMapContainer from "../views/NewMapContainer.vue";
// import NewMapContainer from "../views/NewMapContainer2.vue";
import NewMapContainer from "../views/NewMapNoSetup2.vue";
// import DispMenuBox from "../views/DispMenuBox.vue";
import DispInfoBox from "../views/DispInfoBox.vue";
import DispFuncBox from "../views/DispFuncBox.vue";
// import DispFuncShowBox from "../views/DispFuncShowBox.vue";
// import AttrInputBox from "../views/AttrInputBox.vue";
export default {
  name: "MainPage",
  components: {
    NewMapContainer,
    // DispMenuBox,
    DispInfoBox,
    DispFuncBox,
    // DispFuncShowBox,
    // AttrInputBox,
  },
  methods: {},
  data: () => ({}),
};
</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100vh;
  position: fixed;
  /*overflow-x: hidden;*/
  /*overflow-y: hidden;*/
  background-size: cover !important;
  background-image: url(../assets/Login.png);
}
.menu-box {
  position: absolute;
  top: 50px;
  left: 20px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  z-index: 2;
}
.info-box {
  position: absolute;
  top: 50px;
  right: 20px;
  /* backdrop-filter: blur(30px);
  border-radius: 10px;  */
  z-index: 3;
}
.func-box {
  position: absolute;
  bottom: 1%;
  left: 1%;
  backdrop-filter: blur(0px);
  border-radius: 10px;
  z-index: 3;
  width:98%;
  height:70%;
}
 
.map-box {
  position: relative;
  z-index: 1;
}
</style>