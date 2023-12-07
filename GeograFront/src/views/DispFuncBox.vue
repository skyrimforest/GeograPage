<template>
  <div>
    <div class="func-container">
      <router-view v-show="visible"> </router-view>
    </div>
    <div class="func-show-container">
      <ElContainer>
        <ElMain>
          <ElRow>
            <ElCol>
              <ElButton
                class="show-button"
                color="rgba(20,20,20,0.8)"
                @click="onShowClick"
              >
                功能展开
              </ElButton>
              <ElButton
                class="show-button"
                v-show="visible"
                color="rgba(20,20,20,0.8)"
                @click="onShowEventClick"
              >
                事件
              </ElButton>
              <ElButton
                class="show-button"
                v-show="visible"
                color="rgba(20,20,20,0.8)"
                @click="onShowAIClick"
              >
                AI学习
              </ElButton>
              <ElButton
                class="show-button"
                v-show="visible"
                color="rgba(20,20,20,0.8)"
                @click="onShowWhiteListClick"
              >
                白名单
              </ElButton>
              <ElButton
                class="show-button"
                v-show="visible"
                color="rgba(20,20,20,0.8)"
                @click="onShowStaClick"
              >
                统计
              </ElButton>
              <ElButton
                class="show-button"
                v-show="visible"
                color="rgba(20,20,20,0.8)"
                @click="onShowDevClick"
              >
                设备管理
              </ElButton>
              <ElButton
                class="show-button"
                v-show="visible"
                color="rgba(20,20,20,0.8)"
                @click="onShowVerClick"
              >
                版本
              </ElButton>
              <ElButton
                class="show-button"
                v-show="visible"
                color="rgba(20,20,20,0.8)"
                @click="onShowUserClick"
              >
                账户设置
              </ElButton>
            </ElCol>
          </ElRow>
        </ElMain>
      </ElContainer>
    </div>
  
  </div>
</template>

<script>
import { ElCard, ElRow, ElCol, ElContainer, ElMain } from "element-plus";

export default {
  name: "DispFuncBox",
  components: {
    ElCard,
    ElRow,
    ElCol,
    ElContainer,
    ElMain,
  },
  data: () => ({
    visible: false,
  }),
  methods: {
    onShowClick() {
      this.visible = !this.visible;
    },
    onShowEventClick() {
      this.$router.replace({name: 'FuncEvent'});
    },
    onShowAIClick() {
      this.$router.replace({name: 'FuncAI'});
    },
    onShowWhiteListClick() {
      this.$router.replace({name: 'FuncWhiLi'});
    },
    onShowStaClick() {
      this.$router.replace({name: 'FuncSta'});
    },
    onShowDevClick() {
      this.$router.replace({name: 'FuncDev'});
    },
    onShowVerClick() {
      this.$router.replace({name: 'FuncVer'});
    },
    onShowUserClick() {
      this.$router.replace({name: 'FuncUser'});
    },
  },
};
</script>

<style scoped>
.func-container {
  background-color: rgba(20, 20, 20, 0);
  backdrop-filter: blur(30px);
  border-radius: 10px;
  width: 900px;
  height: 300px;
}
.placeholder-box {
  width: 300px;
  height: 150px;
}
.func-show-container {
  background-color: rgba(200, 200, 200, 0);
  align-items: center;
  /* backdrop-filter: blur(30px); */
  /* border-radius: 10px; */
  width: 900px;
  height: 80px;
}
.show-button {
  width: 80px;
}
</style>