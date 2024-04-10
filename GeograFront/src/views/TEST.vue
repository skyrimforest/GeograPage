<template>
    <div class="new-login-box">
        <el-row>
            <el-col>
                <el-input place-holder="用户名"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

onMounted(() => {
})

</script>

<style scoped>
.new-loginx-box {
    text-align: center;
    width: 450px;
    height: 200px;
    margin: 10% auto;
    background-color: rgba(255, 255, 127, 1);
    border-radius: 10px;
    border-color: blue;
}

.map-box {
    z-index: 5;
}

.bm-view {
    width: 100%;
    height: 800px;
}

#map-container {
    height: 100vh;
    width: 100vw;
    /* margin-right: 5px; */
    /*box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2); !* 在底部添加阴影 *!*/
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
</style>