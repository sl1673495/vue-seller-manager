<template>
  <div class="select-rider">
    <el-dialog
      title="分配骑手"
      :visible.sync="dialogVisible"
      width="70%">
      <span>
        <rider @distribute="distributed"></rider>
      </span>
      <span slot="footer" class="dialog-footer">
     <div class="footBar">
       <el-button @click="dialogVisible = false">取消</el-button>
     </div>
  </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import rider from '../../components/rider/rider';
  export default {
    data() {
      return {
        dialogVisible: false,
        orderIndex: ''
      };
    },
    methods: {
      showDialog(index) {
        this.dialogVisible = true;
        this.orderIndex = index;
      },
      distributed(name) {
        this.dialogVisible = false;
        let obj = {
          name: name,
          index: this.orderIndex
        };
        this.$emit('distributed',obj);
      }
    },
    components: {
      rider
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footBar {
    text-align center
  }
</style>
