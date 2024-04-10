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
            <l-map :zoom.sync="zoom_real" :center.sync="center_real" :maxZoom="16" :minZoom="5"
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

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LCircle, LRectangle, LMarker, LControlLayers, LWmsTileLayer } from "@vue-leaflet/vue-leaflet"
// import { onMounted, ref } from "vue"
import { ElNotification } from 'element-plus';
// import { getCurrentInstance } from 'vue'

export default {
    name: "NewMapContainer",
    components: {
        LMap, LTileLayer, LCircle, LRectangle, LMarker, LControlLayers, LWmsTileLayer,
        ElNotification,
        L
    },

    data() {
        return {
            icon: null,
            circleList: [],
            rectangleList: [],
            markerList: [],
            layerList: [
                {
                    name: "经典款地图",
                    layer_url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                },
                {
                    name: "谷歌款卫星地图",
                    layer_url: '//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
                },
                // 缩放只到12,空间需要太多了
                {
                    name: "高德离线中国卫星图",
                    layer_url: 'http://localhost:9999/user/images/whole/{z}/{x}/{y}.jpg',
                },
                {
                    name: "高德离线上海卫星图",
                    layer_url: 'http://localhost:9999/user/images/shanghai/{z}/{x}/{y}.jpg',
                },
                {
                    name: "高德离线北京卫星图",
                    layer_url: 'http://localhost:9999/user/images/beijing/{z}/{x}/{y}.jpg',
                },
            ],
            State: {
                // 状态:没在画
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
            },
            // 全局绘图状态
            drawState: null,
            // 画圆用变量
            circle_center: null,
            circle_edge: null,
            // 画矩形用变量
            rectangle_leftup: null,
            rectangle_rightdown: null,
            // 做标记用变量
            marker_point: null,
            center_real: [44.58416560452682, 126.55151367187501],
            zoom_real: 5,
            bounds_real: null,
            origin_center: [44.58416560452682, 126.55151367187501],
            origin_zoom: 5,
        }
    },
    mounted() {
        this.drawState = this.State.not_drawing;
        this.icon = L.icon({
            iconUrl: this.getAssets('../assets/droneRed.png'),
            iconSize: [40, 30],
            iconAnchor: [16, 37]
        });
        console.log(this.icon)
    },
    methods: {
        getAssets(url) {
            return new URL(url, import.meta.url).href;
        },
        hello(event) {
            console.log("2333")
        },
        // ----------这部分为画图的逻辑----------
        // 绘图逻辑,多个状态转换
        getinfo(event) {
            // console.log(event)
            switch (this.drawState) {
                case this.State.circle_point_state1:
                    this.circle_center = event.latlng;
                    console.log(this.circle_center)
                    ElNotification({
                        title: '已确定圆心，下面请点击地图确定半径长度！',
                        message: '点击取消按钮以放弃本次绘制',
                        duration: 5000,
                    })
                    this.drawState = this.State.circle_point_state2;
                    break;

                case this.State.circle_point_state2:
                    this.circle_edge = event.latlng;
                    const distance = this.circle_edge.distanceTo(this.circle_center)
                    const newCircle = {
                        center: this.circle_center,
                        radius: distance,
                        color: 'green'
                    }
                    this.circleList.push(newCircle)
                    ElNotification({
                        title: '已确定圆形！',
                        message: '中心:' + newCircle.center + '; 半径:' + newCircle.distance,
                        duration: 5000,
                    })
                    this.drawState = this.State.not_drawing;
                    break;

                case this.State.rectangle_point_state1:
                    this.rectangle_leftup = event.latlng;
                    ElNotification({
                        title: '已确定左上角，下面请点击地图确定右下角！',
                        message: '点击取消按钮以放弃本次绘制',
                        duration: 5000,
                    })
                    this.drawState = this.State.rectangle_point_state2;
                    break;

                case this.State.rectangle_point_state2:
                    this.rectangle_rightdown = event.latlng;
                    const newRectangle = {
                        bounds: [this.rectangle_leftup, this.rectangle_rightdown],
                        style: {
                            color: 'green',
                            weight: 3
                        }
                    }
                    this.rectangleList.push(newRectangle)
                    ElNotification({
                        title: '已确定矩形！',
                        message: '左上角:' + newRectangle.bounds[0] + '; 右下角:' + newRectangle.bounds[1],
                        duration: 5000,
                    })
                    this.drawState = this.State.not_drawing;
                    break;

                case this.State.marker_point_state:
                    this.marker_point = event.latlng;
                    const newMarker = this.marker_point
                    this.markerList.push(newMarker)
                    ElNotification({
                        title: '已确定标记！',
                        message: '标记坐标:' + newMarker,
                        duration: 5000,
                    })
                    this.drawState = this.State.not_drawing;
                    break;
            }
        },
        cancelClick() {
            if (this.drawState != this.State.not_drawing) {
                ElNotification({
                    title: '绘图已取消！',
                    message: '状态缓存已清空',
                    duration: 5000,
                })
                this.drawState = this.State.not_drawing;
            } else {
                //do nothing
            }
        },
        onNewCircleClick() {
            ElNotification({
                title: '开始绘图，请点击地图确定圆心！',
                message: '点击取消按钮以放弃本次绘制',
                duration: 5000,
            })
            this.drawState = this.State.circle_point_state1;
        },
        onNewRectangleClick() {
            ElNotification({
                title: '开始绘图，请点击地图确定矩形左上角！',
                message: '点击取消按钮以放弃本次绘制',
                duration: 5000,
            })
            this.drawState = this.State.rectangle_point_state1;
        },
        setControllerClick() {
            ElNotification({
                title: '开始绘图，请点击地图确定控制器位置！',
                message: '点击取消按钮以放弃本次绘制',
                duration: 5000,
            })
            this.drawState = this.State.marker_point_state;
        },
        onRmAllZoneClick() {
            this.circleList.length = 0;
            this.rectangleList.length = 0;
        },
        // ----------以上为画图的逻辑----------

        // 以下为中心点、边界与缩放的相关内容
        // 返回原点
        onShowCenterClick() {
            console.log("return to center now")
            this.center_real = this.origin_center
            this.zoom_real = this.origin_zoom
        },
        // 更新缩放时触发
        zoomUpdated(zoom) {
            // console.log("zoom updated!")
            this.zoom_real = zoom;
            // console.log(this.zoom_real);
        },
        // 更新中心点时触发
        centerUpdated(center) {
            // console.log("center updated!")
            this.center_real = center;
            // console.log(this.center_real)
        },
        // 更新边界时触发
        boundsUpdated(bounds) {
            this.bounds_real = bounds;
        }
    }
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