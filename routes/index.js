import Router from 'koa-router'

const router = new Router({
  prefix: '/api'
})

router.get('/', ctx => {
  let url = 'http://' + ctx.request.headers.host + '/api'
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
    ],
    Projects: [
      {
        desc: '获取项目列表',
        path: url + '/projects',
        type: 'get',
        example: url + '/projects'
      },
      {
        desc: '项目创建',
        path: url + '/projects',
        type: 'post',
        example: url + '/projects'
      },
      {
        desc: '项目更改',
        path: url + '/projects/:id',
        type: 'put',
        example: url + '/projects/1'
      },
      {
        desc: '项目删除',
        path: url + '/projects/:id',
        type: 'del',
        example: url + '/projects/1'
      }
    ],
    User: [
      {
        desc: '获取用户信息',
        path: url + '/getUserInfo',
        type: 'post',
        example: url + '/getUserInfo'
      },
      {
        desc: '注册',
        path: url + '/user/resiger',
        type: 'post',
        example: url + '/user/resiger'
      },
      {
        desc: '登录',
        path: url + '/user/login',
        type: 'post',
        example: url + '/user/login'
      }
    ]
  }
})

export default router
