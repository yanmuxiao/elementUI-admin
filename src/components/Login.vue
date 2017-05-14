<template>
  
  <div class="el-login-model">
      <el-form :model="formData">
        <h3 class="model-title">系统登录</h3>

        <el-form-item prop="account">
          <el-input type="text" v-model="formData.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="formData.password" auto-complete="off" @change="loginAutoFlase" placeholder="密码"></el-input>
        </el-form-item>

        <el-checkbox v-model="checked" class="el-remember">记住密码</el-checkbox>


        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;"  :loading="logining" @click="loginFn">登录</el-button>
        </el-form-item>


      </el-form>
  </div>

</template>

<style  lang="scss">
    
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
        .model-title {
            margin: 0 auto 20px;
            text-align: center;
        }
        .el-remember {
            margin-bottom: 35px;
        }
    }
    


</style>

<script>

  

  import { requestLogin } from '../api/api.js'


  import { setCookie, getCookieValue, deleteCookie } from '../static/cookie.js'

  import MD5 from 'MD5/md5.js' // MD5

  export default {
    data() {
      return {
        formData: {
          account: '',
          password: ''
        },
        formValidate: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: false,// 是否记住密码
        loginAuto: false,
        logining: false
      }
    },
    methods: {
      loginFn() {
        this.logining = true;

        // 账号和密码验证
        let encryptedPW
        if(this.loginAuto) {
            encryptedPW = getCookieValue('vuePassword');
        } else {

            // 在这一步可以对用户名和密码进行正则判断
            encryptedPW = MD5('vue' + this.formData.password);
        }
        
        let loginParams = {
            username: this.formData.account,
            password: encryptedPW,
            checked: this.checked
        }
        requestLogin(loginParams).then(data => {
            let { msg, code, user } = data;

            if(code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
                this.logining = false;
            } else {
                sessionStorage.setItem('user', user.token);
                if(this.checked) {
                    // 记住用户和密码
                    setCookie('vueUser', this.formData.account, 0.05, 'abcdefg')
                    setCookie('vuePassword', encryptedPW, '0.05', 'abcdefg')

                    // 记住用户昵称和头像
                    setCookie('nickName', user.nickName, 0.05, 'abcdefg')
                    setCookie('avatar', user.avatar, 0.05, 'abcdefg')

                } else {
                    deleteCookie('vueUser');
                    deleteCookie('vuePassword');
                }
                this.$router.push({ path: '/main', query: { 'userName': user.nickName }});
            }
        });
 
      },
      loginAutoFlase() {
          if(this.loginAuto) {
              this.formData.password = '';
              this.loginAuto = false;
          }
      }
    },
    created() {
        
        if(getCookieValue('vueUser') != '') {
            this.formData.account = getCookieValue('vueUser');
            if(getCookieValue('vuePassword') != '') {
                this.formData.password = getCookieValue('vuePassword');
                this.checked = true;
                this.loginAuto = true;
            }
        }

    }
  }



</script>