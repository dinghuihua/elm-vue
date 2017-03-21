<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="name">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="wish-wrapper">
          <i class="icon-favorite" :class="{'active': favorited}" @click="favorite"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="seller-banner"></div>
      <div class="seller-photo"></div>
      <div class="seller-info"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import split from 'components/split/split'

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorited: false,
        favoriteText: '收藏'
      }
    },
    methods: {
      favorite () {
        this.favorited = !this.favorited
        if (this.favorited) {
          this.favoriteText = '已收藏'
        } else {
          this.favoriteText = '收藏'
        }
      }
    },
    components: {
      star,
      split
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixin"

  .seller
    position: absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      position relative
      padding 18px
      .name
        line-height 14px
        margin-bottom 8px
        font-size 14px
        color rgb(7, 17, 27)
      .desc
        padding-bottom 18px
        line-height 18px
        font-size 0
        border-1px(rgba(7, 17, 27, 0.1))
        .star, .text
          display inline-block
          vertical-align top
        .star
          margin-right 8px
        .text
          margin-right 12px
          font-size 10px
          color rgb(77, 85, 93)
    .remark
      padding-top 18px
      display flex
      .block
        flex 1
        text-align center
        border-right 1px solid rgba(7,17,27,0.1)
        &:last-child
          border-right none
        h2
          margin-bottom 4px
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .content
          font-size 10px
          .stress
            line-height 24px
            font-size 24px
            color rgb(7, 17, 27)
    .wish-wrapper
      position absolute
      top 18px
      right 18px
      .icon-favorite
        display block
        min-width 38px
        margin-bottom 4px
        font-size 24px
        line-height 24px
        text-align center
        &.active
          color rgb(240, 20, 20)
      .text
        display block
        line-height 10px
        text-align center
        font-size 10px
        color rgb(77, 85, 93)
</style>
