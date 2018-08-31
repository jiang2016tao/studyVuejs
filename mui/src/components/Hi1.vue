<template>
  <div>
    <div>{{msg}}</div>
    <p>{{$route.params.userName}}</p>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        msg:"this is hi1 page"
      }
    }
  }
</script>
<style scoped>
</style>
