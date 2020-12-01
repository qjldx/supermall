<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"  @titleClick="titleClick" ref="nav"/>
    <scroller class="content" ref="scroll" :pull-up-load="true"
              :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
    <goods-list :goods="recommends" ref="recommend"/>
    </scroller>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import  {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroller from "components/content/scroll/Scroller";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import  {itemListenerMixin} from "../../common/mixin";
  import DetailBottomBar from "./childComps/DetailBottomBar";


  export default {
    name: "Detail",
    components: {
      DetailBottomBar,
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      Scroller,
      DetailShopInfo,
      DetailBaseInfo,
      DetailSwiper,
      DetailNavBar},
    mixins:[itemListenerMixin],
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        ItemImgListener:null,
        themeTopYs:[],
        currentIndex:0,

      }
    },
    created() {
      //保存传入的数据的iid
      this.iid=this.$route.params.iid
    // 2 根据iid请求详情页的数据
      getDetail(this.iid) .then( res =>{
        //1 获取顶部的图片轮播数据
        const data=res.result
        this.topImages=data.itemInfo.topImages;
        //2获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3 创建店铺信息的对象
        this.shop=new Shop(data.shopInfo);
        //4 保存商品的详情数据
        this.detailInfo=data.detailInfo;
        //5 获取参数的信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
        if (data.rate.cRate!==0){
          this.commentInfo=data.rate.list[0];
        }
        /*
        //nextTick()这个函数是等到节点渲染完之后,再做操作
        this.$nextTick(() =>{
          this.themeTopYs.push(0);
          //---------这个地方为什么要加$el-------------------
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          console.log(this.themeTopYs);
        })
        */
      })
      //6 取出评论信息
   getRecommend().then(res =>{

     this.recommends=res.data.list;
   })
      },
    mounted() {
     /* this.ItemImgListener= () =>{
        this.$refs.scroll.refresh()
      }
      this.$bus.$on('itemImgLoad',this.ItemImgListener)*/
     //采用minx方法抽取
      //获取评论 参数 详情  推荐的y值

    },
    updated() {
      /* this.themeTopYs=[];
    his.themeTopYs.push(0);
     //---------这个地方为什么要加$el-------------------
     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
     console.log(this.themeTopYs);*/
    },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.ItemImgListener)
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
        this.themeTopYs=[];
        this.themeTopYs.push(0);
        //---------这个地方为什么要加$el-------------------
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);


      },
      titleClick(index){

        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100);
      },
      contentScroll(position){
        const positonY=-position.y
        //2 postionY和主题中的值进行对比
          let length=this.themeTopYs.length;
        for(let i=0;i<length;i++){
          //这个地方的i为字符型,所以要转换 i+1=11 12 13
          /*if(positonY>this.themeTopYs[i]&&positonY<this.themeTopYs[i+1]){
          }*/
          //联动效果的事项
          if(this.currentIndex!==i &&((i<length-1&&positonY>=this.themeTopYs[i]&&positonY<this.themeTopYs[i+1])
            ||(i===length-1&&positonY>=this.themeTopYs[i]))){
            this.currentIndex=i;
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex=this.currentIndex;
          }

        }

      },
      addToCart(){
        //1 获取购物车展示的信息
        const product={};
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        //2 将商品添加到购物车中
        this.$store.commit('addCart',product)
      }
    }
  }
</script>

<style scoped>
 #detail {
   position: relative;
   z-index:99;/*此处源程序是9,但是可能在哪个地方设置过了,所以该为99*/
   background: #ffffff;
   height: 100vh;
 }
 .detail-nav {
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
  .content {
    height: calc(100% - 44px);
  }
</style>
