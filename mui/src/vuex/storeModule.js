/**
 * Created by Administrator on 2018/9/9.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={
  count:1
};

const mutations={
  add(state,n){
    state.count+=n;
  },
  reduce(state){
    setTimeout(()=>{
      state.count--;
    },3000);
    console.log('reduce');
  }
}

const getters={
  count:state=>state.count+=100
}

const actions={
  addAction(context,n){
    context.commit("add",n);
  },
  reduceAction({commit}){
    setTimeout(()=>{commit('reduce')},3000);
    console.log('我比reduce提前执行');
  }
}

const moduleA={
  state,
  mutations,
  getters,
  actions};

export default new Vuex.Store({
  modules:{a:moduleA}
});
