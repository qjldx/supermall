<template>
    <div class="tab-bar-item" @click="itemclick">
        <slot v-if="!isActive" name="item-icon"></slot>
        <slot v-else name="item-icon-active"></slot>
        <!--如果不进行这样的设置时，文字的颜色是不会改变的，所以要用一个div来包起来，以后遇到这样的设计时要注意。-->
        <!--<div :class ={active:isActive} >-->
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>

        <div>首页</div>
    </div>
</template>
<script>
    export default {
        name: "TabBarItem",
        props:{
          path:String,
            activeColor:{
              type:String,
                default:'red'
            }
        },
        data(){
            return {
               // isActive:true,
            }
        },
        computed:{
            isActive() {
                return this.$route.path.indexOf(this.path)!==-1
            },
            activeStyle(){
            return this.isActive ? {color:this.activeColor}:{}
            }
        },
        methods:{
            itemclick(){
                this.$router.push(this.path)
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item{
        flex: 1px;
        text-align: center;
        height: 49px;
        font-size:14px;

    }
    .tab-bar-item img{
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align:middle ;
    }
    .active {
      color:red;
    }
</style>