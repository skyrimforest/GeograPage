<template>
  <div class="beg-login-box">
    <el-space direction="vertical">
      <br />
      <el-input
        prefix-icon="UserFilled"
        v-model="username"
        placeholder="请输入账号:"
      />
      <el-input
        prefix-icon="Lock"
        v-model="password"
        type="password"
        placeholder="请输入密码:"
        show-password
      />

      <el-button type="primary" size="large" plain @click="onLoginClick">
        <el-icon>
          <Check />
        </el-icon>
        <span> 点击进入 </span>
      </el-button>
    </el-space>
  </div>
</template>

<script>
import { ElRow, ElCol, ElNotification } from "element-plus";
import axios from "axios";
import APIS from "@/modules/api";
import {useStore} from "@/stores/index";

export default {
  name: "LoginBox",
  data: () => ({
    username: "",
    password: "",
    store:useStore(),
  }),
  mounted() {},
  components: {
    ElRow,
    ElCol,
  },
  methods: {
    onLoginClick() {
      const myRequestData = {
        username: this.username,
        password: this.password,
      };
      axios.post(APIS.login, myRequestData).then((res) => {
        if (res.data.success == true) {
          this.store.username=this.username;
          this.store.password=this.password;
          // console.log(this.store.password);
          // this.loginSuccess();
          this.$router.replace({ name: "MainPage" });
        } else {
          this.loginFail();
          // console.log("fail");
          // this.$router.replace({ name: "MainPage" });
        }
      });
    },
    loginSuccess() {
      ElNotification({
        title: "Success",
        message: "登陆成功！",
        type: "success",
        position: "bottom-right",
        duration: 3000,
      });
    },
    loginFail() {
      ElNotification({
        title: "Error",
        message: "登陆失败，请检查用户名或者密码是否正确",
        type: "error",
        position: "bottom-right",
        duration: 3000,
      });
    },
  },
};
</script>

<style scoped>
.beg-login-box {
  text-align: center;

  width: 450px;
  height: 200px;
  margin: 10% auto;
  background-color: rgba(127, 127, 127, 0.5);
  border-radius: 10px;
}
</style>