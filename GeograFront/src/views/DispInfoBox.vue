<template>
  <div class="info-container">
    <ElContainer>
      <ElHeader>
        <ElRow class="head-box">
          <ElCol :span="3">
            <ElIcon><Hide /></ElIcon>
          </ElCol>
          <ElCol :span="3">
            <ElIcon><Headset /></ElIcon>
          </ElCol>
          <ElCol :span="3">
            <ElIcon><Bell /></ElIcon>
          </ElCol>
          <ElCol :span="12">
            <ElSelect class="select-button" placeholder="语言" v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </ElSelect>
          </ElCol>
          <ElCol :span="3">
            <ElIcon><User /></ElIcon>
          </ElCol>
        </ElRow>
      </ElHeader>
      <ElMain> 2333 </ElMain>
    </ElContainer>
  </div>
</template>

<script>
import {
  ElIcon,
  ElHeader,
  ElContainer,
  ElMain,
  ElSelect,
  ElCol,
  ElRow,
} from "element-plus";
export default {
  name: "DispInfoBox",
  components: {
    ElHeader,
    ElContainer,
    ElMain,
    ElIcon,
    ElSelect,
    ElCol,
    ElRow,
  },
  data: () => ({
    value: "",
    options: [
      {
        value: "Option1",
        label: "Option1",
      },
      {
        value: "Option2",
        label: "Option2",
        disabled: true,
      },
    ],
  }),
};
</script>

<style>
.info-container {
  width: 300px;
  height: 300px;
  background-color: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(30px);
  border-radius: 10px;
}
.head-box {
  align-items: center;  
  border-bottom: 1px solid rgba(255,255,255,0.5);

}
.select-button {
    background-color: rgba(20, 20, 20, 0.8);
    color:rgba(20, 20, 20, 0.8);
  width: 100px;
}

</style>