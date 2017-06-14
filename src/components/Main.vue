<template>

    
    <div class="main-vue" v-bind:class="{ hideAside: hideAside, mobileAside:  mobileAside, mobileShow: mobileShow}">

        <header class="el-header">
            <el-row class="el-header-nav">
                <el-col :span="24">


                    <el-col :span="2" class="el-header-col el-asideSH">
                        <i class="el-icon-more el-aside-sh" @click="asideSH"></i>
                    </el-col>

                    <el-col :span="8" class="el-header-col el-header-logo">
                        <h1  class="el-logo">LOGO</h1>
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
                        </el-menu>
                    </el-col>
                </el-col> 
            </el-row>
        </header>

        <aside class="el-aside" @click="asideMobileH">
            <div class="el-aside-x" @click.stop="eventPrevent">
                <div class="el-aside-scroll">
                    <el-menu :default-active="$route.path == '/main' ? 'index' : $route.path.replace('/','')" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" unique-opened router>

                        <el-menu-item index="index"><i class="el-icon-message"></i>控制台</el-menu-item>

                        <el-menu-item index="syncTask"><i class="el-icon-document"></i>用户列表</el-menu-item>

                        <el-menu-item index="editForm"><i class="el-icon-plus"></i>添加用户</el-menu-item>



                        <el-submenu index="2">

                            <template slot="title" @click.stop="eventPrevent"><i class="el-icon-message"></i>基本</template>
                            <el-menu-item index="layout">布局</el-menu-item>
                            <el-menu-item index="color">色彩</el-menu-item>
                            <el-menu-item index="typography">字体</el-menu-item>
                            <el-menu-item index="icon">图标</el-menu-item>
                            <el-menu-item index="button">按钮</el-menu-item>

                        </el-submenu>

                        <el-submenu index="3">
                          <template slot="title"><i class="el-icon-setting"></i>表单</template>
                            <el-menu-item index="radio">单选框</el-menu-item>
                            <el-menu-item index="checkbox">多选框</el-menu-item>
                            <el-menu-item index="input">输入框</el-menu-item>
                            <el-menu-item index="inputNumber">计数器</el-menu-item>
                            <el-menu-item index="select">选择器</el-menu-item>
                            <el-menu-item index="cascader">级联选择器</el-menu-item>
                            <el-menu-item index="switch">开关</el-menu-item>
                            <el-menu-item index="slider">滑块</el-menu-item>
                            <el-menu-item index="timePicker">时间选择器</el-menu-item>
                            <el-menu-item index="datePicker">日期选择器</el-menu-item>
                            <el-menu-item index="dateTimePicker">日期时间选择器</el-menu-item>
                            <el-menu-item index="upload">上传</el-menu-item>
                            <el-menu-item index="rate">评分</el-menu-item>
                            <el-menu-item index="colorPicker">颜色选择器</el-menu-item>
                            <el-menu-item index="form">表单</el-menu-item>
                        </el-submenu>
                      </el-menu>
                </div>

            </div>
        </aside>

        <main class="el-main">
             <transition name="fade" mode="out-in">
                <router-view  v-bind:message="parentMsg" v-on:incrementt="fatherFn"></router-view>
             </transition>
        </main>


        <div class="el-aside-mobile">
            <i class="el-icon-more asideMobileSH" @click="asideMobileSH"></i>
        </div>

    </div>



</template>


