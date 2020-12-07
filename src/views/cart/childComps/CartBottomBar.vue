<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="caculate">
      去计算:({{checkLength}})
    </div>
  </div>

</template>

<script>

  import CheckButton from "components/content/checkButton/CheckButton";
    export default {
        name: "CartBottomBar",
      components: {CheckButton},
      computed:{
        totalPrice(){
            return "$"+ this.$store.state.cartList.filter(item =>{
              return item.checked
            }).reduce((preValue,item) =>{
               return preValue+ item.price*item.count
            },0).toFixed(2)
          },
        checkLength(){
           return this.$store.state.cartList.filter( item  =>{
             return item.checked
           }).length
        }
      }
    }
</script>

<style scoped>
 .bottom-bar {
   position: fixed;
   height: 40px;
   background-color: #eee;
   bottom: 40px;
   border-radius: 40px;
   display: flex;
   /*line-height: 40px;*/
 }
 .check-content{
   display: flex;
  align-items: center;
   width: 60px;
 }
  .check-button {
    width: 20px;
    height: 20px;
  }
  .price {
    margin-left: 20px;
    flex:1;
    width:120px;
    margin-left: 50px;
    line-height: 40px;
  }
.caculate {
  flex:1;
  width:190px;
  background:red;
  color: #fff;
  text-align: center;
}
</style>
