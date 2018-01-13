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
在做页面中，我们会在一次交互中需要发送多个请求，这些请求需要按照一定的顺序，串行执行，在axios中这样使用：  
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
