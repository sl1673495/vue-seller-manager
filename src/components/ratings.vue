<template>
  <div class="comment">
    <div class="rating-table">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          label="头像"
          width="180">
          <template scope="scope">
            <img :src="scope.row.avatar" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column
          prop="text"
          label="评论内容"
          width="300">
        </el-table-column>
        <el-table-column
          label="评价时间">
          <template scope="scope">
            2017-10-03
          </template>
        </el-table-column>
        <el-table-column
          label="评分">
          <template scope="scope">
            <star :size="36" :score="scope.row.score"></star>
          </template>
        </el-table-column>
        <el-table-column
          label="推荐">
          <template scope="scope">
            <el-tag class="recommend-tag" v-for="recommend in scope.row.recommend" type="danger">{{recommend}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="limit"
        layout="total, prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import '../assets/base'
  export default {
    created: function () {
      this.$http.get('/static/data.json').then(response => {
        // get body data
        let data = response.body;
        this.totalData = data.ratings;
        this.tableData = data.ratings.slice(0,9);
        this.totalCount = data.ratings.length;
        this.loading = false;
      }, response => {
        // error callback
      });
    },
    data() {
      return {
        loading: true,
        totalData: [],
        tableData: [],
        currentPage: 1,
        totalCount: 0,
        limit: 10
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let pageStart = (val-1) * this.limit;
        this.tableData = this.totalData.slice(pageStart,pageStart + this.limit);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recommend-tag{
    margin 0 0 0.5rem 0.5rem
  }
  .rating-table
    margin 1.5rem 1.5rem 0 1.5rem

  .page
    margin 1rem 0 0 1rem
    text-align center
</style>
