# Element-UI
http://element-cn.eleme.io/#/zh-CN  
## el-pagination
当时在使用中，发现每次点击分页的时候页面都会卡死掉。debug发现是分页的js被循环调用了，其实是自己的js写法问题。
```html
<el-pagination  layout="prev, pager, next" :total="aelData.totalCount" :page-size="pageSize" @current-change="handleCurrentChange" :current-page.sync="currentPage">
            </el-pagination>
```
有问题的js,这是习惯了项目里pc的写法
```js
handleCurrentChange(){
                this.currentPage+=1;
                this.aelInit();
            },
```
更改之后的js
```js
handleCurrentChange(val){
                this.currentPage=val;
                this.aelInit();
            },
```
## el-table  
1.表格这是一个经常用到的，在移动小屏幕上很多字段是不会展示全的，所以需要有可以查看详情的，这里就提供了支持。可以结合文档说明来使用。开始以为只能按照文档的格式来写，后来发现其实详情里面的html是可以自己随意布局的。
```html
<el-table>
<el-table-column type="expand">
  <template slot-scope="scope">
    <!--<el-form inline class="demo-table-expand">-->
    <el-row>
      <el-col :span="12">
        <label class="title-label">告警级别:</label>
        <span :class="scope.row.alertLevel | alertLevelClass">{{scope.row.alertLevel | alertLevelName}}</span>
      </el-col>
      <el-col :span="12">
        <label class="title-label">告警标题:</label>
        <span class="span-value">{{scope.row.alertTitle}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <label class="title-label">首次告警:</label>
        <span class="span-value">{{scope.row.firstAlertTime | timestampFormat}}</span>
      </el-col>
      <el-col :span="12">
        <label class="title-label">最近告警:</label>
        <span class="span-value">{{scope.row.firstAlertTime | timestampFormat}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <label class="title-label">所属业务:</label>
        <span class="span-value">{{scope.row.domainCnName}}</span>
      </el-col>
      <el-col :span="12">
        <label class="title-label">子系统:</label>
        <span class="span-value">{{scope.row.subSystemEnName}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <label class="title-label">运维部门:</label>
        <span class="span-value">{{scope.row.opDep}}</span>
      </el-col>
      <el-col :span="12">
        <label class="title-label">IP:</label>
        <span class="span-value">{{scope.row.alertIp}}</span>
      </el-col>
    </el-row>
  </template>
</el-table-column>

<el-table-column label="告警级别">
  <template slot-scope="scope">
    <span :class="scope.row.alertLevel | alertLevelClass">{{scope.row.alertLevel | alertLevelName}}</span>
  </template>
</el-table-column>
<el-table>
```
像上面这样，只有点击第一个单元格的时候，才可以展示详情里的信息。这里如果我想点击任意的单元格都可以展示详情，那该如何做呢？  
这时我们可以使用el-table的row-key和expand-row-keys这两个属性来操作。
```html
<el-table :data="aelData.comAlertLists" :row-key="getListId" :expand-row-keys="expands" @cell-click="columnClick">
```
注意这里的getListId是组件data中的方法，接收参数是row
```js
data(){
            return {
                
                expands:[],
                getListId(row){
                    return row.listId;
                }
            }
        },
```
expands是数组里面存放的是需要展开的行的标志。例如代码中的listId。事件交互逻辑代码如下：
```js
columnClick(row,column,cell,event){
                var index=-1;
                this.expands.forEach(function (value,i) {
                    if(value==row.listId){
                        index=i;
                    }
                });
                if(index==-1){
                    this.expands.push(row.listId);
                }
                else{
                    this.expands.splice(index,1);
                }
            },
```
2.表格中经常会出现单元格的内容过长，不希望换行而是自动隐藏。最开始我们使用了模板，自己写一些样式在里面，在pc浏览器上是可以的，但是在pad就不行了。使用各种方法都不行，后来发现在默认情况下若内容过多会折行显示，若需要单行显示可以使用show-overflow-tooltip属性，它接受一个Boolean，为true时多余的内容会在 hover 时以 tooltip 的形式显示出来。  
http://blog.csdn.net/u012108512/article/details/78752736  
3.在table中添加事件处理，查看文档可以知道单元格的事件的添加(cell-click)。
```html
<el-table :data="aelData.comAlertLists" :row-key="getListId" :expand-row-keys="expands" @cell-click="columnClick">
```
知道cell-click接收的参数是row, column, cell, event。这里在html文件中不需要自己添加上去，如果自己添加会出现未定义的错误。错误示例代码：
```html
<el-table :data="aelData.comAlertLists" :row-key="getListId" :expand-row-keys="expands" @cell-click="columnClick(row, column, cell, event)">
```
其实只需要在js里编写函数时，加上就可以了。
```js
columnClick(row,column,cell,event){
                var index=-1;
                this.expands.forEach(function (value,i) {
                    if(value==row.listId){
                        index=i;
                    }
                });
                if(index==-1){
                    this.expands.push(row.listId);
                }
                else{
                    this.expands.splice(index,1);
                }
            },
```
