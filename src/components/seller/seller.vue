<template>
  <div class="seller" v-el:seller>
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
        <div class="wish-wrapper" @click="toggleFavorite">
          <i class="icon-favorite" :class="{'active': favorited}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="bulletin-list">
          <li class="bulletin-item border-1px" v-for="item in seller.supports">
            <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
            <span class="text">{{seller.supports[$index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" v-el:pic-wrapper>
          <ul class="pic-list" v-el:pic-list>
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <div class="title border-1px">商家信息</div>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {saveToLocal, loadFromLocal} from '../../assets/js/store'
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
        favorited: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText () {
        return this.favorited ? '已收藏' : '收藏'
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    watch: {
      // 观测 seller的变化 刚开始刷新页面的时候才会改变,组件间切换时不会改变
      'seller' () {
        this._initScroll()
        this._initPics()
      }
    },
    ready () {
      // dom 完全渲染完才会调用此钩子 它的执行优先于watch
      this._initScroll()
      this._initPics()
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.seller, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _initPics () {
        // 手动设置图片容器的宽度, 它实际宽度大于它父容器的宽度时, BScroll才可以滚动
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$els.picList.style.width = width + 'px'
          this.$nextTick(() => {
            // 组件切换时 refresh 让它生效
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$els.picWrapper, {
                // 横向滚动
                scrollX: true,
                // 当它横向滚动的时候,忽略垂直方向的滚动
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      },
      toggleFavorite (event) {
        console.log(this.seller.id)
        if (!event._constructed) {
          return
        }
        this.favorited = !this.favorited
        saveToLocal(this.seller.id, 'favorite', this.favorited)
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
          color #d4d6d9
          &.active
            color rgb(240, 20, 20)
        .text
          display block
          line-height 10px
          text-align center
          font-size 10px
          color rgb(77, 85, 93)
    .bulletin
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .content-wrapper
        padding 0 12px 16px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          font-size 12px
          line-height 24px
          color rgb(240, 20, 20)
      .bulletin-list
        .bulletin-item
          padding 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 0
          &:last-child
            border-none()
          .icon
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            line-height 16px
            vertical-align top
            font-size 12px
            color rgb(7, 17, 27)
    .pics
      padding 18px
      .title
        margin-bottom 12px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
          &:last-child
            margin-right 0
    .infos
      padding 18px 18px 0
      .title
        padding-bottom 12px
        line-height 14px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 14px
        color rgb(7, 17, 27)
      .info-item
        padding 16px 12px
        line-height 16px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
        color rgb(7, 17, 27)
        &:last-item
          border-none()
</style>
