<template>
  <div>
    <p v-if="$route.params.userName">{{$route.params.userName}}</p>
    <p v-if="$route.query.userName">{{$route.query.userName}}</p>
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
