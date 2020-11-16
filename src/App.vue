<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/MainTabBar";
  export default {
    components: {
      MainTabBar
    }
  }
</script>
<style scoped>
/*导入base.css文件*/
  @import "assets/css/base.css";

</style>
