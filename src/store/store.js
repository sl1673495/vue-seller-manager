import Vue from 'vue'
import Vuex from 'vuex'
import vueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(vueResource);

export default new Vuex.Store({
  state: {
    userinfo: {},
    newOrder: 3,
    storeState: false
  },
  mutations: {
    login (state) {
      Vue.http.get("/static/user.json").then((response) => {
          state.userinfo = response.body;
        },
        (error) => {
          console.log(error);
      })
    },
    addOrder (state) {
      state.newOrder++;
    },
    openStore (state) {
      state.storeState = true;
    },
    closeStore (state) {
      state.storeState = false;
    }
  }
});
