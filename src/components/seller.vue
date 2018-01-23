<template>
  <div class="seller">
    <div class="toolBar">
      <el-button type="primary" size="mini">新增</el-button>
      <el-button size="mini">删除</el-button>
    </div>
    <div class="seller-table">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          label="商家图片"
          width="120">
          <template scope="scope"><img :src="scope.row.avatar" width="100" height="100"></template>
        </el-table-column>
        <el-table-column
          label="评分"
          width="120">
          <template scope="scope">
            <star :size="36" :score="scope.row.score"></star>
          </template>
        </el-table-column>
        <el-table-column
          prop="sellCount"
          label="销量"
          width="120">
        </el-table-column>
        <el-table-column
          label="起送价"
          width="120">
          <template scope="scope">
            {{scope.row.minPrice}}元
          </template>
        </el-table-column>
        <el-table-column
          label="配送费"
          width="120">
          <template scope="scope">
            {{scope.row.deliveryPrice}}元
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="120">
        </el-table-column>
        <el-table-column
          prop="infos"
          label="详情"
          width="350">
          <template scope="scope">
            <ul>
              <li v-for="info in scope.row.infos">{{info}}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          label="图片"
          show-overflow-tooltip>
          <template scope="scope">
            <img width="100" height="100" v-for="src in scope.row.pics" :src="src">
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
      data() {
        return {
          loading: true,
          tableData: []
        }
      },
      created: function () {
        this.$http.get('/static/data.json').then(response => {
          // get body data
          let data = response.body;
          let sellers = [];
          sellers.push(data.seller);
          this.tableData = sellers;
          this.loading = false;
        }, response => {
          // error callback
        });
      },
      methods: {
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .seller
    margin 1.5rem 0 0 1.5rem
    .toolBar
      margin-bottom 1rem
</style>
