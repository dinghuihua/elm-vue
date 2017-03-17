<template>
	<div class="header">
		<div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail()">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-arrow_right arrow-right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!--浮层-->
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <!--实际内容-->
        <div class="detail-main">
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close" @click="showDetail()">
        <i class="icon-close"></i>
      </div>
    </div>
	</div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = !this.detailShow
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixin"

  .header
    position relative
    overflow hidden
    color #fff
    background rgba(7, 17, 27, 0.5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px 0 8px
          font-size 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            font-size 16px
            font-weight bold
            line-height 18px
            margin-left 6px
        .description
          margin-bottom 10px
          font-size 12px
          line-height 12px
        .support
          .icon
            display inline-block
            vertical-align top
            margin-right 4px
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height 12px
            font-size 10px
      .support-count
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0, 0,0, 0.2)
        text-align center
        font-size 10px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size 10px
      background rgba(7, 17, 27, .2)
      .bulletin-icon
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
      .bulletin-text
        vertical-align top
        margin 0 4px
      .arrow-right
        position absolute
        right 12px
        top 8px

    .background
      position absolute
      top 0
      left 0
      height 100%
      width 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      background rgba(7, 17, 27, 0.8)
      .detail-wrapper
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0
        clear both
        font-size 32px
</style>
