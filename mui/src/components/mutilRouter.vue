<template>
  <div class="hello">
    <P>{{msg}}</P>
    <button @click="forward">前进</button>
    <router-view name="left"/>
    <router-view />
    <router-view name="right"/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'mutilRouter'
    }
  },
  methods:{
    forward(){
      console.log("jiang");
      this.$router.go(1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
