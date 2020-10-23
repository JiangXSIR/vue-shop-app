<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域  -->
      <div class="avatar-box">
        <img src="../../assets/img/avatar-login.png" alt=""/>
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login-form">

        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetLoginForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from 'api/login/login.js'
import * as shared from 'common/shared/shared.js'

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if(valid) { this.doLogin();}
      });
    },
    doLogin() {
      login(this.loginForm).then(result => {
        if (result.meta.status === 200) {
          this.$message.success("登录成功");
          this.loginSuccessDeal(result);
        } else{
          this.$message.error("登录失败");
        }
      });
    },
    loginSuccessDeal(result) {
      shared.setSessionStorage('token', result.data.token);
      this.$router.push("/home");
    },
    resetLoginForm() {
      // console.log(this);
      // console.log(this.loginForm);
      this.$refs.loginFormRef.resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container{
    background-color: #44477c;
    height: 100%;
  }

  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar-box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }

  .login-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box; // box-sizing
  }

  .btns{
    display: flex;
    justify-content: flex-end;
  }
</style>
