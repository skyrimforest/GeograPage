<template>
    <div>
        <div ref="domElement" class="menu-box">
            <div class="button-container">
                <ElRow>
                    <ElButton class="custom-button" color="rgba(160,160,160,0.8)">
                        返回防控区
                    </ElButton>
                </ElRow>
                <ElRow>
                    <br />
                </ElRow>
                <ElRow>
                    <ElButton class="custom-button" color="rgba(100,100,100,0.8)" @click="onNewRectangleClick">
                        矩形预警圈
                    </ElButton>
                </ElRow>
                <ElRow>
                    <ElButton class="custom-button" color="rgba(100,100,100,0.8)" @click="onNewCircleClick">
                        圆形预警圈
                    </ElButton>
                </ElRow>
                <ElRow>
                    <ElButton class="custom-button" color="rgba(100,100,100,0.8)" @click="onRmAllZoneClick">
                        擦除预警圈</ElButton>
                </ElRow>
                <ElRow>
                    <br />
                </ElRow>
                <ElRow>
                    <ElButton class="custom-button" color="rgba(20,20,20,0.8)" @click="setControllerClick">
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
        <div class="map-box">
            <l-map :zoom="zoom" :center="center" :maxZoom="16" :minZoom="5"
                @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated"
                :noBlockingAnimations="true" :useGlobalLeaflet="false" @click="getinfo" @click.right="cancelClick">
                <!-- 多层次地图控制组件 -->
                <l-control-layers position="bottomright" />
                <!-- 多层次地图 -->
                <l-tile-layer v-for="(layer) in layerList" :url=layer.layer_url layer-type="base"
                    :name="layer.name"></l-tile-layer>
                <!-- 矩形区域 -->
                <l-rectangle v-for="(rectangle, index) in rectangleList" :key="index" :bounds="rectangle.bounds"
                    :l-style="rectangle.style"></l-rectangle>
                <!-- 圆形区域 -->
                <l-circle v-for="(circle, index) in circleList" :key="index" :lat-lng="circle.center"
                    :radius="circle.radius" :color="circle.color"></l-circle>
                <!-- 标记区域 -->
                <l-marker v-for="(marker, index) in markerList" :key="index" :lat-lng="marker" :icon="icon"></l-marker>

            </l-map>
        </div>
    </div>
</template>

<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LCircle, LRectangle, LMarker, LControlLayers, LWmsTileLayer } from "@vue-leaflet/vue-leaflet"
import { onMounted, ref } from "vue"
import { ElNotification } from 'element-plus';
import { getCurrentInstance } from 'vue'


function getAssets(url) {
    return new URL(url, import.meta.url).href;
}
const icon = L.icon({
    iconUrl: getAssets('../assets/droneRed.png'),
    iconSize: [40, 30],
    iconAnchor: [16, 37]
})

// 测试函数
function hello(event) {
    console.log("2333")
}

