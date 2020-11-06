<template>
<div class="slide">
  <slot></slot>

</div>
</template>

<script>
    export default {
        //name: "SwiperItem"
        name: "Slide"
    }
</script>

<style scoped>
.slide {
  width:100px;
  flex-shrink: 0;
}
  .slide img {
    width:100px;
  }
</style>
