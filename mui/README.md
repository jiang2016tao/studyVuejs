# mui

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).  
# vue-cli配置解读  
## DefinePlugin  
DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。  
```js
new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
```
[DefinePlugin](https://webpack.docschina.org/plugins/define-plugin/)  

# Vue-router  
## 路由基本配置  
- 在routers数组中添加路由配置。  
- 使用router-link作为导向链接  
*注意在配置路由时必需要以/开始*  
```js
routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/hi1',
      name: 'HelloWorld',
      component: Hi1
    }
  ]
```
如果不以/开始，就不会正确的跳转.  
```html
<router-link to="/">home</router-link> | <router-link to="hi1">hi1</router-link>
```
路由跳转，对应的组件会在<router-view/>里展示。  
## 子路由配置  
在 route.js 的配置中，要显示子视图与子路由的对应。利用 children 数组属性就可以定义子路由了.   
```js
routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/hi1',
      name: 'HelloWorld',
      component: Hi1,
      children:[
        // {path:"/",component:Hi1},
        {path:"/sub1",component:Hi1Sub1}
      ]
    }
  ]
```
上面这样的配置，在点击链接http://localhost:8080/#/hi1/sub1 可以发现路由里的组件根本就没有显示出来。那是因为  
>子路由中的路径就不需要加上"/"了，生成时主路由的 path 会被自动添加到自路由前。另外，以"/"开头会被当做根路径，就不要加"/"了。  

*注意下面问题*  
如上面子路由的配置，发现多次点击同一个子路由就会出现问题。第一次点击,url地址为：http://localhost:8080/#/hi1/sub1， 第二次点击，url的地址就变为了：http://localhost:8080/#/hi1/hi1/sub1
很奇怪，每点击一次，url连接都会加一次/hi1这样。  
对于上面的问题，摸索之后发现问题所在了。  
```html
<router-link to="/">home</router-link> | <router-link to="hi1">hi1</router-link> | <router-link to="hi1/sub1">hiSub1</router-link>
```
这是问题的代码，可以看到我们并没有在前面加上'/'。这就是导致上面出现bug的原因。我们加上'/'就可以了。  
>以后注意在htm里路由一定要加上‘/’,但是在js里配置路由，子路由就一定不能加了。  

正确的配置子路径应该如下：  
```js
{
      path: '/hi1',
      name: 'HelloWorld',
      component: Hi1,
      children:[
        {path:"sub1",component:Hi1Sub1}
      ]
    }
```
但是作为顶级的路径配置，还是要加上/的。如：  
```js
routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/hi1',
      name: 'HelloWorld',
      component: Hi1,
      children:[
        // {path:"/",component:Hi1},
        {path:"sub1",component:Hi1Sub1}
      ]
    }
  ]
```
这里的path: '/hi1',如果不加上/。那么路径的页面都会不出来的.  
## 路由传参  
### 通过name传参  
在配置路由的时候，添加name属性   
```js
{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
```  
在模板里用$route.name接收  
```html
<h2>{{$route.name}}</h2>
```
### 通过标签的to传参  
通过上面的方法传参，比较单一，对于多个参数不是很灵活，同时我们在路由的配置中name还有其他的用处。*个人觉得这里的name设计并不是用来作为参数的传递的，建议不要这样使用来传参*  
-   
```html
<router-link :to="{name:'hi2',params:{userName:'jiang'}}">hi2_param</router-link>
```
上面是to的一种传参的语法。注意to里面的解构  
>- name：就是我们在路由配置文件中起的name值。  
>>看这里就体现了路由配置里name的作用了。  
>- params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。  
```js
{
      path: '/hi2',
      component: Hi2,
      name:"hi2"
    }
```
上面是路由的配置，这里如果不配置name，那么连接是不会跳转的。router-link的to里面的name必需要和路由里面的name一致，这样才能保证正确的连接跳转。   
在模板通过{{$route.params.userName}}接收参数  
```html
<p>{{$route.params.userName}}</p>
```
-  
```html
<router-link :to="{path:'/hi2?userName=jiangPath'}">hi2_param_path</router-link>
```
上面是to的另一种传参的方法。注意path的写法，里面的路径和路由的path对应。  
路由配置和上面一样，但是接收参数的方法不是$route.params.userName，而是{{$route.query.userName}}  
```html
<p v-if="$route.query.userName">{{$route.query.userName}}</p>
```
## 单页面多路由操作  
在mutilRouter.vue里添加上三个路由标签  
```html
<div class="hello">
    <P>{{msg}}</P>
    <router-view name="left"/>
    <router-view />
    <router-view name="right"/>
  </div>
```
然后在路由配置中配置：  
```js
{
      path:"/mutilRouter",
      component:MutilRouter,
      children:[
        {
          path:"san",
          components:{
            default:Hi1,
            left:Left,
            right:Right
          }
        }
      ]

    }
```
*注意使用的是components而不是component（我第一次就犯这个错了），这里的left和right与router-link标签里的name需要保持一致*  

## url传参  
- :冒号的形式传递参数  
路由配置：  
```js
{
      path: '/hi3/:name/:id',
      component: Hi3
    }
```
*注意这里的配置一定不要有name属性，否则会报错*  
```html
<router-link to="/hi3/zhangsan/12345">Hi3_url_param</router-link>
```

使用$route.params.name接收参数  
```html
<div>{{$route.params.name}}</div>
    <div>{{$route.params.id}}</div>
```
正则表达式在url传值中的应用  
我希望传递的Id是数字  
```js
{
      path: '/hi3/:name/:id(\\d+)',
      component: Hi3
    }
```
例如：“http://localhost:8080/#/hi3/zhangsan/1234567s” 输入这样的url地址是不能跳转到预期的页面的，因为id不满足数字的要求。   
加入了正则，我们再传递数字之外的其他参数，params.vue组件就没有办法接收到。  

## redirect基本重定向  
在有些时候，我们设置的路径不一致，但是我们打开的是同一个页面或同一个组件，这时就可以使用redirect。  
```js
{
      path:"/home",
      redirect:"/"
    }
```
上面我们设置了path路径，但是我们并没有设置组件，而是设置了redirect，重定向到根目录，这样就相当于请求的是根目录的url链接。  
```html
<router-link to="/home">Home</router-link>
```
重定向时url参数  
```js
{
      path:"/goHi3/:name/:id(\\d+)",
      redirect:"/hi3/:name/:id(\\d+)"
    }
```
```html
<router-link to="/goHi3/蒋介石/111111">GO_HI3</router-link>
```
## alias别名的使用  
使用alias别名的形式，我们也可以实现类似重定向的效果。  
1.在路由配置中起别名alias  
```js
{
      path: '/hi1',
      component: Hi1,
      alias:"/goHi1",
      children:[
        // {path:"/",component:Hi1},
        {path:"sub1",component:Hi1Sub1}
      ]
    }
```
2.在router-link的 to使用别名，这样就可以达到类似重定向的效果了。   
```html
<router-link to="/goHi1">GO_HI1</router-link>
```
*redirect和alias的区别*  
> - redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。  
> - alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了<router-view>中的内容.  

*注意*  
别名请不要用在path为’/’中，如下代码的别名是不起作用的。vue不支持这样使用。  
```js
{
  path: '/',
  component: Hello,
  alias:'/home'
}
```
## 路由过度动画  
想要路由有过度动画需要在router-view标签在transition标签里。  
```html
<transition name="fade" mode="out-in">
      <router-view/>
    </transition>
```
标签中的name属性是必填的。  
*css过度类名*组件过渡过程中，会有四个CSS类名进行切换，这四个类名与transition的name属性有关，比如name=”fade”,会有如下四个CSS类名：  
>fade-enter:进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除。  
>fade-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除。  
>fade-leave:离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除。  
>fade-leave-active:离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除。  

从上面四个类名可以看出，fade-enter-active和fade-leave-active在整个进入或离开过程中都有效，所以CSS的transition属性在这两个类下进行设置。  
```css
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
```
上边的代码设置了改变透明度的动画过渡效果，但是默认的mode模式in-out模式，这并不是我们想要的。下面我们学一下mode模式。  
*过渡模式mode:*  
- in-out:新元素先进入过渡，完成之后当前元素过渡离开。  
- out-in:当前元素先进行过渡离开，离开完成后新元素过渡进入。  

## 路由mode和404  
```js
mode:"hash"
```
路由的mode有两个值  
1.histroy:当你使用 history 模式时，URL 就像正常的 url，例如 http://jsapng.com/lms/，也好看！  
2.hash:默认’hash’值，但是hash看起来就像无意义的字符排列，不太好看也不符合我们一般的网址浏览习惯。  
404页面的设置  
1.配置路由  
```js
{
      path:"*",
      component:Error
    },
```
2.编写Error组件  
当url输入的地址在路由中没有配置时，就会跳转到404页面。  

## 路由钩子函数  
- beforeRouteEnter：在路由进入前的钩子函数。  
- beforeRouteLeave：在路由离开前的钩子函数。  
### 配置文件中的钩子函数    
```js
{
      path: '/hi2',
      component: Hi2,
      name:"hi2",
      beforeEnter:(to,from,next)=> {
        console.log(to);
        console.log(from);
        next();
      }
    }
```
钩子函数的三个参数:  
1.to:路由将要跳转的路径信息，信息是包含在对像里边的。   
2.rom:路径跳转前的路径信息，也是一个对象的形式。  
3.next:路由的控制参数，常用的有next(true)和next(false)。  
*注意：next(true)让跳转到页面，next(false)不让跳转，停留在当前页面，还可以根据业务逻辑来指定跳转路径。图跳转到根目录:next({path:"/"})*   
*注意在路由配置中不能使用beforeRouteLeave钩子函数，但是在模板中可以使用。*   
### 在模板中使用钩子函数  
```js
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
    }
  }
```

## 编程式导航   
- this.$router.go(-1) 和 this.$router.go(1)  
this.$router.go(-1)代表后退，点击会回到跳转到该页面之前的页面。  
```js
methods:{
      goBack(){
        this.$router.go(-1);
      }
    }
```
this.$router.go(1)代表向前，注意一定要是经过this.$router.go(-1)后退后在点击前进才会生效，否则是没有效果的。代码类似。  
- this.$router.push("XXXX")  
this.$router.push("XXXX")可以指定跳转到某个路径下，例如我要跳转到根目录下。可以这样this.$router.push("/")。  
*注意：这里使用的是$router，而参数的接收是$route，这里我是经常混淆的*  

# Vuex  
## 如何引入Vuex  
1.npm install vuex --save  使用npm安装vuex   
2.新建一个store.js文件，引入Vue和Vuex,使用我们vuex，引入之后用Vue.use进行引用。这样Vuex就算引用成功了。文件代码如下：  
```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={
  count:1
};

export default new Vuex.Store({
  state
});
```

## state访问状态对象  
- 通过computed的计算属性直接赋值  
computed属性可以在输出前，对data中的值进行改变，我们就利用这种特性把store.js中的state值赋值给我们模板中的data值。   
```js
computed:{
      count(){
        return this.$store.state.count;
      }
    },
```
这里需要注意的是return this.$store.state.count这一句，一定要写this，要不你会找不到$store的。这种写法很好理解，但是写起来是比较麻烦的，那我们来看看第二种写法。  

- 通过mapState的对象来赋值  
首先要用import引入mapState。  
```js
import {mapState} from 'vuex';
```
然后还在computed计算属性里写如下代码：  
```js
computed:mapState({
        count:state=>state.count
 })
```
*注意*  
>这里的computed的写法，计算属性都是在mapState这个方法所需的对象里。  
下面的代码是错误的，这个是我之前这样写的。  
```js
    computed:{
      count:state=>state.count
    },
```

- 通过mapState的数组来赋值  
```js
computed:mapState(["count"]),
```
这个算是最简单的写法了，在实际项目开发当中也经常这样使用。  

##  Mutations修改状态  
在vue 中，只有mutation 才能改变state.  mutation 类似事件，每一个mutation都有一个类型和一个处理函数，
因为只有mutation 才能改变state, 所以处理函数自动会获得一个默认参数 state. 所谓的类型其实就是名字  
$store.commit( )这个可以用来执行我们store里Mutations里的方法。例如我们之前的代码：  
在store.js文件里  
```js
const mutations={
  add(state){
    state.count++;
  },
  reduce(state){
    state.count--;
  }
}
```
在count.vue页面上调用  
```html
<button @click="$store.commit('add')">+</button>
    <button @click="$store.commit('reduce')">-</button>
```
这只是一个简单的方法，下面我们来看一下如何给函数传值  
```js
const mutations={
  add(state,n){
    state.count+=n;
  },
  reduce(state){
    state.count--;
  }
}
```
上面给add添加了参数n  
```html
<button @click="$store.commit('add',10)">+</button>
    <button @click="$store.commit('reduce')">-</button>
```
注意观察是如何传值的  
### 模板获取Mutations方法  
实际开发中我们也不喜欢看到$store.commit( )这样的方法出现，我们希望跟调用模板里的方法一样调用。  
例如：@click=”reduce” 就和没引用vuex插件一样。  
要达到这种写法，只需要简单的两部就可以了：  
1.在mapstateCount.vue模板中引入mapMutations   
```js
import {mapState,mapMutations } from "vuex"
```
2.在模板的<script>标签里添加methods属性，并加入mapMutations  
```js
methods:mapMutations(["add","reduce"]),
```
通过上边两部，我们已经可以在模板中直接使用我们的reduce或者add方法了，就像下面这样  
```html
<div>
      <button  @click="add(10)">+</button>
      <button  @click="reduce">-</button>
    </div>
```

## getters计算过滤操作   
### getters基本用法：  
比如我们现在要对store.js文件中的count进行一个计算属性的操作，就是在它输出前，给它加上100.  
我们首先要在store.js里用const声明我们的getters属性。  
```js
const getters={
  count:state=>state.count+=100
}
```
写好了gettters之后，我们还需要在Vuex.Store()里引入，由于之前我们已经引入了state盒mutations，所以引入里有三个引入属性。代码如下，   
```js
export default new Vuex.Store({
  state,
  mutations,
  getters
});
```
在store.js里的配置算是完成了，我们需要到模板页对computed进行配置。在vue 的构造器里边只能有一个computed属性，如果你写多个，只有最后一个computed属性可用，
所以要对上节课写的computed属性进行一个改造。改造时我们使用ES6中的展开运算符”…”。  
```js
computed:{
      ...mapState(["count"]),
      count(){
        return this.$store.getters.count;
      }
    },
```
需要注意的是，你写了这个配置后，在每次count 的值发生变化的时候，都会进行加100的操作。   
还是有些场景需要用到的：例如价格和金额在数字前面加上人民币的符号……  
### 用mapGetters简化模板写法  
import引入我们的`mapGetters  
  ```js
  import { mapState,mapMutations,mapGetters } from 'vuex';
  ```
  在computed属性中加入mapGetters  
  ```js
  computed:{
        ...mapState(["count"]),
        ...mapGetters(["count"])
      }
  ```

## actions异步修改状态   
actions和之前讲的Mutations功能基本一样，不同点是，actions是异步的改变state状态，而Mutations是同步改变状态。  
```js
const actions={
  addAction(context,n){
    context.commit("add",n);
  },
  reduceAction({commit}){
    commit("reduce");
  }
}
```
在store.js中声明actions actions是可以调用Mutations里的方法的。
在actions里写了两个方法addAction和reduceAction，在方法体里，我们都用commit调用了Mutations里边的方法。细心的小伙伴会发现这两个方法传递的参数也不一样。
> - context：上下文对象，这里你可以理解称store本身。  
> - {commit}：直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了。  

在模板中调用：  
```html
<div>
      <button  @click="$store.dispatch('addAction',10)">+</button>
      <button  @click="$store.dispatch('reduceAction')">-</button>
    </div>
```
### mapActions简化模板用法  
引入mapActions  
```js
import {mapState,mapMutations,mapGetters,mapActions } from "vuex"
```
将action写入模板的methods里  
```js
methods:{
      ...mapMutations(["add","reduce"]),
      ...mapActions(["addAction","reduceAction"])
    }
```
在模板里使用:  
```html
<div>
      <button  @click="addAction(10)">+</button>
      <button  @click="reduceAction">-</button>
    </div>
```

*注意：*   
*这里提到mutation必需是同步的，action可以是异步的。个人觉得技术胖没有讲明白。*  
*mutation是直接改变store的状态的，有vuex的架构性质，他是同步即立刻改变状态，知道状态变化的来源。
action可以是异步的，方便一些业务逻辑的处理，但是要想改变store的状态那还是必需调用mutation相应方法来处理。*  
*[Vuex中mutations和actions的区别](https://blog.csdn.net/ycz19930423/article/details/77505573)*  
*[Vuex中mutations和actions的基本使用](https://www.cnblogs.com/SamWeb/p/6543931.html)*   

## module模块组  
随着项目的复杂性增加，我们共享的状态越来越多，这时候我们就需要把我们状态的各种操作进行一个分组，分组后再进行按组编写。(据说一般不会使用到)  
在storeModule.js文件中  
```js
const moduleA={
  state,
  mutations,
  getters,
  actions};

export default new Vuex.Store({
  modules:{a:moduleA}
});
```
在模板中使用的形式：  
```js
computed:{
      count(){
        return this.$store.state.a.count;
      }
    }
```
*this.$store.state.a.count;加上了module的名称*  
但是我不知道为啥里面的mutation的不需要。下面的代码在使用modules依然有效  
```html
<button @click="$store.commit('add',10)">+</button>
    <button @click="$store.commit('reduce')">-</button>
```
