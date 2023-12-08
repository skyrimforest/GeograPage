<template>
  <div class="func-container">
    <ElContainer>
      <ElHeader>
        <ElRow>
          <ElCol :span="12"> 无人机事件统计报告 </ElCol>
          <ElCol :span="2">
            日期范围:
          </ElCol>
          <ElCol :span="10">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="截止日期"
              :size="size"
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
import { ref } from "vue";
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