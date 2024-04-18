<template>
  <div class="func-container">
    <ElContainer>
      <ElHeader>设备管理</ElHeader>
      <ElContainer>
        <ElAside width="200px">
          <ElScrollbar height="700px">
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="1">
                <el-icon><setting /></el-icon>
                <span>Navigator 1</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon><setting /></el-icon>
                <span>Navigator 2</span>
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon><setting /></el-icon>
                <span>Navigator 3</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <span>Navigator 3</span>
              </el-menu-item>
              <el-menu-item index="5">
                <el-icon><setting /></el-icon>
                <span>Navigator 3</span>
              </el-menu-item>
              <el-menu-item index="6">
                <el-icon><setting /></el-icon>
                <span>Navigator 3</span>
              </el-menu-item>
              <el-menu-item index="7">
                <el-icon><setting /></el-icon>
                <span>Navigator 3</span>
              </el-menu-item>
            </el-menu>
          </ElScrollbar>
        </ElAside>
        <ElMain style="--el-main-padding: 0px">
          <ElScrollbar style="height: 700px;">
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

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
    
<style scoped src="../styles/dispbox.css"></style>