// 预警区集合
const circleList = ref([])
const rectangleList = ref([])
const markerList = ref([])
const layerList = ref([
    {
        name: "在线地图",
        layer_url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    {
        name: "谷歌在线卫星地图",
        layer_url: '//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
    },
    {
        name: "高德离线卫星地图",
        layer_url: 'http://localhost:9999/user/images/{z}/{x}/{y}.jpg',
    }
])

// ----------这部分为画图的逻辑----------
// 状态枚举集合
const State = {
    // 没在画区域
    not_drawing: "not_drawing",
    // 画圆的一号状态:该状态下获取圆心
    circle_point_state1: "circle_point_state1",
    // 画圆的二号状态:该状态下获取半径
    circle_point_state2: "circle_point_state2",
    // 画矩形的一号状态:该状态获取左上角
    rectangle_point_state1: "rectangle_point_state1",
    // 画矩形的二号状态:该状态获取右下角
    rectangle_point_state2: "rectangle_point_state2",
    // 画标记的状态:该状态获取标记坐标
    marker_point_state: "marker_point_state",

}
// 全局绘图状态
const drawState = ref(State.not_drawing)

// 画圆用变量
const circle_center = ref(null)
const circle_edge = ref(null)

// 画矩形用变量
const rectangle_leftup = ref(null)
const rectangle_rightdown = ref(null)

// 做标记用变量
const marker_point = ref(null);

// 绘图逻辑,多个状态转换
function getinfo(event) {
    console.log(event)
    switch (drawState.value) {
        case State.circle_point_state1:
            circle_center.value = event.latlng;
            ElNotification({
                title: '已确定圆心，下面请点击地图确定半径长度！',
                message: '点击取消按钮以放弃本次绘制',
                duration: 5000,
            })
            drawState.value = State.circle_point_state2;
            break;

        case State.circle_point_state2:
            circle_edge.value = event.latlng;
            const distance = circle_edge.value.distanceTo(circle_center.value)
            const newCircle = {
                center: circle_center.value,
                radius: distance,
                color: 'green'
            }
            circleList.value.push(newCircle)
            ElNotification({
                title: '已确定圆形！',
                message: '中心:' + newCircle.center + '; 半径:' + newCircle.distance,
                duration: 5000,
            })
            drawState.value = State.not_drawing;
            break;

        case State.rectangle_point_state1:
            rectangle_leftup.value = event.latlng;
            ElNotification({
                title: '已确定左上角，下面请点击地图确定右下角！',
                message: '点击取消按钮以放弃本次绘制',
                duration: 5000,
            })
            drawState.value = State.rectangle_point_state2;
            break;

        case State.rectangle_point_state2:
            rectangle_rightdown.value = event.latlng;
            const newRectangle = {
                bounds: [rectangle_leftup.value, rectangle_rightdown.value],
                style: {
                    color: 'green',
                    weight: 3
                }
            }
            rectangleList.value.push(newRectangle)
            ElNotification({
                title: '已确定矩形！',
                message: '左上角:' + newRectangle.bounds[0] + '; 右下角:' + newRectangle.bounds[1],
                duration: 5000,
            })
            drawState.value = State.not_drawing;
            break;

        case State.marker_point_state:
            marker_point.value = event.latlng;
            const newMarker = marker_point.value
            markerList.value.push(newMarker)
            ElNotification({
                title: '已确定标记！',
                message: '标记坐标:' + newMarker,
                duration: 5000,
            })
            drawState.value = State.not_drawing;
            break;
    }
}

function cancelClick() {
    ElNotification({
        title: '绘图已取消！',
        message: '状态缓存已清空',
        duration: 5000,
    })
    drawState.value = State.not_drawing;
}

function onNewCircleClick() {
    ElNotification({
        title: '开始绘图，请点击地图确定圆心！',
        message: '点击取消按钮以放弃本次绘制',
        duration: 5000,
    })
    drawState.value = State.circle_point_state1;
}

function onNewRectangleClick() {
    ElNotification({
        title: '开始绘图，请点击地图确定矩形左上角！',
        message: '点击取消按钮以放弃本次绘制',
        duration: 5000,
    })
    drawState.value = State.rectangle_point_state1;
}
function onRmAllZoneClick() {
    circleList.value.length = 0;
    rectangleList.value.length = 0;
}

function setControllerClick() {
    ElNotification({
        title: '开始绘图，请点击地图确定控制器位置！',
        message: '点击取消按钮以放弃本次绘制',
        duration: 5000,
    })
    drawState.value = State.marker_point_state;
}
// ----------以上为画图的逻辑----------


// 以下为中心点、边界与缩放的相关内容
const center = ref([44.58416560452682, 126.55151367187501])
const zoom = ref(5)
const currentCenter=ref([44.58416560452682, 126.55151367187501])
const currentZoom=ref(5)
const bounds=ref(null)

// const bounds_real = ref(null)

// 返回原点不太好使
const onShowCenterClick = () => {
    // console.log("return to center now")
    // center_real.value = origin_center
    // zoom_real.value = origin_zoom
}
// 更新缩放时触发
function zoomUpdated(zoom) {
    console.log("zoom updated!")
    currentZoom.value=zoom.value
    console.log(currentZoom.value)
}
// 更新中心点时触发
function centerUpdated(center) {
    console.log("center updated!")
    currentCenter.value=center.value
    console.log(currentCenter.value)
}
// 更新边界时触发
function boundsUpdated(bounds) {
    // bounds_real.value = bounds.value;
}
</script>

<style scoped>
.map-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100vh;
    width: 100vw
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