<template>
    <div class="cart-list">
      <scroller class="content" ref="scroll" :pull-up-load="true"
               >
      <cart-list-item
        v-for="(item, index) in cartList"
        :item-info="item" :key="index">
        </cart-list-item>
      </scroller>
    </div>
</template>

<script>
  import Scroller  from "components/content/scroll/Scroller";
  import CartListItem from "./CartListItem";
  import  {mapGetters} from "vuex"

    export default {
        name: "CartList",
      components: {CartListItem, Scroller},
      computed:{
          ...mapGetters(['cartList'])
      },
      activated() {
        console.log("actived is run ");
        this.$refs.scroll.refresh();

      }
    }
</script>

<style scoped>
  .cart-list {
    height:calc(100% - 44px - 49px - 40px);
  }
  .content {
    height:calc(100%- 44px);
    overflow: hidden;
  }
</style>
