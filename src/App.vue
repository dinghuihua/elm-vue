<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{ path:'/goods' }">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{ path:'/ratings' }">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{ path:'/seller' }">商家</a></div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from 'assets/js/util'
  import header from 'components/header/header.vue'

  const ERR_OK = 0

  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParm = urlParse()
            console.log(queryParm)
            return queryParm.id
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
        response = response.body
        if (response.errno === ERR_OK) {
          /*
           * this.seller = response.data
           * 直接赋值 会导致id被干掉
           * console.log(this.seller.id)  // undefined
           */
          // Object.assign(最终返回结果, ..., ...) 是官网提供的给对象扩展属性的方法
          this.seller = Object.assign({}, this.seller, response.data)
          console.log(this.seller.id)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "assets/stylus/index.styl"
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    //border-bottom 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)

</style>
