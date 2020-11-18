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
        },
        pullUpLoad:{
          type:Boolean,
          default: false
        }
      },
      methods:{
         scrollTo(x,y,time=300){
           this.scroll.scrollTo(x,y,time)
         },
        pullingUp(){
           this.scroll.pullUpLoad()
        },
        finishPullUp(){
           this.scroll.finishPullUp();
        }
      },
      mounted() {
       /*主要是为了加载白图片显示出来*/
        setTimeout(() =>{
          this.scroll=new BetterScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad,
            click:true,
          })
            this.scroll.on('scroll',(position) =>{
              this.$emit("scroll",position)
            })
           this.scroll.on('pullingUp',() =>{
             /*console.log('the pullingUp is commit ');*/
             this.$emit("pullingUp")
           })
          this.scroll.refresh();
          },500)

        },


    }
</script>

<style scoped>

</style>
