<template>
  <div id="container"></div>
</template>
  <script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  name: "MapContainer",
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initAMap();
  },
  unmounted() {
    this.map?.destroy();
  },
  methods: {
    initAMap() {
      AMapLoader.load({
        key: "27d1f9bfdbc9e967c22a25d14729991a", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          "AMap.ToolBar",
          "AMap.Scale",
          () => {
            this.map.addControl(newAMap.ToolBar());
            this.map.addControl(newAMap.Scale());
          },
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            // layers: [new AMap.TileLayer.Satellite()],
            // center: [116.397428, 39.90923], // 初始化地图中心点位置
          });
          // this.map.plugins([], function () {
          //   var tool = new AMap.ToolBar();
          //   this.addControl(tool);
          // });
        })
        .catch((e) => {
          console.log(e);
        });
      // const marker = new AMap.Marker({
      //   position: [116.39, 39.9], //位置
      // });
      // this.map.add(marker); //添加到地图

      // this.setPolygon(this.map);
    },
    // setPolygon(AMap){
    //   const path = [
    //     [110.271147, 36.690903],
    //     [110.292571, 36.692125],
    //     [110.292611, 36.690585],
    //     [110.271407, 36.690153]
    //   ]
    //   const polygon = new AMap.Polygon({
    //     path, // 设置多边形边界路径
    //     strokeColor: '#FF33FF', // 线颜色
    //     strokeOpacity: 0.2, // 线透明度
    //     strokeWeight: 3, // 线宽
    //     fillColor: '#1791fc', // 填充色
    //     fillOpacity: 0.35 // 填充透明度
    //   })
    //   // 画出围栏
    //   this.map.add(polygon)
    //   // 自动缩放并聚焦合适中心点
    //   this.map.setFitView([polygon])
    // }
  },
};
</script>
  
  <style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>