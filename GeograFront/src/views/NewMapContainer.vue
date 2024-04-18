<template>
    <div>
        <div class="menu-box">
            <div class="button-container">
                <ElRow>
                    <ElButton class="custom-button" color="rgba(20,20,20,0.8)" @click="testClick">
                        地图模式切换
                    </ElButton>
                </ElRow>
                <!-- <ElRow>
                    <ElButton class="custom-button" color="rgba(20,20,20,0.8)" @click="onZoomInClick">
                        地图界面放大
                    </ElButton>
                </ElRow>
                <ElRow>
                    <ElButton class="custom-button" color="rgba(20,20,20,0.8)" @click="onZoomOutClick">
                        地图界面缩小
                    </ElButton>
                </ElRow> -->
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
                    <ElButton class="custom-button" color="rgba(20,20,20,0.8)" @click="onNewCircleClick">
                        圆形预警圈
                    </ElButton>
                </ElRow>
                <ElRow>
                    <ElButton class="custom-button" color="rgba(20,20,20,0.8)" @click="onRmAllZoneClick">
                        擦除预警圈</ElButton>
                </ElRow>
                <ElRow>
                    <ElButton class="custom-button" color="rgba(20,20,20,0.8)">
                        设置控制器坐标
                    </ElButton>
                </ElRow>
                <ElRow>
                    <ElButton class="custom-button" color="rgba(20,20,20,0.8)" @click="onShowCenterClick">
                        返回中心点
                    </ElButton>
                </ElRow>
            </div>
        </div>

        <div id="map"></div>

    </div>
</template>

<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, ref } from "vue"
const initMap = async () => {
    const map = L.map('map').setView([51.505, -0.09], 13)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    // }).addTo(map)
    const mapLayers = {
        '谷歌高德杂交/卫星': L.layerGroup([
            L.tileLayer('//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                minZoom: 3,
                attribution: "谷歌提供卫星图，高德提供街道图"
            }),
            L.tileLayer('//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                maxNativeZoom: 18,
                minZoom: 3,
                attribution: "谷歌提供卫星图，高德提供街道图",
                subdomains: "1234",
                opacity: 0.5
            })
        ]).addTo(map),
        '谷歌/卫星': L.tileLayer('//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            minZoom: 3,
            attribution: "谷歌 Google.cn"
        }),
        '谷歌/街道': L.tileLayer('//www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            minZoom: 3,
            attribution: "谷歌 Google.cn"
        }),
    }
    const layerControl = L.control.layers(mapLayers, {}, {
        position: 'bottomright',
        collapsed: true
    }).addTo(map);
}
onMounted(() => {
    initMap()
})
const circleList = []
function onNewCircleClick() {
    const circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500000
    }).addTo(map)
}
const polyList = []

</script>

<style scoped>
#map {
    height: 100vh;
    width: 100vw;
    z-index: 1;

}

.map-box {
    z-index: 5;
}

#map-container {
    height: 100vh;
    width: 100vw;
    /* margin-right: 5px; */
    /*box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2); !* 在底部添加阴影 *!*/
}

.menu-box {
    position: absolute;
    top: 90px;
    left: 20px;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    z-index: 2;
}

.custom-button {
    width: 120px;
}
</style>