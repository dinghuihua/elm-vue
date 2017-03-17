<template>
  <div class="goods">
    <div class="menu-wrapper">
      <div></div>
    </div>
    <div class="foods-wrapper">
      <ul></ul>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    seller: {
      type: Object
    },
    goods: {
      type: Object
    }
  },
  created () {
    this.$http.get('/api/goods').then(response => {
      this.response = response.body
      this.seller = response.seller
      this.goods = response.goods
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
    .foods-wrapper
      background #ccc

</style>
