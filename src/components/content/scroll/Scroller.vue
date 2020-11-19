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
          this.scroll && this.scroll.scrollTo(x,y,time)
         },
        pullingUp(){
          this.scroll && this.scroll.pullUpLoad()
        },
        finishPullUp(){
          this.scroll&& this.scroll.finishPullUp();
        }
        ,
        refresh(){
          this.scroll && this.scroll.refresh();
        }
      },
      mounted() {
       /*主要是为了加载白图片显示出来采用了一个异步函数的方法来使用的,后来采用了
       * 每加载一张图片,就刷新一次的方法,可行,但是问题用来了,刷新太频繁了.
       * 采用防抖函数的方法来解决 好像@click.enter 有这个方法*/
       /* setTimeout(() =>{*/
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
      /*    },500)*/

        },


    }
</script>

<style scoped>

</style>
