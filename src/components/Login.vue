<template>
  
  <div class="el-login-model">
      <el-form :model="ruleForm2">
        <h3 class="model-title">系统登录</h3>

        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>

        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>

        <el-checkbox v-model="checked" checked class="el-remember">记住密码</el-checkbox>


        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;"  :loading="logining" @click="loginFn">登录</el-button>
        </el-form-item>


      </el-form>
  </div>

</template>

<style>
    
    .el-login-model {
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .model-title {
        margin: 0 auto 20px;
        text-align: center;
    }
    .el-remember {
        margin-bottom: 35px;
    }


</style>

<script>
  
  export default {
    data() {
      return {
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        checked: true,
        logining: false
      }
    },
    methods: {
      loginFn() {
        this.logining = true;
        let _this = this;
        _.delay(()=>{
            _this.$router.push({ path: '/main' });
        }, 3000)
      }
    }
  }



</script>