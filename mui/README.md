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
