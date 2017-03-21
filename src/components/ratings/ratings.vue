<template>
  <div class="ratings" v-el:rating>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item border-1px">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h2 class="name">{{ratings.username}}</h2>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend-wrapper">
                <i :class="{'icon-thumb_up': rating.rateType === 0 ,
                'icon-thumb_down':rating.rateType === 1 }"></i>
                <span class="recommend-item" v-for="item in rating.recommend" v-show="rating.recommend && rating.recommend.length">
                  {{item}}
                </span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {formatDate} from 'assets/js/date'
  import star from 'components/star/star'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'

  const ALL = 2
  const ERR_OK = 0

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    created () {
      this.$http.get('/api/ratings').then(response => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          // 数据变了, 但dom没有立即更新,会导致BScroll计算不正确, 所以应该调用$nextTick, dom更新ok后再使用BScroll
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$els.rating, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      })
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    methods: {
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixin"

  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        width 137px
        padding 6px 0
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        @media only screen and (max-width 320px)
          flex 0 0 120px
          width 120px
        .score
          line-height 28px
          margin-bottom 6px
          font-size 24px
          color rgb(255, 193, 0)
        .title
          line-height 12px
          margin-bottom 8px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        line-height 18px
        @media only screen and (max-width 320px)
          padding-left 6px
        .title
          display inline-block
          font-size 12px
          color rgb(7, 17, 27)
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .star
            display inline-block
            margin 0 12px
            vertical-align top
          .score
            line-height 18px
            font-size 12px
            color rgb(255, 193, 0)
        .delivery-wrapper
          font-size 0
          .delivery
            margin-left 12px
            font-size 12px
            color rgb(147, 153, 159)


    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, .1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          flex 1
          position relative
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 6px
            .delivery
              display inline-block
              vertical-align top
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
          .text
            line-height 18px
            margin-bottom 8px
            font-size 12px
            color rgb(7, 17, 27)
          .recommend-wrapper
            font-size 0
            .icon-thumb_up, .icon-thumb_down
              display inline-block
              margin-right 8px
              font-size 12px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .icon-thumb_down
              color rgb(183, 187, 191)
            .recommend-item
              display inline-block
              padding 0 6px
              margin-right 8px
              margin-bottom 4px
              line-height 16px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              font-size 9px
              color rgb(147, 153, 159)
              background-color #fff
          .time
            position absolute
            top 0
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)


</style>
