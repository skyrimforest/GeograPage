<template>
  <div class="func-container">
    <ElContainer>
      <ElHeader>版本管理</ElHeader>
      <ElMain style="--el-main-padding: 0px">
        <el-card class="box-card">
              <ElRow>
                <ElCol :span="6"> 当前版本:v1.01</ElCol>
              </ElRow>
            </el-card>
        
      </ElMain>
    </ElContainer>
  </div>
</template>



<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>
    
<style scoped>
.el-header {
  height: 40px;
  padding: 10px;
}
.func-container {
  background-color: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(30px);
  border-radius: 10px;
  width: 900px;
  height: 300px;
}
.placeholder-box {
  width: 300px;
  height: 150px;
}
</style>