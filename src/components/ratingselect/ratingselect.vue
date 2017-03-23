<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="choose(2, $event)" class="block positive"
            :class="{'active':selectType === 2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span @click="choose(0, $event)" class="block positive"
            :class="{'active':selectType === 0}">{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span @click="choose(1, $event)" class="block negative"
            :class="{'active':selectType === 1}">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // POSITIVE积极的评价; NEGATIVE负面评价
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      choose (type, event) {
        if (!event._constructed) {
          return
        }
        // this.selectType = type
        // vue1.0 $dispatch子组件告诉父组件selectType变化了
        this.$emit('choose', type)
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        // this.onlyContent = !this.onlyContent
        this.$emit('toggle')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixin"

  .ratingselect
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        font-size 12px
        line-height 16px
        color rgb(77, 85, 93)
        .count
          margin-left 2px
          font-size 8px
        &.active
          color #fff
        &.positive
          background rgba(0, 160, 220, 0.2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, 0.2)
          &.active
            background rgb(77, 85, 93)
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      color rgb(147, 153, 159)
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px



</style>
