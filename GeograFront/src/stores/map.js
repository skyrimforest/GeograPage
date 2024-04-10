import {defineStore} from "pinia";
import mapboxgl from "mapbox-gl";

export const useMapStore = defineStore("map", {
    // 存数据的地方
    state(){
        return {
            map:null,
            node_meta_data:null,
            selected_node:null,
            loading: false
        }
    },

    actions:{
        // 初始化地图
        initMap(container){
            mapboxgl.accessToken = 'pk.eyJ1IjoieXlpc21lIiwiYSI6ImNsbnpxNjBkdzA5Y3kya3Mza3hzM2RteHAifQ.JrgnwqQVFyF1IHPZmXeTIQ';
            this.map = new mapboxgl.Map({
                container: container,
                style: 'mapbox://styles/mapbox/dark-v11',
                center: [116.39082, 39.91589],
                zoom: 2,
                attributionControl:false,
                style:"mapbox://styles/mapbox/satellite-v9"
            });
            this.map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }));
        },

        // 清除图层和数据源
        clearMapLayersAndSources() {
            const style = this.map.getStyle();

            // 遍历所有图层查找并移除相关图层及数据源
            for (const layer of style.layers) {
                if (layer.source === 'nodes-source') {
                    this.map.removeLayer(layer.id);
                    this.map.removeSource('nodes-source');
                } else if (layer.source === 'links-nodes-source') {
                    this.map.removeLayer(layer.id);
                    this.map.removeSource('links-nodes-source');
                } else if (layer.id === 'outgoing-lines-layer' || layer.id === 'incoming-lines-layer') {
                    this.map.removeLayer(layer.id);
                    this.map.removeSource('links-lines-source');
                }
            }
        },

        // 添加点
        addNodesToMap(data) {
            console.log('节点总数:', data.total)
            let geojson = JSON.parse(data.geojson);
            const firstFeature = geojson.features[0];

            this.clearMapLayersAndSources() //先清掉所有图层和数据


            this.map.addSource('nodes-source', {
                type: 'geojson',
                data: geojson
            })

            this.map.addLayer({
                id: 'nodes-layer',
                type: 'circle',
                source: 'nodes-source',
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            })

            // 添加点击事件处理程序
            this.map.on('click', 'nodes-layer', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const properties = e.features[0].properties;

                this.selected_node = properties['node_id']
                console.log('点击的节点:', this.selected_node)

                // Create a description from the properties
                let description = '<h3>Properties</h3>';
                for (let key in properties) {
                    description += '<b>' + key + ':</b> ' + properties[key] + '<br>';
                }

                // 创建弹窗并设置其内容
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(this.map);
            });

            // 改变鼠标样式
            this.map.on('mouseenter', 'nodes-layer', () => {
                this.map.getCanvas().style.cursor = 'pointer';
            });

            // 恢复鼠标样式
            this.map.on('mouseleave', 'nodes-layer', () => {
                this.map.getCanvas().style.cursor = '';
            });

            // 获取第一个feature的中心坐标
            if (firstFeature) {
                const coordinates = firstFeature.geometry.coordinates;

                console.log('坐标',coordinates)

                // 设置地图视图中心为第一个feature的位置，并设定合适的缩放级别
                this.map.flyTo({
                    center: coordinates,
                    zoom: 3, // 根据实际情况调整缩放级别
                    essential: true // 在某些情况下（例如地图未加载完成时）确保飞行变换仍然执行
                });
            }
        },

        // 画边
        drawLineToMap(data){
            this.clearMapLayersAndSources()

            const links_nodes_data = data.nodes
            const links_lines_data = data.links
            const node_id = data.node_id

            // 添加边的数据源
            this.map.addSource('links-lines-source', {
                type: 'geojson',
                data: links_lines_data
            })

            // 添加点的数据源
            this.map.addSource('links-nodes-source',{
                type: 'geojson',
                data: links_nodes_data
            })


            // 添加基础点图层（所有点为蓝色）
            this.map.addLayer({
                id: 'links-nodes-base-layer',
                type: 'circle',
                source: 'links-nodes-source',
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });

            // 添加特定节点（node_id）的高优先级图层（紫色）
            const selectedNodeId = data.node_id;
            this.map.addLayer({
                id: 'links-nodes-highlighted-layer',
                type: 'circle',
                source: 'links-nodes-source',
                paint: {
                    'circle-color': ['case', ['==', ['get', 'node_id'], node_id], '#FFA500', 'rgba(0, 0, 0, 0)'], // 如果不是指定节点，则设为透明
                    'circle-radius': 6, // 可以设置稍大的半径以便突出显示
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                },
                filter: ['==', ['get', 'node_id'], node_id] // 过滤器确保只显示具有匹配node_id的点
            });


            // 添加出边的图层
            this.map.addLayer({
                "id": "outgoing-lines-layer",
                "type": "line",
                "source": "links-lines-source",
                "layout": {},
                "paint": {
                    "line-color": ["case", ["==", ["get", "connectionType"], "outgoing"], "#ff0000", "#ffffff"],  // 红色和默认透明色
                    "line-width": 2,
                    "line-opacity": 1  // 可根据需要调整线条不透明度
                },
                "filter": ["==", ["get", "connectionType"], "outgoing"]
            });

            // 添加入边图层
            this.map.addLayer({
                "id": "incoming-lines-layer",
                "type": "line",
                "source": "links-lines-source",
                "layout": {},
                "paint": {
                    "line-color": ["case", ["==", ["get", "connectionType"], "incoming"], "#39FF14", "#ffffff"],
                    "line-width": 2,
                    "line-opacity": 1
                },
                "filter": ["==", ["get", "connectionType"], "incoming"]
            });

            // 添加点击事件处理程序
            this.map.on('click', 'links-nodes-base-layer', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const properties = e.features[0].properties;

                // Create a description from the properties
                let description = '<h3>Properties</h3>';
                for (let key in properties) {
                    description += '<b>' + key + ':</b> ' + properties[key] + '<br>';
                }

                // 创建弹窗并设置其内容
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(this.map);
            });

            // 在所有图层添加完成后，查找并飞移到选中节点的位置
            let selectedNodePosition;
            this.map.on('load', () => {
                const features = this.map.querySourceFeatures('links-nodes-source');
                for (const feature of features) {
                    if (feature.properties.node_id === selectedNodeId) {
                        selectedNodePosition = feature.geometry.coordinates;
                        break;
                    }
                }

                // 找到选中节点后执行 flyTo 动画
                if (selectedNodePosition) {
                    this.map.flyTo({
                        center: selectedNodePosition,
                        zoom: 3, // 根据需要设置合适的缩放级别
                        essential: true
                    });
                }
            });


            // 改变鼠标样式
            this.map.on('mouseenter', 'links-nodes-base-layer', () => {
                this.map.getCanvas().style.cursor = 'pointer';
            });

            // 恢复鼠标样式
            this.map.on('mouseleave', 'links-nodes-base-layer', () => {
                this.map.getCanvas().style.cursor = '';
            });

        }
    }
})
