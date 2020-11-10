<template>
    <!--这个地方去掉了div这个标签了 加上不知道可不可以-->
      <tab-bar class="tab-bar">
        <tab-bar-item path="/home" activeColor="red">
          <img slot="item-icon" src="~assets/img/tabbar/home.png">
          <!--在dom文件中加上别名是要采用~符号-->
         <!-- <img slot="item-icon" src="~assets/img/tabbar/home.svg">-->

          <img slot="item-icon-active" src="~assets/img/tabbar/home_active.png">
          <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category" activeColor="#16f6f6">
          <img slot="item-icon" src="~assets/img/tabbar/category.png">
          <img slot="item-icon-active" src="~assets/img/tabbar/category_active.png">
          <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item path="/cart" activeColor="green">
          <img slot="item-icon" src="~assets/img/tabbar/mall.png">
          <img slot="item-icon-active" src="~assets/img/tabbar/mall_active.png">
          <div slot="item-text">购物车</div>

        </tab-bar-item>
        <tab-bar-item path="/profile" activeColor="cyan">
          <img slot="item-icon" src="~assets/img/tabbar/mine.png">
          <img slot="item-icon-active" src="~/assets/img/tabbar/mine_active.png">
          <div slot="item-text">我的</div>
        </tab-bar-item>
      </tab-bar>

</template>

<script>
  import TabBarItem from "../tabbar/TabBarItem";
  import TabBar from "../tabbar/TabBar";
    export default {
        name: "MainTabBar",
      components:{
          TabBar,TabBarItem
      }
    }
</script>

<style scoped>
  .tab-bar {
    z-index: 9;
  }
</style>
