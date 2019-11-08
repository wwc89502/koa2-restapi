[TOC]

## 环境

> node v10.15.0
>
> npm 6.12.0

## 开始之前（import与require）

> **遵循规范**
> require 是 AMD规范引入方式
> import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法

> **调用时间**
> require是运行时调用，所以require理论上可以运用在代码的任何地方
> import是编译时调用，所以必须放在文件开头

> **本质**
> require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量
> import是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require

> 因为我更习惯使用 `import` 导入，所以做以下处理。使用 `require` 则忽略
>
> ```sh
> npm i -D babel-plugin-transform-runtime babel-preset-env babel-register
> ```
>
> ```js
> // start.js 入口文件
> require('babel-register') ({
>   presets: [ 'env' ],
>   plugins: [
>     "transform-runtime"
>   ]
> })
> module.exports = require('./app.js') // app.js Koa对象定义文件
> ```



## 开始

#### 安装

```shell
npm i -S koa
```

#### 使用

```js
// app.js
import Koa from 'koa'

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'hello koa2'
})

app.listen(80, () => {
  console.log('app listen at 80')
})

```

#### 启动

```shell
node start.js
```



## 路由

```js
// routes/index.js

import Router from 'koa-router'

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'Hello koa2'
})

export default router
```

```js
// app.js
import Koa from 'koa'
import Home from './routes/index'

const app = new Koa()

app.use(Home.routes(), Home.allowedMethods())

app.listen(80, () => {
  console.log('app listen at 80')
})

```

> 扩展
>
> ```js
> import Router from 'koa-router'
> import articleController from '../controller/article' // 文章控制器
> 
> const router = new Router({
>   prefix: '/api/article' // 路由前缀
> })
> 
> // 文章列表
> router.get('/', articleController.getList)
> 
> // 文章详情
> router.get('/:id', articleController.getDetail)
> 
> // 文章创建
> router.post('/', articleController.create)
> 
> // 文章更改
> router.put('/:id', articleController.update)
> 
> // 文章删除
> router.del('/:id', articleController.delete)
> 
> export default router
> ```



## 数据请求

> **RESTful API风格** 
>
> REST，表示性状态转移（representation state transfer）。简单来说，就是用`URI`表示资源，用HTTP方法(GET, POST, PUT, DELETE)表征对这些资源的操作
>
> GET 用于读取
>
> POST 用于创建
>
> PUT 用于更新
>
> DELETE 用于删除

#### GET

```js
// GET请求上下文对象

app.use(async ctx => {
  let url = ctx.url
  let query = ctx.params // 同 ctx.request.query
  let query = ctx.query // 同 ctx.request.query
  let querystring = ctx.querystring // 同 ctx.request.querystring

  ctx.body = {
    url,
    query,
    querystring
  }
})

// 返回的结果[http://localhost/api/article?status=publish&page=2&num=2]
{
  "url": "/api/article?status=publish&page=2&num=2",
  "query": {
    "status": "publish",
    "page": "2",
    "num": "2"
  },
  "querystring": "status=publish&page=2&num=2"
}

// 路由定义 http://localhost/api/article/:id
// 返回的结果 [http://localhost/api/article/1]
{
  "id": "1"
}
```



#### POST（PUT、DELETE同）

###### 安装

```shell
npm i -S koa-body
```

###### 使用

```js
import Koa from 'koa'
import koaBody from 'koa-body'

app.use(koaBody())

app.listen(80, () => {
  console.log('app listen at 80')
})
```

```js
app.use(async ctx => {
  const req = ctx.request.body

  ctx.body = req
})

// 请求体
// title:测试标题
// content:测试内容

// 返回的结果 [http://localhost/api/article]
{
  "title": "测试标题",
  "content": "测试内容"
}
```



## 静态资源(待补充)

```shell
npm i -S koa-static
```

```js
import Koa from 'koa'
import Serve from 'koa-static'

const app = new Koa()

app.use(Serve(__dirname + '/', {extensions: ['html']}))

app.listen(80, () => {
  console.log('app listen at 80')
})

```

