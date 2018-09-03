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
