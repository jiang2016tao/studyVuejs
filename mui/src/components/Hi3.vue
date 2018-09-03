<template>
  <div>
    <div>{{msg}}</div>
    <div>{{$route.params.name}}</div>
    <div>{{$route.params.id}}</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        msg:"this is hi3 page"
      }
    }
  }
</script>
<style scoped>
</style>
