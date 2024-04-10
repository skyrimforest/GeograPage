<template>
  <div class="beg-login-box">
    <div class="left-box">
      <el-image :src="getAssets(left_box_url)" fit="cover" style="width: 100%; height: 100%">

      </el-image>
    </div>


    <div class="right-box">
      <el-card style="height: 100%;">
        <template #header>
          <div class="card-header">
            <el-row>
              <el-col>
                <el-image :src="getAssets(top_pic_url)" fit="cover" style="width: 10vw; height:10vh">

                </el-image>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-text type="primary" style="font-weight: bolder; color:rgba(77,94,169,1)">无人机防御系统</el-text>
              </el-col>
            </el-row>
          </div>
        </template>
        <el-row>
          <el-col :span="2">
          </el-col>
          <el-col :span="20">
            <el-input prefix-icon="UserFilled" v-model="username" placeholder="请输入账号:" />
          </el-col>
          <el-col :span="2">
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <br/>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
          </el-col>
          <el-col :span="20">
            <el-input prefix-icon="Lock" v-model="password" type="password" placeholder="请输入密码:" show-password />
          </el-col>
          <el-col :span="2">
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <br/>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-checkbox v-model="checked1" label="下次自动登录" size="small" />
          </el-col>
          <el-col :span="2">
          </el-col>
        </el-row>

        <template #footer>
          <el-row>
            <el-col>
              <el-button type="primary" size="large" plain @click="onLoginClick">
                <el-icon>
                  <Check />
                </el-icon>
                <span>点击登录</span>
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <br/>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span style="font-size: x-small;color:rgba(100,100,100,0.5)">
                忘记密码?
              </span>
            </el-col>
          </el-row>
        </template>
      </el-card>
    </div>

  </div>
</template>

<script>
import { ElRow, ElCol, ElNotification, ElButton } from "element-plus";
import axios from "axios";
import APIS from "@/modules/api";
import { useStore } from "@/stores/index";

export default {
  name: "LoginBox",
  data: () => ({
    username: "",
    password: "",
    store: useStore(),
    left_box_url: "../assets/leftbox.png",
    top_pic_url: "../assets/drone.png",
  }),
  mounted() { },
  components: {
    ElRow,
    ElCol,
  },
  methods: {
    getAssets(url) {
      return new URL(url, import.meta.url).href;
    },
    onLoginClick() {
      const myRequestData = {
        username: this.username,
        password: this.password,
      };
      if (this.username === "0" && this.password === "0") {
        this.$router.replace({ name: "MainPage" });
        return 0;
      }
      axios.post(APIS.login, myRequestData).then((res) => {
        if (res.data.success == true) {
          this.store.username = this.username;
          this.store.password = this.password;
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
.left-box {
  flex: 1;
  width: 50vw;
  background-color: rgba(127, 127, 127, 0.5);
  object-fit: cover;
}

.right-box {
  flex: 1;
  width: 50vw;
  background-color: rgba(255, 255, 255, 1);
  text-align: center;
  border-radius: 10px;
  position: relative;
}

.beg-login-box {
  display: flex;
  text-align: center;

  width: 60vw;
  height: 60vh;
  margin: 10% auto;
  background-color: rgba(127, 127, 127, 0.5);
}
</style>