<style  lang="scss">

    $rgba0: rgba(0,0,0,0);


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

        $asideMobile: 36px;
        .el-aside-mobile {
            position: absolute;
            left: $asideMobile;
            bottom: $asideMobile;
            width: $asideMobile;
            height: $asideMobile;
            z-index: 1002;
            background-color: rgba(0,0,0,0.7);
            text-align: center;
            display: none;
            border-radius: 6px;
            cursor: pointer;
        }
        .el-aside-mobile .asideMobileSH {
            font-size: 20px;
            color: #fff;
            line-height: $asideMobile;
        }
    }
    

    .el-header {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 60px;
        color: #cbcfd4;
        background-color: #324157;
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
        width: auto;
    }
    .el-logo {
        font-size: 24px;
        margin: 0;
        line-height: 60px;
        text-align: center;
        font-weight: normal;
    }
    .el-asideSH {
        width: 60px;
    }
    .el-aside-sh {
        padding: 0 20px;
        border-left: 1px solid hsla(62,77%,76%,.3);
        cursor: pointer;
        font-size: 24px;
        line-height: 60px;
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

    .el-menu--horizontal .el-submenu>.el-menu {
        left: -20px;
    }
    



    .el-aside {
        position: absolute;
        left: 0;
        top: 60px;
        bottom: 0;
        width: 200px;
        z-index: 1002;
        background-color: rgba(0,0,0,.5);;
        overflow: hidden;
    
        .el-aside-x {
            width: 200px;
            height: 100%;
            overflow: hidden;
        }
        .el-aside-scroll {
            width: 220px;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #263238;
        }
        .el-aside-scroll .el-menu-vertical-demo {
            width: 200px;
            background: #263238;
            padding: 10px 0;
        }


        .el-menu {
            background: $rgba0;
        }
        .is-opened .el-submenu__title {
            color: rgba(255,255,255,.7);
            background: rgba(255, 255, 255, 0.04);
        }
        .el-menu-item,
        .el-submenu__title {
            height: 40px;
            line-height: 40px;
            background: $rgba0;
            color: rgba(163,175,183,.9);
        }
        .el-menu-item:hover,
        .el-submenu .el-menu-item:hover,
        .el-submenu__title:hover {
            background: rgba(255,255,255,.02); 
            color: rgba(255,255,255,.8);
        }
        .el-menu .is-active,.el-menu .is-active:hover {
            color: #fff;
        }

        .el-menu .el-submenu__icon-arrow {
            font-size: 12px;
        }

    }


    .hideAside .el-aside {
        width: 0;
    }
    .hideAside .el-main {
        left: 0;
    }



    .mobileAside  .el-aside {
        width: 0;
        top: 0;
    }
    .mobileAside  .el-asideSH {
        display: none;
    }
    .mobileAside .el-main {
        left: 0;
    }
    .mobileAside  .el-aside-mobile {
        display: block;
    }


    .mobileShow .el-aside {
        width: auto;
        right: 0;
        top: 0;
    }
    .mobileShow .el-aside-mobile {
        display: none;
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
                },
                parentMsg: '哈哈哈哈哈哈哈！',

                hideAside: false,
                mobileAside: false,
                mobileShow: false,
                routerAside: false,
                screenWidth: document.body.clientWidth
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
            },
            fatherFn() {
                this.parentMsg = 'Oh, my Gold!';
            },

            asideSH() {
                this.hideAside = !this.hideAside;
            },


            asideMobileH() {
                if(this.mobileAside) {
                    this.mobileShow = false;
                }
            },
            asideMobileSH() {
                if(this.mobileAside) {
                    this.mobileShow = true;
                    this.routerAside = true;
                }
            },
            eventPrevent() {}
        },
        created() {
            console.log(this.$route.query.userName)

            this.userInfo.nickName = getCookieValue('nickName') || getCookieValue('account');

            this.userInfo.avatar = getCookieValue('avatar');

            if(this.screenWidth <= 800) {
                this.mobileAside = true;
            }else{
                this.mobileAside = false;
            }

        },
        computed: {
          count () {
            return this.$store.state.count
          }
        },
        mounted () {
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        },
        watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        // that.screenWidth = that.$store.state.canvasWidth
                        if(that.screenWidth <= 800) {
                            that.mobileAside = true;
                        }else{
                            that.mobileAside = false;
                            that.mobileShow = false;
                        }
                        that.timer = false
                    }, 200)
                }
            }
        },
        updated() {
            if((this.mobileAside && !this.mobileShow) || !this.routerAside) {
                this.mobileShow = false;
            }
            this.routerAside = false;
        }
    }


</script>
