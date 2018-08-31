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

