<template>
    <div id="home" class="wrapper">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <scroller class="content" ref="scroll"
                  :pull-up-load="true"
                  :probe-type="3"
                  @scroll="contentScroll"
                  @pullingUp="loadMore">
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
          <!--因采用了better-scroll的组件，所以此时的tab-controll这个组件就不起作用了，所以此时的
          class="tab-control"这个类就可去了
          -->
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick" ref="tabcontrol">

        </tab-control>
        <goods-list :goods="showGoods"></goods-list>
        </scroller>
      <!--组件是不能点击的如果要点击的话,要加上native这个元操作-->
      <back-top @click.native="backClick"   v-show="isShowBackTop"></back-top>

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
            isShowBackTop:false,
            /*吸顶效果*/
            tabOffsetTop:0,

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
       //3 吸顶效果的tab-bar的值(离顶端的高度)

    },
    mounted() {
       //1 图片加载完成的事件监听
          const refresh= this.deboundce(this.$refs.scroll.refresh,500)
      //2 获取tabControl的offsetTop 组件对象是不能获取offset的这个属性的
      //所有的组件都 有一个属性$el:用于获取组建中的元素

      console.log("tabControl的位置"+this.$refs.tabcontrol.$el.offsetTop);
     // this.tabOffsetTop=this.$refs.tabControl

      this.$bus.$on('itemImageLoad',() =>{
        //this.$refs.scroll.refresh()
        refresh()
      })
    },
    methods:{
          //抖动函数的使用
          deboundce(func,delay){
          let timer=null
            return function (...args) {
             if(timer) clearTimeout(timer)
              timer=setTimeout(() =>{
                 func.apply(this,args)
              },delay)
            }
          },
      contentScroll(postion){
        this.isShowBackTop=-postion.y>1000

      },
           /*事件监听的方法*/
      loadMore(){
        this.getHomeGoods(this.currentType)


      },

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
          this.$refs.scroll.finishPullUp()
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
 /*具有吸顶的效果的设置 positon sticky
  .tab-control {
   position: sticky;
    top:44px;
    z-index:9;
  }*/
.content {
  height: calc(100% - 93px);
  /*position: absolute; 购物街为44px,tabbar的高度为49px 两个加起来为93px,但是93是中间空出一块的原因*/
  position: absolute;
  margin-top: 44px;
  overflow: hidden;
}
</style>
