<template>
  <div class="common-layout">
    <!-- <div class="beg-top-title">无人机防御系统</div> -->
    <LoginBox></LoginBox>
    <!-- <NewLoginBox></NewLoginBox> -->
  </div>
</template>

<script>
import { ElButton } from "element-plus";
import LoginBox from "../views/LoginBox.vue";

export default {
  name: "LoginPage",
  components: {
    ElButton,
    LoginBox,
  },
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100vh;
  position: fixed;
  /*overflow-x: hidden;*/
  /*overflow-y: hidden;*/
  background-size: cover !important;
  background-image: url(../assets/LoginBack.png);
}


.beg-top-title {
  line-height: 200px;
  text-align: center;
  height: 200px;
  weight: 500px;
  margin-top: 100px;
  font-size: 72px;
  font-family: "Aa新华墨竹体 (非商业使用)", serif;
  color: rgba(44, 62, 80, 1);
  background-color: rgba(255, 255, 255, 0.7);
}
</style>

