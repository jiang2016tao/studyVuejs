<template>
  <div>
    <p v-if="$route.params.userName">{{$route.params.userName}}</p>
    <p v-if="$route.query.userName">{{$route.query.userName}}</p>
    <div>
      <button @click="goBack">后退</button>
      <button @click="forward">前进</button>
      <button @click="goHome">回首页</button>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        msg:"this is hi1 page"
      }
    },
    beforeRouteLeave(to,from,next){
      console.log("离开");
      console.log(to);
      console.log(from);
      next();
    },
    beforeRouteEnter(to,from,next){
      console.log("进入");
      console.log(to);
      console.log(from);
      next();
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      forward(){
        console.log("jiang");
        this.$router.go(1);
      },
      goHome(){
        this.$router.push("/")
      }
    }
  }
</script>
<style scoped>
</style>
