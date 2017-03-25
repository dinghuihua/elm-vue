<template>
  <div class="main-wrapper">
    <header>
      <div class="addr">
        <span class="icon icon-addr"></span>
        <span>北京市通州区物资学院路</span>
      </div>
      <div class="user">
        <span class="icon icon-user"></span>
        <a href="#">个人中心</a>
      </div>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        banners: []
      }
    },
    created () {
      this.$http.get('/banners').then(res => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.banners = res.data
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .main-wrapper
    header
      position fixed
      top 0
      left 0
      height 30px
      display flex
      .addr
        flex 1
      .user
        flex 0 0 100px
        width 100px

</style>
