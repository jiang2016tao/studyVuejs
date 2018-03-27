vue官网学习：https://cn.vuejs.org/v2/guide/index.html  
# v-text  
注意使用v-text的细节  
```html
<li v-for="view in viewGroup.metricViews" v-text="view.viewName">
                            <span>jiang</span>
                        </li>
```
如果这样使用，那么标签的span标签将会被覆盖，不会生效。需要改为采用{{}}双大括号的形式。  
```html
<li v-for="view in viewGroup.metricViews">{{view.viewName}}
                            <span>jiang</span>
                        </li>
```
# vue中修改了数据但视图无法更新的情况  
参考：http://blog.csdn.net/github_38771368/article/details/77155939  
# 组件通信  
我在父组件中需要传值给子组件，但是在最开始待传的值是没有值的，需要后面请求后才能获得值。  
```html
<div class="graph-body">
                    <graph-highchart :data="graph.graphMetricData"></graph-highchart>
                </div>
```
开始是这样写的，子组件怎么都不出来，我以为是因为数组里的对象添加了属性，导致视图没有更新的原因，于是使劲的解决这个问题可是怎么弄不好，最后将值打印出来发现视图更新了。这才醒悟是第一次没有值的原因，导致子组件加载不出来。修改代码如下：  
```html
<div class="graph-body" v-if="graph.graphMetricData">
                    <graph-highchart :data="graph.graphMetricData"></graph-highchart>
                </div>
```
# 链接的跳转  
学会使用在属性里动态拼接值  
```html
<router-link :to="{path:'metricDetail?graphId='+graph.graphId+'&title='+graph.graphName}" target="_blank">
                                <i class="wbk-ground-img-FullScr_Dft"></i>
                            </router-link>
                            <!--<a :herf="'#/metricDetail?grpahId='+graph.graphId+'&title='+graph.graphName" target="_blank">
                                <i class="wbk-ground-img-FullScr_Dft"></i>
                            </a>-->
```
不知道为什么使用下面的a标签点击不会跳转，看官网是推荐使用router-link标签.
# vue和angularjs的区别  
例如，给标签动态赋值样式  
vue
```html
<i :class="{'wbk-ground-img-Layout1_Dft':col==24,'wbk-ground-img-Layout2_Dft':col==12,'wbk-ground-img-Layout3_Dft':col==8}"></i>
```
angular  
```html
<i :class="{'wbk-ground-img-Layout1_Dft':24,'wbk-ground-img-Layout2_Dft':12,'wbk-ground-img-Layout3_Dft':8}[col]"></i>
```
# axios的使用  
https://www.kancloud.cn/yunye/axios/234845
1.在做页面中，我们会在一次交互中需要发送多个请求，这些请求需要按照一定的顺序，串行执行，在axios中这样使用：  
```js
axios(param).then(data=>{
          if(data.data.data){
            var curData = data.data.data
            globalMap.set('data',curData)
          }
          if(data.data.systemTime){
            this.systemTimes = data.data.systemTime.substring(0,16)
          }
        }).then(function () {
          self.parameterSquare()
        }).then(function () {
          self.$store.dispatch('hideSpin')
        })
```
这样就是第一次发送请求，后处理完第一个then里的逻辑之后再去处理第二个then里js函数发请求和处理逻辑。
2.如果需要并发请求，并且等到所有请求完之后，在对结果进行处理，可以采用下面的方法：  
```js
axios.all([
            axios.get("a.txt"),
            axios.get("b.txt")
    ]).then(axios.spread(function (userResp, reposResp) {

        // 上面两个请求都完成后，才执行这个回调方法

        console.log('User', userResp.data);

        console.log('Repositories', reposResp.data);

    }));
```
当后面的请求需要前一个请求的结果里的值作为参数时，我们可以采用前面的第一种方式；如果几个请求的参数没有需要其他请求的结果里的值，  
只是页面逻辑需要几个请求结果的值都有才好处理的，我们可以采用第二种方式来做；至于根本没关系的，就并发请求处理结果就可以了。  
# vuex  
官网地址：https://vuex.vuejs.org/zh-cn/  
Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：  
```js
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```
通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。(解释我最初的疑惑)  
vuex使用场景  
vuex使用步骤：  
1.在根实例注册一个store的实例。  
2.在VUE组件中条用实例中的action。  
```js
methods:mapActions([
      'increment'/*,
      'decrement',
      'clickOdd',
      'clickAsync'*/
    ])
```
3.action将commit给mutations来处理，逻辑都在mutations里。  
可以结合项目学习：https://github.com/jiang2016tao/studyVueProject  
# vue-cli  
## npm install vue-cli -g  //全局安装vue-cli命令行工具  
## vue init webpack myProject  //创建基于webpack模板(这里也可以是其他的模板，可以使用vue list命令查看)的新项目【注意，这里项目名称myProject不能有横杠否则要报错的],这里注意下，vue build版本一般是默认的，直接enter，然后什么单元测试，eslint检查，统统直接不要，只要一个vue-router路由。
【图片】(./wikiImg/vue_list.PNG)  
## cd myProject  //进入到刚刚下载的项目  
## npm install  //安装插件依赖，安装完后会在项目下面发现生成了一个node_modules文件目录。vue组件编译，es6语法编译，css语法编译...都会使用到  
## npm run dev  //运行项目，开始你的开发里程
# keep-alive  
1、keep-alive要配合router-view使用，这里要注意一点就是，keep-alive本身是vue2.0的功能，并不是vue-router的，所以再vue1.0版本是不支持的。在项目中我们有些页面需要缓存，有些页面需要及时刷新是不能使用缓存的，那要怎么自定义呢，那就要在router-view里面多加个v-if判断了，然后在router定义的文件里面在想要缓存的页面多加上“meta:{keepAlive:true}”，不想要缓存就是“meta:{keepAlive:false}”或者不写，只有为true的时候是会被keep-alive识别然后缓存的。示例代码  
```html
<keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
```
```js
{
        path: '/newHomePage/',
        component: newHomePage,
        hidden: true,
        children: [
            { path: 'metricView', component:metricView,meta:{
                keepAlive:true
                }},
            { path: 'graphSearchForm', component:graphSearchForm }
        ]
    }
```
可以看出我们是配在一个子路径下面的，如果是从根目录返回，那样是没有效果的。其实我自己尝试在根目录的路由出加上。以下代码  
```html
<keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
```
发现这样的配置是有问题的。虽然每次返回不会再重新渲染我缓存的页面了，但是每次跳转后都会重新实例化我的组件，就是跳转后缓存页面的组件会发请求。keep-alive使用后组件是不会销毁的，那么就不应该会再次调用created、mounted等这些组件声明周期的函数了，可是上面配置之后这些函数都有执行，那就说明重新实例化了组件。  
被包含在 <keep-alive> 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated  
activated  
在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用。  
deactivated  
在组件被停用时调用。  
注意：只有组件被 keep-alive 包裹时，这两个生命周期才会被调用，如果作为正常组件使用，是不会被调用，以及在 2.1.0 版本之后，使用 exclude 排除之后，就算被包裹在 keep-alive 中，这两个钩子依然不会被调用！另外在服务端渲染时此钩子也不会被调用的。  

