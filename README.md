vue官网学习：https://cn.vuejs.org/v2/guide/index.html  
[基本指令](http://jspang.com/2017/02/23/vue2_01/)  
# v-model  
v-model指令，我理解为绑定数据源。就是把数据绑定在特定的表单元素上，可以很容易的实现双向数据绑定。  
*注意*  
有几个修饰符  
- .lazy：取代 imput 监听 change 事件。就是在文本输入的过程中数据绑定不会立即改变，当文本失去焦点blur的时候，数据源就会立刻改变。   
- .number：输入字符串转为数字。这里主要是将输入的数字，一般情况js会作为字符串处理，给了这个修饰符后，就会作为数字类型的值来处理，当然输入的字符如果不是数字，那还是字符串。
这个主要用在数字输入的文本框里。  
- .trim：输入去掉首尾空格。  
*js如何判断是数字*  
[js中判断一个变量是否为数字类型的疑问](https://www.cnblogs.com/yyzyxy/p/7193577.html)  
所以判断一个变量是否为数字类型，应该使用：typeof value === 'number'  
# v-bind  
v-bind是处理HTML中的标签属性的，例如<div></div>就是一个标签，<img>也是一个标签，我们绑定<img>上的src进行动态赋值。  
```html
<img v-bind:src="imgSrc" height="50px" width="100px"/>
```
简写  
```html
<img :src="imgSrc" height="50px" width="100px"/>
```
在实际工作中，我们主要使用一些逻辑来渲染不同的样式。  
Vue的实例代码：  
```js
let app=new Vue({
        el:"#app",
        data:{
            imgSrc:"http://7xjyw1.com1.z0.glb.clouddn.com/bbbb_20180818070432.png",
            divClass:"classA",
            isOk:false,
            v_classA:"classA",
            v_classA:"classB",
             styleObj:{fontSize:"14px",color:"gray"}
        }

    });
```
- 直接绑定样式  
```html
<div :class="v_classA">直接绑定class</div>
```
- 条件绑定样式  
```html
<div :class="{classA:isOk,classB:!isOk}">绑定class条件判断</div>
```
*注意*classA和classB是样式不是vue里data中的变量  
```html
<div :class="isOk?v_classA:v_classA">4、绑定class中的三元表达式判断</div>
```  
*注意*和上面的区别
- class数组
```html
<div :class="[v_classA,v_classA]">绑定class数组</div>  
```
- 绑定style  
错误的写法。我经常犯得错  
```html
<div :style="font-size:v_fontSize;color:v_color">绑定style</div>
```
上面的错误示例有基础需要注意的。  
vue中样式的绑定不能按照常规的html的style格式来书写，需要写成对象的形式，即（<div :style="{font-size:v_fontSize;color:v_color}">绑定style</div>）
这样还是有问题的，vue对样式的属性不能加-的（算是vue的bug吧，无法解析），需要更改为驼峰似的命名即（<div :style="{fontSize:v_fontSize;color:v_color}">绑定style</div>）  
正确的写法：  
```html
<div :style="{fontSize:v_fontSize,color:v_color}">绑定style</div>
```
当然也可以作为一个对象来绑定。  
```html
<div :style="styleObj">绑定style对象</div>
```
# v-pre  
就是原样输出  
```html
<div id="app">
    <div v-pre>{{message}}</div>
</div>
<script>
    var app=new Vue({
        el:"#app",
        data:{
            message:"jiang"
        }
    });
</script>
```
如上面，他并不会将message的内容输出，而是直接在页面上显示{{message}}  
# v-cloak  
在vue渲染完指定的整个DOM后才进行显示。它必须和CSS样式一起使用，
# v-once  
在vue只渲染一次，当绑定的数据源再次发生变化时，他也不会变化。  
```html
<div id="app">
    <div v-once>{{message}}</div>
    <input type="text" v-model="message">
    <div>{{message}}</div>
</div>
<script>
    var app=new Vue({
        el:"#app",
        data:{
            message:"jiang"
        }
    });
</script>
```
上面div的内容就不会随文本框输入的值变化而变  
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
# Vue全局API  
## vue.directive  
*问题*  
```html
<div id="app">
    <div>{{num}}</div>
    <button @click="add">add</button>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            num:10
        },
        methods:{
            add:function() {
                debugger
                this.num++;
            }
        }
    });
</script>
```
这样写点击按钮，num会加1并在页面显示。完全符合预期。  
```html
<div id="app">
    <div>{{num}}</div>
    <button @click="add">add</button>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            num:10
        },
        methods:{
            add:()=> {
                debugger
                this.num++;
            }
        }
    });
</script>
```
但是改用es6的箭头函数，就出现问题了。debugger发现this的指向变了，上面的this是Vue，而下面的确实window。  
[this 指向详细解析（箭头函数）](https://www.cnblogs.com/dongcanliang/p/7054176.html)  
作为方法的箭头函数this指向全局window对象，而普通函数则指向调用它的对象.所以在vue中使用箭头函数要注意this的指向  
<code>
    那这样在Vue里岂不是只能使用普通函数来写了，应该会有其他方法使用箭头函数吧
</code>  
箭头函数里面的 this 是一个常量，它继承自外围作用域  
[代码重构_使用箭头函数精简你的 Vue 模块](http://imweb.io/topic/5848d21b9be501ba17b10a99)   
自定义指令示例：
```html
<div id="app">
    <div v-jiang="color">{{num}}</div>
    <button @click="add">add</button>
</div>
<script>
    Vue.directive("jiang",(el,binding)=>{
        el.style.color=binding.value;
    });
    new Vue({
        el:"#app",
        data:{
            num:10,
            color:"red"
        },
        methods:{
            add() {
                this.num++;
            }
        }
    });
</script>
```
1.自定义指令传递三个参数  
- el: 指令所绑定的元素，可以用来直接操作DOM。  
- binding:  一个对象，包含指令的很多信息。  
```js
binding:{
    name:'指令名，不包括 v- 前缀。',
    value:'指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。',
    oldValue:'指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。',
    expression:"字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"",
    arg："传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"",
    modifiers:"一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。",
    vnode:"Vue 编译生成的虚拟节点。",
    oldVnode:"上一个虚拟节点"
   }
```
- vnode: Vue编译生成的虚拟节点。  
2.自定义指令的生命周期  
自定义指令有五个生命周期（也叫钩子函数），分别是 bind,inserted,update,componentUpdated,unbind  
- bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。  
- inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。  
- update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。  
- componentUpdated:被绑定元素所在模板完成一次更新周期时调用。  
- unbind:只调用一次，指令与元素解绑时调用。  
示例代码：  
```html
<div id="app">
    <div v-jiang="color">{{num}}</div>
    <button @click="add">add</button>
    <div>
        <button id="btn">解绑</button>
    </div>
</div>
<script>
    Vue.directive("jiang",{
        bind:function(el,binging){//被绑定
            console.log('1 - bind');
            el.style.color=binging.value;
        },
        inserted:function(){//绑定到节点
            console.log('2 - inserted');
        },
        update:function(){//组件更新
            console.log('3 - update');
        },
        componentUpdated:function(){//组件更新完成
            console.log('4 - componentUpdated');
        },
        unbind:function(){//解绑
            console.log('5 - unbind');
        }
    });
    let app=new Vue({
        el:"#app",
        data:{
            num:10,
            color:"red"
        },
        methods:{
            add() {
                this.num++;
            },
        }
    });
    window.onload=()=>{
        document.getElementById("btn").addEventListener("click",()=>{
            app.$destroy();
        })
    };
</script>
```
[指令的实用场景](https://blog.csdn.net/baidu_31333625/article/details/70473839)  
[自定义指令的详细开发](https://segmentfault.com/a/1190000012566413)   
## Vue.extend  
Vue.extend 返回的是一个“扩展实例构造器”,也就是预设了部分选项的Vue实例构造器。经常服务于Vue.component用来生成组件，可以简单理解为当在模板中遇到该组件名称作为标签的自定义元素时，
会自动调用“扩展实例构造器”来生产组件实例，并挂载到自定义元素上。  
- 自定义无参数标签  
我们想象一个需求，需求是这样的，要在博客页面多处显示作者的网名，并在网名上直接有链接地址。我们希望在html中只需要写<author></author> ，这和自定义组件很像，但是他没有传递任何参数，只是个静态标签。  
我们的Vue.extend该登场了，我们先用它来编写一个扩展实例构造器。代码如下：  
```js
let authorExpend=Vue.extend({
        template:`<p><a :href="authorUrl">{{authorName}}</a></p>`,
        data(){
            return {
                authorUrl:"http://baidu.com",
                authorName:"jiang"
            };
        }
    });
```
这时html中的标签还是不起作用的，因为扩展实例构造器是需要挂载的，我们再进行一次挂载。  
```js
new authorExpend().$mount("author");
```
这里可以是标签，class或id  
个人觉得这个没什么用，这样的需求我们一般都是采用的组件开发。   
# vue.set  
其他功能都不重要，都可以有其他方式来实现，但是对数组的数据更新或长度变化，vue是检查不到变化的，所以dom也不会更新，这样就会出现视图和数据源的不一致。需要通过vue.set来解决。
```html
<div id="app">
    <div>
        <ul>
            <li v-for="v in arr">{{v}}</li>
        </ul>
    </div>
    <button onclick="update()">update</button>
</div>
<script>
    function update(){
//        outData.arr[1]="dddddddd";
        Vue.set(app.arr,1,"ddddddddd");
    }
    let outData={
        arr:["a","b","c"]
    };
    let app=new Vue({
        el:"#app",
        data:outData
    });
</script>
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
![image](./wikiImg/vue_list.PNG)  
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
