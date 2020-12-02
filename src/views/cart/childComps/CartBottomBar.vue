<template>
  <div class="bottom-bar">
<div class="check-content">
    <check-button class="check-button"></check-button>
    <span>全选</span>
</div>
  </div>

</template>

<script>

  import CheckButton from "components/content/checkButton/CheckButton";
    export default {
        name: "CartBottomBar",
      components: {CheckButton}
    }
</script>

<style scoped>
 .bottom-bar {
   height: 40px;
   background-color: red;
   position: relative;
   border-radius: 40px;
   line-height: 40px;
 }
 .check-content{
   display: flex;

 }
  .check-button {
   width: 20px;
    height: 20px;
  }

</style>
