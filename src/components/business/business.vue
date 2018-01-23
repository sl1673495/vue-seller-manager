<template>
  <div class="bussiness">
    <div class="toolBar">
      <div class="datapicker">
        <el-date-picker
          v-model="dataRange"
          size="small"
          type="daterange"
          align="right"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-button size="mini" type="primary">搜索</el-button>
      </div>
      <div class="dataStatistics">
        <databar :dataArray="dataArray"></databar>
      </div>
      <div class="charts">
        <div ref="businessChart" class="charts-item"></div>
      </div>
      <div class="bussinessTable">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="交易额">
          </el-table-column>
          <el-table-column
            prop="count"
            label="订单数">
          </el-table-column>
          <el-table-column
            prop="average"
            label="平均单价">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import databar from '../common/databar'
  import echarts from 'echarts'

  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dataRange: '',
        dataArray: [
          {
            name: '交易额',
            data: '￥18875'
          },
          {
            name: '订单数',
            data: 1099
          },
          {
            name: '平均单价',
            data: "￥18.98"
          },
          {
            name: '订单完成率',
            data: "98%"
          },
          {
            name: '订单满意率',
            data: "88%"
          }
        ],
        chart: null,
        tableData: []
      };
    },
    mounted() {
      this.requestData();
      this.initChart();
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.businessChart);
        this.chart.setOption({
          title: {
            text: '生意趋势',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['销售额','订单数']
          },
          toolbox: {
            show: true,
            feature: {
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name:'销售额',
              type:'line',
              data:[1134, 1572, 2551, 3323, 1982, 2761, 3394],
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'订单数',
              type:'line',
              data:[251, 221, 353, 162, 331, 553, 251],
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        })
      },
      requestData() {
        this.$http.get('/static/bussiness.json').then(response => {
        // get body data
        let data = response.body;
        this.tableData = data.reverse();
        }, response => {
          // error callback
        })
      }
    },
    components: {
      databar
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .bussiness
    margin 1.5rem 0 0 1.5rem
    .charts
      margin 0 1.5rem 0 1.5rem
      .charts-item
        width 100%
        height 20rem
    .bussinessTable
      margin 0 1.5rem 0 1.5rem
</style>
