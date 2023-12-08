<template>
  <div class="func-container">
    <ElContainer>
      <ElHeader>用户管理</ElHeader>
      <ElMain style="--el-main-padding: 0px">
        <ElRow>
          <ElCol>
            <el-card class="box-card">
              <ElRow>
                <ElCol :span="6"> 请输入欲添加的用户名: </ElCol>
                <ElCol :span="8"
                  ><ElInput
                    v-model="username"
                    placeholder="请输入用户名"
                  ></ElInput
                ></ElCol>
                <ElCol :span="6"> </ElCol>
                <ElCol :span="4">
                  <ElButton type="warning">确认提交</ElButton></ElCol
                >
              </ElRow>
            </el-card>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <el-card class="box-card">
              <ElRow>
                <ElCol :span="6"> 请输入原密码: </ElCol>
                <ElCol :span="8"
                  ><ElInput
                    v-model="oripwd"
                    placeholder="请输入原密码"
                  ></ElInput
                ></ElCol>
                <ElCol :span="6"> </ElCol>
                <ElCol :span="4">
                  <ElButton type="warning">确认验证</ElButton></ElCol
                >
              </ElRow>
              <ElRow>
                <br />
              </ElRow>

              <ElRow>
                <ElCol :span="6"> 请输入欲更改的密码: </ElCol>
                <ElCol :span="8"
                  ><ElInput
                    v-model="tarpwd"
                    placeholder="请输入欲更改的密码"
                    type="password"
                  ></ElInput
                ></ElCol>
                <ElCol :span="6"> </ElCol>
                <ElCol :span="4">
                  <ElButton type="warning">确认更改</ElButton></ElCol
                >
              </ElRow>
            </el-card>
          </ElCol>
        </ElRow>
      </ElMain>
    </ElContainer>
  </div>
</template>



<script setup>
import { ElButton } from "element-plus";
import { ref } from "vue";
var tarpwd = ref("");
var oripwd = ref("");
const droneData = [
  {
    test1: "test1",
    test2: "test2",
    test3: "test3",
    lookInfo: "Tom",
  },
];
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