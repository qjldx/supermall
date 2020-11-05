<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>
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
