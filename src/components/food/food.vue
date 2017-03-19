<template>
  <div class="food" v-show="showFlag" transition="move">

  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>
