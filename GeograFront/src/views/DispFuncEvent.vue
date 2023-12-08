<template>
  <div class="func-container">
    <ElContainer>
      <ElHeader>
        <ElRow>
          <ElCol :span="4"> 无人机事件列表 </ElCol>
          <ElCol :span="20">
            <el-switch
              v-model="judge"
              active-text="机型"
              inactive-text="时间"
              size="small"
              inline-prompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #0049ff"
            />
          </ElCol>
        </ElRow>
      </ElHeader>
      <ElMain style="--el-main-padding: 0px">
        <ElScrollbar height="170px">
          <ElTable
            :data="droneData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <ElTableColumn prop="test1" label="列1" width="180" />
            <ElTableColumn prop="test2" label="列2" width="180" />
            <ElTableColumn prop="lookInfo" label="查看详情">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="handleClick(scope.$index)"
                  >展示1</el-button
                >
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="handleClick(scope.$index)"
                  >展示2</el-button
                >
              </template>
            </ElTableColumn>
            <ElTableColumn prop="test3" label="列3" width="180" />
          </ElTable>
        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </div>
</template>

<script setup>
import { ElSwitch } from "element-plus";
import { ref } from "vue";
var judge=ref(true)
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
  height: 45px;
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