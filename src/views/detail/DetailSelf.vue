<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import  {getDetail,Goods,Shop} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";

  export default {
    name: "Detail",
    components: {DetailBaseInfo, DetailSwiper, DetailNavBar},
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
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
      })
      }
  }
</script>

<style scoped>

</style>
