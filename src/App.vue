<template>
  <div id="app">
    <navmenu></navmenu>
    <sidemenu :newOrder="newOrder"></sidemenu>
    <div class="mainContent">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import navmenu from './components/navMenu'
  import sidemenu from './components/sideMenu'

  export default {
    name: 'app',
    data() {
      return {
        allData: []
      }
    },
    created: function () {
      setInterval(this.addOne, 10000);
    },
//    created: function () {
//      this.$http.post("http://localhost:8888/manage/listUser", {
//        limit: 15,
//        offset: 0
//      }, {emulateJSON: true}).then((response) => {
//          console.log(response);
//        },
//        (error) => {
//          console.log(error);
//        }
//      );
//    },
    watch: {
      newOrder: {
        handler(val) {
          if (location.href.indexOf('order') > 0) {
            this.$store.state.newOrder = 0;
          }
          if (val === 0) {
            return;
          }
          this.$message({
            message: '您有新订单了，快去查看吧！',
            type: 'success',
            customClass: 'info',
            iconClass: 'el-icon-info'
          });
          var audio = new Audio("/static/new.mp3");
          audio.play();
        }
      }
    },
    methods: {
      addOne() {
        if (this.$store.state.storeState) {
          this.$store.commit('addOrder');
        }
      }
    },
    computed: {
      newOrder() {
        return this.$store.state.newOrder;
      }
    },
    components: {
      navmenu,
      sidemenu
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">

  #app
    height: 100%
    .mainContent
      padding: 3rem 0 0 7.5rem

  .info
    background: #f2f6fc
    color: #878d99
    .el-icon-info
      color: #5491de!important
      margin-right: 0.5rem

</style>
