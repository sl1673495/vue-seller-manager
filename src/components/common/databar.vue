<template>
  <div class="databar">
    <div class="item" v-for="item in dataArray">
      <div class="item-data">
        {{item.data}}
      </div>
      <div class="item-name">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      dataArray: {
        type: Array
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .databar
    display flex
    margin 1rem 1.5rem 1.5rem 0;
    background #f7f7f7
    height 6rem
    .item
      flex 1
      text-align center
      .item-data
        font-weight 700
        font-size 1.3rem
        color #5491de
        margin-top 1.5rem
      .item-name
        font-size 0.7rem
        margin-top 1rem
</style>
