<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroller class="content" ref="scroll" :pull-up-load="true"
              :probe-type="3">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" />

    </scroller>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import  {getDetail,Goods,Shop,GoodsParam} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroller from "components/content/scroll/Scroller";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";


  export default {
    name: "Detail",
    components: {DetailParamInfo, DetailGoodsInfo, Scroller, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},

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
        console.log(res);
        //2获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3 创建店铺信息的对象
        this.shop=new Shop(data.shopInfo);
        //4 保存商品的详情数据
        this.detailInfo=data.detailInfo;
        //5 获取参数的信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      })
      },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()

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
