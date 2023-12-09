<template>
  <div id="container">
    <div class="menu-box">
      <div class="button-container">
        <ElRow>
          <ElButton
            class="custom-button"
            color="rgba(20,20,20,0.8)"
            @click="testClick"
          >
            地图模式切换
          </ElButton>
        </ElRow>
        <ElRow>
          <ElButton
            class="custom-button"
            color="rgba(20,20,20,0.8)"
            @click="onZoomInClick"
          >
            地图界面放大
          </ElButton>
        </ElRow>
        <ElRow>
          <ElButton
            class="custom-button"
            color="rgba(20,20,20,0.8)"
            @click="onZoomOutClick"
          >
            地图界面缩小
          </ElButton>
        </ElRow>
        <ElRow>
          <ElButton class="custom-button" color="rgba(20,20,20,0.8)">
            返回防控区
          </ElButton>
        </ElRow>
        <ElRow>
          <ElButton class="custom-button" color="rgba(20,20,20,0.8)">
            矩形预警圈
          </ElButton>
        </ElRow>
        <ElRow>
          <ElButton class="custom-button" color="rgba(20,20,20,0.8)">
            六边形预警圈
          </ElButton>
        </ElRow>
        <ElRow>
          <ElButton
            class="custom-button"
            color="rgba(20,20,20,0.8)"
            @click="onNewCircleClick"
          >
            圆形预警圈
          </ElButton>
        </ElRow>
        <ElRow>
          <ElButton
            class="custom-button"
            color="rgba(20,20,20,0.8)"
            @click="onRmAllZoneClick"
          >
            擦除预警圈</ElButton
          >
        </ElRow>
        <ElRow>
          <ElButton class="custom-button" color="rgba(20,20,20,0.8)">
            设置控制器坐标
          </ElButton>
        </ElRow>
        <ElRow>
          <ElButton
            class="custom-button"
            color="rgba(20,20,20,0.8)"
            @click="onShowCenterClick"
          >
            返回中心点
          </ElButton>
        </ElRow>
      </div>
    </div>
    <baidu-map
      class="bm-view"
      :zoom="zoom"
      :center="center"
      min-zoom="5"
      max-zoom="20"
      mapType="BMAP_SATELLITE_MAP"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
    >
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <!-- <ElButton
        v-for="(btn, index) in btns"
        :key="btn.id"
        :title="btn.title"
        @remove="todos.splice(index, 1)"
      >
      {{}}
      </ElButton> -->
      <bm-circle
        v-if="cirVisible"
        :center="circlePath.center"
        :radius="circlePath.radius"
        stroke-color="blue"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        @lineupdate="updateCirclePath"
        :editing="true"
      ></bm-circle>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
const center = ref({
  lng: 116.404,
  lat: 39.915,
});

let zoom = ref(15);

const onZoomInClick = () => {
  console.log(zoom.value);
  if (zoom.value >= 20) {
  } else {
    zoom.value++;
  }
};
const onZoomOutClick = () => {
  console.log(zoom.value);
  if (zoom.value <= 5) {
  } else {
    zoom.value--;
  }
};
const onShowCenterClick = () => {
  console.log(center.value);
};
const syncCenterAndZoom = (e) => {
  const { lng, lat } = e.target.getCenter();
  zoom.value = e.target.getZoom();
  nextTick(() => {
    center.value.lng = lng;
    center.value.lat = lat;
  });
};

const cirVisible = ref(false);
const onNewCircleClick = () => {
  cirVisible.value = true;
};
const circlePath = ref({
  center: center.value,
  radius: 500,
});
const updateCirclePath = (e) => {
  circlePath.value.center = e.target.getCenter();
  circlePath.value.radius = e.target.getRadius();
};
const onRmAllZoneClick = () => {
  cirVisible.value = false;
};
</script>
  
  <style scoped>
.bm-view {
  width: 100%;
  height: 800px;
}
.menu-box {
  position: absolute;
  top: 50px;
  left: 20px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  z-index: 2;
}
.custom-button {
  width: 120px;
}
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>