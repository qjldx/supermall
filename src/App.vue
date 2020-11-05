<template>
  <div id="app">
    <tab-bar>
    <tab-bar-item path="/home" activeColor="red">
      <img slot="item-icon" src="./assets/img/tabbar/home.png">
      <img slot="item-icon-active" src="./assets/img/tabbar/home_active.png">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="#16f6f6">
      <img slot="item-icon" src="./assets/img/tabbar/category.png">
      <img slot="item-icon-active" src="./assets/img/tabbar/category_active.png">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="green">
      <img slot="item-icon" src="./assets/img/tabbar/mall.png">
      <img slot="item-icon-active" src="./assets/img/tabbar/mall_active.png">
      <div slot="item-text">购物车</div>

    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="cyan">
      <img slot="item-icon" src="./assets/img/tabbar/mine.png">
      <img slot="item-icon-active" src="./assets/img/tabbar/mine_active.png">
      <div slot="item-text">我的</div>
    </tab-bar-item>
    </tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import TabBar from "./components/tabbar/TabBar";
  import TabBarItem from "./components/tabbar/TabBarItem";
  export default {
    components: {TabBarItem, TabBar}
  }
</script>
<style scoped>


</style>
