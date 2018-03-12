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
