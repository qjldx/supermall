<template>
    <div id="home" class="wrapper">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <scroller class="content" ref="scroll" @scroll="contentScroll">
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control" :titles="['流行','新款','精选']"
                     @tabClick="tabClick">

        </tab-control>
        <goods-list :goods="showGoods"></goods-list>
        </scroller>
      <!--组件是不能点击的如果要点击的话,要加上native这个元操作-->
      <back-top @click.native="backClick" :probe-type="3"  v-show="isShowBackTop"></back-top>

      </div>
</template>
<script>
  //import {Swiper,SwiperItem} from 'components/common/swiper';
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";
  import Scroller from "components/content/scroll/Scroller";
  import {
    getHomeMultidata,getHomeGoods
  } from "network/home";
  import BackTop from "components/content/backTop/BackTop";

  export default {
        name: "Home",
      components:{
        BackTop,
        Scroller,
        GoodsList,
        TabControl,
        FeatureView,

        HomeSwiper,
        NavBar,
        RecommendView,
       /* Swiper,
        SwiperItem,*/
      },
    data(){
          return {
            banners:[],
            recommends:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isShowBackTop:false

          }
    },
    computed:{
          showGoods(){
            return this.goods[this.currentType].list;
          }
    },
    created() {
          //1 请求多个数据
      this.getHomeMultidata();
        //2 请求商品参数
       this.getHomeGoods('pop');
       this.getHomeGoods('new');
       this.getHomeGoods('sell');
    },
    methods:{
      contentScroll(postion){
        this.isShowBackTop=-postion.y>1000
      },
           /*事件监听的方法*/

          tabClick(index){
            switch (index) {
              case 0:
                this.currentType='pop'
                    break
              case 1:
                this.currentType='new'
                    break
              case 2:
                this.currentType='sell'
                    break

            }
          },
      /**
       * 网络请求的相关方法
       */
      getHomeMultidata(){
            getHomeMultidata().then(res=>{
              this.banners=res.data.banner.list;
              this.recommends=res.data.recommend.list;
            })
          },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        });
      },
      backClick(){

        //this.$refs.scroll.scroll.scrollTo(0,0,500);
        this.$refs.scroll.scrollTo(0,0);
      }
    }
  }
</script>


<style scoped>
#home {
 /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
 .home-nav {
   background-color: var(--color-tint);
   color:#fff ;
   position: fixed;
   left: 0;
   right: 0;
   top:0;
   z-index: 9;
 }
 /*具有吸顶的效果的设置 positon sticky*/
  .tab-control {
  /*  position: sticky;*/
    top:44px;
    z-index:9;
  }
.content {
  height: calc(100% - 93px);
  /*position: absolute; 购物街为44px,tabbar的高度为49px 两个加起来为93px,但是93是中间空出一块的原因*/
  position: absolute;
  margin-top: 44px;
  overflow: hidden;
}
</style>
