<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/">home</router-link> |
    <router-link to="/hi1">hi1</router-link> |
    <router-link to="/hi1/sub1">hiSub1</router-link> |
    <router-link :to="{name:'hi2',params:{userName:'jiang'}}">hi2_param</router-link> |
    <router-link :to="{path:'/hi2?userName=jiangPath'}">hi2_param_path</router-link> |
    <router-link to="/mutilRouter">mutilRouter</router-link> |
    <router-link to="/mutilRouter/san">mutilRouter</router-link> |
    <router-link to="/hi3/zhangsan/12345">Hi3_url_param</router-link> |
    <router-link to="/home">Home</router-link> |
    <router-link to="/goHi3/蒋介石/111111">GO_HI3</router-link>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
