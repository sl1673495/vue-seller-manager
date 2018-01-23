<template>
  <div class="rider">
    <div class="toolBar">
      <el-input
        size="small"
        placeholder="输入骑手名查找"
        prefix-icon="el-icon-search"
        auto-complete="off"
        v-model.trim="searchText">
      </el-input>
      <transition name="fade">
        <el-button v-show="searchText.length > 0" size="mini">搜索</el-button>
      </transition>
    </div>
    <div class="rider-table">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        ref="multipleTable"
        :data="tableData"
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="骑手姓名">
        </el-table-column>
        <el-table-column
          label="头像">
          <template scope="scope"><img width="50" height="50" style="border-radius: 50%" :src="scope.row.avatar"></template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
          <template scope="scope">
            <el-tag type="success" v-if="scope.row.state === 'free'">空闲中</el-tag>
            <el-tag type="danger" v-if="scope.row.state === 'busy'">忙碌中</el-tag>
            <el-tag type="info" v-if="scope.row.state === 'off'">未就绪</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="applauseRate"
          label="好评率">
        </el-table-column>
        <el-table-column
          prop="nowOrder"
          label="进行中订单"
          width="200"
          show-overflow-tooltip>
          <template scope="scope">
            {{(scope.row.nowOrder).join('、')}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="distribute(scope.$index, scope.row)">分配
            </el-button>
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
        tableData: [],
        multipleSelection: [],
        searchText: ''
      }
    },
    created() {
      this.$http.get('/static/rider.json').then(response => {
        // get body data
        let data = response.body.rider;
        console.log(data);
        this.tableData = data;
        this.loading = false;
      }, response => {
        this.$message.error("加载失败");
      });
    },
    methods: {
      distribute(index,row) {
        this.$confirm(`确定分配给${row.name}？`).then(() => {
          this.$emit('distribute',row.name);
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-dialog__body{
    padding-top 0
  }

  .rider
    .toolBar
      margin-bottom 1rem
</style>
