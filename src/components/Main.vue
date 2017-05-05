<template>

    
    <div class="main-vue">

        <header class="el-header">

            <div class="el-header-nav">

                <el-menu theme="dark" :default-active="activeIndex" class="el-menu-sync" mode="horizontal">
                    <el-menu-item index="1">
                      <router-link to="/">同步任务</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                      <router-link  to="/editForm">任务日志清单</router-link>
                    </el-menu-item>
                </el-menu>

            </div>

        </header>

        <aside class="el-aside">
            <div class="el-aside-scroll">
                <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" unique-opened theme="dark" router>

                    <el-menu-item index="/"><i class="el-icon-message"></i>控制台</el-menu-item>


                    <el-submenu index="2">

                      <template slot="title"><i class="el-icon-message"></i>Basic</template>
                        <el-menu-item index="layout">Layout 布局</el-menu-item>
                        <el-menu-item index="color">Color 色彩</el-menu-item>
                        <el-menu-item index="typography">Typography 字体</el-menu-item>
                        <el-menu-item index="2-4">Icon 图标</el-menu-item>
                        <el-menu-item index="2-5">Button 按钮</el-menu-item>

                    </el-submenu>

                    <el-submenu index="3">

                      <template slot="title"><i class="el-icon-setting"></i>Form</template>
                        <el-menu-item index="3-1">Radio 单选框</el-menu-item>
                        <el-menu-item index="3-2">Checkbox 多选框</el-menu-item>
                        <el-menu-item index="3-3">Input 输入框</el-menu-item>
                        <el-menu-item index="3-4">InputNumber 计数器</el-menu-item>
                        <el-menu-item index="3-5">Select 选择器</el-menu-item>
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
             <router-view></router-view>
        </main>


    </div>



</template>

<style>
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


.el-header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 60px;
    color: #cbcfd4;
    z-index: 1000;
}
.el-menu-sync {
    padding: 0 5%;
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
    
    export default {
        data() {
            return {
                activeIndex: '1'
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }


</script>
