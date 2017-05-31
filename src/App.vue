<template>
  <div id="app" class="el-app">

    <transition name="fade" mode="out-in">
		<router-view></router-view>
	</transition>


  </div>
</template>

<style>

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

</style>


<script>
    
    export default {
        data() {
            return {
            }
        }
    }

</script>
