<template>
    <div class="wrapper" ref="wrapper">
      <div class="content" >
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import  BetterScroll from 'better-scroll';
  import PullUp from '@better-scroll/pull-up'
  BetterScroll.use(PullUp)
    export default {
        name: "Scroller",
      data() {
        return {
          scroll: null,
        }
      },
      props: {
        probeType: {
          type: Number,
          default: 0
        }
      },
      methods:{
         scrollTo(x,y,time=300){
           this.scroll.scrollTo(x,y,time)
         }
      },
      mounted() {
       /*主要是为了加载白图片显示出来*/
        setTimeout(() =>{
          this.scroll=new BetterScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            pullUpLoad: true,
            click:true,
          })
            this.scroll.on('scroll',(position) =>{
              this.$emit("scroll",position)
            })
           /*this.scroll.on('pullingUp',() =>{
             console.log('the pullingUp is commit ');
           })*/
          },500)

        },


    }
</script>

<style scoped>

</style>
