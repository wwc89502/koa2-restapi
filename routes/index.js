import Router from 'koa-router'

const router = new Router({
  prefix: '/api'
})

router.get('/', ctx => {
  let url = 'http://' + ctx.request.headers.host + ctx.request.url
  ctx.body = {
    Article: [
      {
        desc: '获取文章列表',
        path: url + '/article',
        type: 'get',
        example: url + '/article'
      },
      {
        desc: '获取文章详情',
        path: url + '/article/:id',
        type: 'get',
        example: url + '/article/328'
      },
      {
        desc: '文章创建',
        path: url + '/article',
        type: 'post',
        example: url + '/article'
      },
      {
        desc: '文章更改',
        path: url + '/article/:id',
        type: 'put',
        example: url + '/article/328'
      },
      {
        desc: '文章删除',
        path: url + '/article/:id',
        type: 'del',
        example: url + '/article/328'
      }
    ]
  }
})

export default router
