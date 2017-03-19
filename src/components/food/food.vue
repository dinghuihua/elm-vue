<template>
  <div class="food" v-show="showFlag" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span>好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click.stop.prevent="addToCartFirst($event)" class="buy-button"
             v-show="!food.count || food.count === 0"
             transition="fade">加入购物车</div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <div class="title">商品信息</div>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="food-ratings">
        <h1 class="title">商品评价</h1>
        <ratingselect :ratings="food.ratings" :select-type="selectType"
        :only-content="onlyContent" :desc="desc"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">
                {{rating.rateTime}}
              </div>
              <div class="text">
                <span :class="{'icon-thumb_up': rating.rateType === 0 ,
                'icon-thumb_down':rating.rateType === 1 }"></span>{{rating.text}}
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
            暂无评价
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'

  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true
        // selectType/onlyContent始终保持初始化状态,不受其他引用的影响
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addToCartFirst (event) {
        if (!event._constructed) {
          return
        }
        this.$dispatch('cart.add', event.target)
        Vue.set(this.food, 'count', 1)
      },
      needShow (type, text) {
        // 只显示有内容的评价 && 评价内容为空
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          // 只有当前评价的类型 === 选择的类型,才返回true
          return type === this.selectType
        }
      }
    },
    events: {
      'ratingtype.choose' (type) {
        this.selectType = type
        // $nextTick触发之后, dom才会更新
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      'content.toggle' (onlyContent) {
        this.onlyContent = onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixin"

  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background-color #fff
    &.move-transition
      transition all 0.3s linear
      transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      transform translate3d(100%, 0, 0)
    .image-header
      position relative
      width 100%
      height 0
      /* padding的100%会相对与盒子去计算 */
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      position relative
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        height 10px
        line-height 10px
        font-size 10px
        color rgb(147, 153, 159)
        .sell-count
          padding-right 12px
      .price
        line-height 24px
        font-weight 700
        .now
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy-button
        position absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        box-sizing border-box
        border-radius 12px
        font-size 10px
        color #fff
        background-color rgb(0, 160, 220)
        &.fade-transition
          transition all 0.2s
          opacity 1
        &.fade-enter, &.fade-leave
          transition all 0.2s
          opacity 0

    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(7, 17, 27)
      .text
        padding 0 8px
        line-height 24px
        font-size 12px
        color rgb(77, 85, 93)
    .food-ratings
      padding-top 18px
      .title
        line-height 14px
        margin-left 18px
        font-size 14px
        color rgb(7, 17, 27)
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position absolute
            right 0
            top 16px
            line-height 12px
            font-size 0
            .name
              display inline-block
              vertical-align top
              margin-right 6px
              font-size 10px
              color rgb(1, 17, 27)
            .avatar
              border-radius 50%
          .time
            margin-bottom 6px
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          .text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right 4px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .icon-thumb_down
              color rgb(147, 153, 159)
        .no-rating
          padding 16px 0
          font-size 12px
          color rgb(147, 153, 159)
          text-align center
</style>
