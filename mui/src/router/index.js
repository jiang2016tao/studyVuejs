import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi1 from "@/components/Hi1"
import Hi1Sub1 from "@/components/Hi1Sub1"
import Hi2 from "@/components/Hi2"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/hi1',
      component: Hi1,
      children:[
        // {path:"/",component:Hi1},
        {path:"sub1",component:Hi1Sub1}
      ]
    },{
      path: '/hi2',
      component: Hi2,
      name:"hi2"
    }
  ]
})
