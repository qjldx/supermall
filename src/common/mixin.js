export  const itemListenerMixin= {
  mounted() {
    this.ItemImgListener = () => {
      this.$refs.scroll.refresh()
    };
    this.$bus.$on('itemImgLoad', this.ItemImgListener)
    console.log('我是混入中的内容');
  }
}
