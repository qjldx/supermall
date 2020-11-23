<template>
  <!--检查goods对象是不是为空-->
    <div v-if="Object.keys(goods).length !==0" class="base-info">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
        <span >{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-service">
        <span class="info-service-item" v-for="index in goods.services.length-1"
              :key="index">
          <img :src="goods.services[index-1].icon">
          <span>{{goods.services[index-1].name}}</span>
        </span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
      props:{
          goods:{
            type:Object,
            default:null
          }
      }
    }
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding:0 8px;
  color:#999;
  border-bottom: 5px solid #f3f5f8;

}
  .info-title {
    color:#222;
    font-size: 14px;
  }
  .info-price {
    margin-top:10px;

  }
  .info-other{
    font-size:12px;
  }
  .info-service-item {
    font-size: 12px;
  }
  .info-service-item img{
    width:20px;
    margin-left: 10px;
    margin-right: 5px;
    margin-top: 12px;
  }
  .info-price .n-price {
    font-size:12px;
    color:var(--color-high-text);
  }
  .info-price .o-price {
    font-size: 10px;
    margin-left: 5px;
    text-decoration: line-through;
  }
</style>
