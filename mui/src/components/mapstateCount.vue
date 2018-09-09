<template>
  <div>
    <h2>{{msg}}</h2>
    <hr/>
    <h3>{{$store.state.count}}</h3>
    <p>computed:{{count}}</p>
    <button @click="$store.commit('add',10)">+</button>
    <button @click="$store.commit('reduce')">-</button>

    <div>
      <button  @click="add(10)">+</button>
      <button  @click="reduce">-</button>
    </div>

    <div>
      <button  @click="$store.dispatch('addAction',10)">+</button>
      <button  @click="$store.dispatch('reduceAction')">-</button>
    </div>

    <div>
      <button  @click="addAction(10)">+</button>
      <button  @click="reduceAction">-</button>
    </div>
  </div>
</template>
<script>
  import store from "../vuex/store";
  import {mapState,mapMutations,mapGetters,mapActions } from "vuex"
  export default{
    data(){
      return{
        msg:'Hello Vuex',
      }
    },
//    computed:{
//      count:state=>state.count
//    },
//    computed:mapState({
//      count:state=>state.count
//    }),
    computed:{
      ...mapState(["count"]),
      ...mapGetters(["count"])
    },
    methods:{
      ...mapMutations(["add","reduce"]),
      ...mapActions(["addAction","reduceAction"])
    },
    store
  }
</script>
<style scoped>
</style>
