<template>

    
    <div class="main-vue">

        <header class="el-header">
            <el-row class="el-header-nav">
                <el-col :span="24">
                    <el-col :span="6" class="el-header-col el-header-logo">
                        <h1  class="el-logo">LOGO</h1>
                    </el-col>
                    <el-col :span="2" class="el-header-col">
                        <i class="el-icon-more el-aside-sh"></i>
                    </el-col>
                    <el-col :span="10" class="el-header-col el-menu-col">

                        <el-menu theme="dark" class="el-menu-ul" mode="horizontal">
                            <el-submenu index="2" class="el-user-li">
                                <template slot="title">
                                    {{ this.userInfo.nickName || this.userInfo.account }}
                                    <img class="user-avatar" :src="this.userInfo.avatar" />
                                </template>
                                <el-menu-item index="2-1">我的消息</el-menu-item>
                                <el-menu-item index="2-2">设置</el-menu-item>
                                <el-menu-item index="2-3" @click="loginOut">退出登录</el-menu-item>
                            </el-submenu>
                            <el-menu-item index="1">
                              <router-link to="/syncTask">用户列表</router-link>
                            </el-menu-item>
                            <el-menu-item index="2">
                              <router-link  to="/editForm">添加用户</router-link>
                            </el-menu-item>
                            
                        </el-menu>

                        

                    </el-col>
                </el-col> 
            </el-row>
        </header>

        <aside class="el-aside">
            <div class="el-aside-scroll">
                <el-menu :default-active="$route.path == '/main' ? 'index' : $route.path.replace('/','')" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" unique-opened theme="dark" router>

                    <el-menu-item index="index"><i class="el-icon-message"></i>控制台</el-menu-item>


                    <el-submenu index="2">

                        <template slot="title"><i class="el-icon-message"></i>Basic</template>
                        <el-menu-item index="layout">Layout 布局</el-menu-item>
                        <el-menu-item index="color">Color 色彩</el-menu-item>
                        <el-menu-item index="typography">Typography 字体</el-menu-item>
                        <el-menu-item index="icon">Icon 图标</el-menu-item>
                        <el-menu-item index="button">Button 按钮</el-menu-item>

                    </el-submenu>

                    <el-submenu index="3">

                      <template slot="title"><i class="el-icon-setting"></i>Form</template>
                        <el-menu-item index="radio">Radio 单选框</el-menu-item>
                        <el-menu-item index="checkbox">Checkbox 多选框</el-menu-item>
                        <el-menu-item index="input">Input 输入框</el-menu-item>
                        <el-menu-item index="inputNumber">InputNumber 计数器</el-menu-item>
                        <el-menu-item index="select">Select 选择器</el-menu-item>
                        <el-menu-item index="3-6">Cascader 级联选择器</el-menu-item>
                        <el-menu-item index="3-7">Switch 开关</el-menu-item>
                        <el-menu-item index="3-8">Slider 滑块</el-menu-item>
                        <el-menu-item index="3-9">TimePicker 时间选择器</el-menu-item>
                        <el-menu-item index="3-10">DatePicker 日期选择器</el-menu-item>
                        <el-menu-item index="3-11">DateTimePicker 日期时间选择器</el-menu-item>
                        <el-menu-item index="3-12">Upload 上传</el-menu-item>
                        <el-menu-item index="3-13">Rate 评分</el-menu-item>
                        <el-menu-item index="3-14">ColorPicker 颜色选择器</el-menu-item>
                        <el-menu-item index="3-15">Transfer 穿梭框</el-menu-item>
                        <el-menu-item index="3-16">Form 表单</el-menu-item>
                    </el-submenu>


                  </el-menu>
            </div>
        </aside>


        <main class="el-main">
             <transition name="fade" mode="out-in">
                <router-view></router-view>
             </transition>
        </main>


    </div>



</template>


<style  lang="scss">
    body {
      font-family: Helvetica, sans-serif;
      margin: 0;
    }
    html, body {
        height: 100%;
        min-height: 400px;
        overflow: hidden;
    }
    .el-app {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .main-vue {
        width: 100%;
        height: 100%;
        position: relative;
    }
    $color: #324157;
    .el-header {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 60px;
        color: #cbcfd4;
        background-color: $color;
        z-index: 1000;
    }
    .el-header .el-header-nav {
        margin-bottom: 0;
    }
    .el-header-nav .el-menu {
        border-radius: 0;
    }
    .el-header-col {
        height: 60px;
    }
    .el-header-logo {
        width: 200px;
    }
    .el-logo {
        font-size: 24px;
        margin: 0;
        line-height: 60px;
        text-align: center;
    }
    .el-aside-sh {
        font-size: 24px;
        line-height: 60px;
        padding: 0 20px;
        border-left: 1px solid hsla(62,77%,76%,.3);
        cursor: pointer;
    }


    .el-header-col .el-menu-item {
        padding: 0
    }
    .el-header-col .el-menu-item a {
        display: block;
        padding: 0 20px;
        text-decoration: none;
    }
    .el-user-li .el-submenu>.el-menu {
        left: -5px;
    }

    .el-menu-col {
        float: right;
        width: auto;
    }
    .el-menu-col .el-menu-ul li {
        float: right;
    }
    .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        vertical-align: middle;
    }
    .el-user-li .el-icon-caret-bottom {
        display: none;
    }



    .el-aside {
        position: absolute;
        left: 0;
        top: 60px;
        bottom: 0;
        width: 200px;
        z-index: 1000;
        background-color: #324157;
        overflow: hidden;
    }
    .el-aside-scroll {
        width: 220px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .el-aside-scroll .el-menu-vertical-demo {
        width: 200px;
    }


    .el-main {
        position: absolute;
        left: 200px;
        top: 60px;
        bottom: 0;
        right: 0;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        padding: 15px;
    }


</style>



<script>
    
    import { setCookie, getCookieValue, deleteCookie } from '../static/cookie.js'


    export default {
        data() {
            return {
                activeIndex: '1',
                userInfo: {
                    nickName: '',
                    avata: ''
                }
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            loginOut() {
                var _this = this;
                this.$confirm('确认退登录吗?', '提示', {
                    //type: 'warning'
                }).then(() => {

                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');

                }).catch(() => {});
            }
        },
        created() {
            console.log(this.$route.query.userName)

            this.userInfo.nickName = getCookieValue('nickName') || getCookieValue('account');

            this.userInfo.avatar = getCookieValue('avatar');
        }
    }


</script>