----
在使用VUE组件中，我们经常希望等所有的dom元素都渲染完了，在去获取节点的对象。例如当请求到数据后，我需要根据请求的数据封装到highchart来给指定的元素展示。可是元素只有在请求到数据才会有
```js
<div v-if="hostData.length>0">
                <div id="high_chart" style="height: 270px;"></div>
                </div>
```
其实，我们可以在修改数据后调用this.$nextTick，首次加载在mounted函数里面调用this.$nextTick  
this.$nextTick(function () {  
//dom已更新  
})  
# 在vue中，我们很多情况共用页面，只是路由的参数不一样。当路由的参数不一样的时候，组件是不是重新生成或页面重新加载的。这个时候，我们应该监听路由，然后调用获取数据的方法，重绘视图。  
如：监听路由，调用重绘视图的aelInit方法。
```js
mounted(){
            this.$nextTick(function () {
                
                
                this.getDomain();
                this.getAllCitype();
                this.aelInit();
            });
        },
        watch:{
            "$route":"aelInit"
        },
```
# filter 过滤器
我们将项目中的过滤器放置在一个单独的js文件中，然后在首页index.js中进行全局注册，这样过滤器就可以在所有组件中使用，不需要引入的。  
```js
import * as filters from './utils/filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});
```
当然也可以本地注册这样只能在本组件中使用，可以用“|”连续使用多个过滤器，可以为过滤器添加参数。https://www.w3cplus.com/vue/how-to-create-filters-in-vuejs.html
# vue组件中的样式属性--scoped
http://blog.csdn.net/one_girl/article/details/78737740
在使用样式发现没有生效。
```html
<el-table :data="aelData.comAlertLists" cell-class-name="span-td" class="b-c-7eb138">
  ……
  </el-table>
```
如上面我有两个样式span-td（是给表格的每个单元格的样式）和b-c-7eb138（是表格子组件的自身样式）。结果发现b-c-7eb138样式有效，span-td样式无效。  
发现是样式编写使用了scoped。<style scoped>，这样的样式只会对本组件有效，虽然本组件里有子组件，那也只是对子组件的根组件布局样式有效，子组件的根组件下的其他html节点将不会受样式的影响了。
如果想对设置了scoped的子组件里的元素进行控制可以使用’>>>’或者’deep’  
  ```html
  <metric-aside class="test-root-class" @listenerToTagEvent="tagEvent"></metric-aside>
  ```
  如果想改变子组件metric-aside的样式可以这样使用,注意test-root-class是类名。
  ```js
  .test-root-class >>> .input-div{
        background-color: #000000;
    }
  ```
  # Mock(数据的模拟)  
  在开发中，我们采用前后端分离。在没有后端时，我们前端对数据的模拟。  
  以前我都是将数据以约定的特定json格式写在文件里，然后ajax直接访问该文件这样处理。  
  今天在使用另一种方法，使用node的express。首先需要准备一个json文件，文件可以在https://github.com/jiang2016tao/vue_seller/blob/master/data.json。  
  在webpack的启动文件里添加路由设置,注意这个监听app.listen(8080)（端口号，必须和环境的服务器配置的一致）;我之前开始就没加，怎么都用连接访问不到。  
  ```js
  var express = require('express');
  var apiRoutes = express.Router();
  
  apiRoutes.get('/seller', function (req, res) {
    res.json({
      errno: 0,
      data: seller
    });
  });
  
  apiRoutes.get('/goods', function (req, res) {
    res.json({
      errno: 0,
      data: goods
    });
  });
  
  apiRoutes.get('/ratings', function (req, res) {
    res.json({
      errno: 0,
      data: ratings
    });
  });
  
  app.use('/api', apiRoutes);
  app.listen(8080);
  ```
  启动环境后，就可以测试了http://localhost:8080/api/seller
