<template>
  <div class="func-container">
    <ElContainer>
      <ElHeader>
        <ElRow>

          <ElCol :span="2"> 无人机事件列表 </ElCol>
          <ElCol :span="2">
            <el-switch v-model="judge" active-text="机型" inactive-text="时间" size="small" inline-prompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #0049ff" />
          </ElCol>
          <ElCol :span="16">

          </ElCol>
          <ElCol :span="4">
            <ElButton @click="add_white">
              最近7天
            </ElButton>
            <ElButton @click="export_white">
              本日
            </ElButton>
            <ElButton @click="import_white">
              导出事件
            </ElButton>
            <ElButton @click="import_white">
              清空事件
            </ElButton>
          </ElCol>
        </ElRow>
      </ElHeader>
      <ElMain style="--el-main-padding: 0px">
        <ElScrollbar height="700px">
          <ElTable :data="droneData" style="width: 100%" :row-class-name="tableRowClassName">
            <ElTableColumn prop="test1" label="机型" width="180" />
            <ElTableColumn prop="test2" label="识别码" width="180" />
            <ElTableColumn prop="test3" label="出现次数" width="180" />
            <ElTableColumn prop="test4" label="发现时间" width="180" />
            <ElTableColumn prop="test5" label="时长(秒)" width="180" />
            <ElTableColumn prop="test6" label="工作频率" width="180" />
            <ElTableColumn prop="test7" label="发现位置" width="180" />
            <ElTableColumn prop="test8" label="消失位置" width="180" />
            <ElTableColumn prop="test9" label="传感器" width="180" />
            <ElTableColumn prop="lookInfo" label="操作">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope.$index)">展示1</el-button>
                <el-button link type="primary" size="small" @click="handleClick(scope.$index)">展示2</el-button>
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
var judge = ref(true)
const droneData = [
  {
    test1: "test1",
    test2: "test2",
    test3: "test3",
    lookInfo: "Tom",
  },
];
</script>

<style scoped src="../styles/dispbox.css"></style>