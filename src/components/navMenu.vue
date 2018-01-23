<template>
  <div class="nav-menu">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <!--<el-menu-item index="1"><router-link to="/">处理中心</router-link></el-menu-item>-->
      <li class="user-info">
        <div class="user-headimage">
          <img :src="userinfo.avatar" width="100%" height="100%">
        </div>
        <div class="username">
          <span>欢迎您，{{userinfo.name}}</span>
        </div>
        <div class="state-wrapper">
          <a class="state" style="color:#42b983" v-if="storeState" @click="changeState"><i class="fa fa-exchange"></i>正在营业中</a>
          <a class="state" v-else  @click="changeState"><i class="fa fa-exchange"></i>店铺休息中</a>
        </div>
        <div class="user-menu-item">
          <a>个人中心</a>
        </div>
        <div class="user-menu-item">
          <a>注销</a>
        </div>
      </li>
    </el-menu>
    <div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        activeIndex: ''
      };
    },
    mounted() {
      this.$store.commit('login');
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      changeState() {
        if (this.storeState){
          this.$confirm('确定要打烊吗?').then(() => {
            this.$store.commit('closeStore');
            this.$notify({
              title: '提示',
              message: '店铺已经打烊，将不能接收新订单',
              type: 'warning',
              offset: 50
            });
          })
        }else {
          this.$confirm('确定要营业吗?').then(() => {
            this.$store.commit('openStore');
            this.$notify({
              title: '提示',
              message: '店铺正在营业中',
              type: 'success',
              offset: 50
            });
          })
        }
      }
    },
    computed: {
      userinfo() {
        return this.$store.state.userinfo;
      },
      storeState() {
        return this.$store.state.storeState;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .nav-menu
    position: fixed
    width: 100%
    padding-left: 7.5rem
    height: 3rem
    top: 0
    z-index: 520
    border-bottom 1px solid #f7f7f7
    a
      display block
    .user-info
      float right
      margin-right 10rem
      line-height 3rem
      outline none
      font-size 0
      .user-headimage
        display inline-block
        vertical-align top
        height:2.5rem
        width 2.5rem
        border-radius 50%
        img
          border-radius 50%
      .username
        display inline-block
        vertical-align top
        font-size 0.8rem
        color: #7e8c8d
      .state-wrapper
        display inline-block
        vertical-align top
        margin-left 1rem
        .state
          font-size 0.8rem
          color: #7e8c8d
          .fa
            font-size 0.7rem
            vertical-align: text-top;
            margin-left 0.2rem
      .user-menu-item
        display inline-block
        vertical-align top
        margin-left 1rem
        font-size 0.8rem
        color: #7e8c8d
    .el-menu
      height: 3rem

</style>
