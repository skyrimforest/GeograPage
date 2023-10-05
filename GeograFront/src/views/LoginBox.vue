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
import {ElRow,ElCol} from "element-plus"
import axios from "axios"
import APIS from "@/modules/api"
export default {
    name:'LoginBox',
    data:()=>({
        username:'',
        password:'',
    }),
    mounted() {
    },
    components:{
        ElRow,
        ElCol,
    },
    methods:{
        onLoginClick(){
            const myRequestData = {
                username: this.username,
                password: this.password,
            };
            axios.post(APIS.login,
                  myRequestData
              ).then(res => {
                this.msta="success";
                console.log(res);
              });
              this.$router.replace({name: 'MainPage'});
        }
    }
}
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