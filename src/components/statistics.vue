<template>
  <div class="control">
    <div class="data-yesterday">
      <div class="title">
        <h1>今日订单概况</h1>
      </div>
      <div class="data-yesterday-body">
        <databar :dataArray="dataArray"></databar>
      </div>
    </div>
    <div class="hotGoods">
      <div class="title">
        <h1>畅销商品统计</h1>
      </div>
      <div class="hotGoods-body">
        <div class="mdui-card" v-for="(good,index) in tableData" v-if="index <= 5">
          <div class="mdui-card-media">
            <img :src="good.image" width="150" height="200"/>
            <div class="mdui-card-media-covered mdui-card-media-covered-transparent">
            </div>
            <div class="mdui-card-primary">
              <div class="mdui-card-primary-title">{{good.name}}</div>
              <div class="mdui-card-primary-subtitle">销量：{{good.sellCount}} 共￥{{good.sellCount * good.price}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="marketing-activity">
      <div class="title">
        <h1>营销中心</h1>
      </div>
      <div class="marketing-activity-body">
        <div class="alert-message">
          <el-alert
            title="正在进行的活动2项"
            type="info"
            :closable="false"
            show-icon>
          </el-alert>
        </div>
        <div class="marketing-activity-table">
          <el-table
            :data="activityData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="type"
              label="活动类型">
            </el-table-column>
            <el-table-column
              prop="name"
              label="活动名称">
            </el-table-column>
            <el-table-column
              prop="starttime"
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="endtime"
              label="结束时间">
            </el-table-column>
            <el-table-column
              prop="ordernum"
              label="活动订单量">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="活动销售额">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import databar from './common/databar'

  export default {
    created: function () {
      this.$http.get('/static/data.json').then(response => {
        // get body data
        let data = response.body;
        this.goodsData = data.goods;
        this.tableData = data.goods[0].foods;
      }, response => {
        // error callback
      });
    },
    data() {
      return {
        allData: [],
        goodsData: [],
        tableData: {},
        activityData: [
          {
            type: '优惠',
            name: '满减',
            starttime: '2017-10-03',
            endtime: '20170-12-04',
            ordernum: '2554',
            amount: '17720'
          }
        ],
        dataArray: [
          {
            name: '销售额',
            data: '￥8756'
          },
          {
            name: '订单数',
            data: 1552
          },
          {
            name: '新增评价',
            data: 56
          },
          {
            name: '新增会员',
            data: 785
          }
        ]
      }
    },
    components: {
      databar
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .title h1{
    font-weight bold
  }
  thead {
    background #f7f7f7
    font-weight 700
  }

  .data-yesterday
    margin 1.5rem 0 0 1.5rem
    border-bottom 1px solid #f8f8f8
    .title
      font-size 0.7rem
  .hotGoods
    margin 1.5rem 0 0 1.5rem
    border-bottom 1px solid #f8f8f8
    .title
      font-size 0.7rem
    .hotGoods-body
      margin 1rem 1.5rem 1.5rem 0
      white-space nowrap
      overflow-x auto
      .mdui-card
        position relative
        display inline-block
        width 12rem
        height 15rem
        margin 0 0 1rem 2rem
        font-size 0
        .mdui-card-primary
          padding-top 0.5rem
          text-align center
          .mdui-card-primary-title
            font-size 0.8rem
            font-weight 700

  .marketing-activity
    margin 1.5rem 0 0 1.5rem
    border-bottom 1px solid #f8f8f8
    .title
      font-size 0.7rem
    .marketing-activity-body
      margin 1rem 1.5rem 1.5rem 0
      .el-alert--info
        background #f2f6fc
        border 1px solid #dfeaf9
        .el-alert__icon
          color #5491de
      .marketing-activity-table
        margin-top 1rem
</style>
