import Router from 'koa-router'
import { getTime } from '../tools'

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
      },
      {
        desc: '获取文章分类',
        path: url + '/article_cate',
        type: 'get',
        example: url + '/article_cate'
      },
      {
        desc: '获取文章分类详情',
        path: url + '/article_cate/:id',
        type: 'get',
        example: url + '/article_cate/328'
      },
      {
        desc: '文章分类创建',
        path: url + '/article_cate',
        type: 'post',
        example: url + '/article_cate'
      },
      {
        desc: '文章分类更改',
        path: url + '/article_cate/:id',
        type: 'put',
        example: url + '/article_cate/328'
      },
      {
        desc: '文章分类删除',
        path: url + '/article_cate/:id',
        type: 'del',
        example: url + '/article_cate/328'
      }
    ],
    Picture: [
      {
        desc: '获取照片列表',
        path: url + '/picture',
        type: 'get',
        example: url + '/picture'
      },
      {
        desc: '获取照片详情',
        path: url + '/picture/:id',
        type: 'get',
        example: url + '/picture/328'
      },
      {
        desc: '照片创建',
        path: url + '/picture',
        type: 'post',
        example: url + '/picture'
      },
      {
        desc: '照片更改',
        path: url + '/picture/:id',
        type: 'put',
        example: url + '/picture/328'
      },
      {
        desc: '照片删除',
        path: url + '/picture/:id',
        type: 'del',
        example: url + '/picture/328'
      },
      {
        desc: '获取照片分类',
        path: url + '/picture_cate',
        type: 'get',
        example: url + '/picture_cate'
      },
      {
        desc: '获取照片详情',
        path: url + '/picture_cate/:id',
        type: 'get',
        example: url + '/picture_cate/328'
      },
      {
        desc: '照片分类创建',
        path: url + '/picture_cate',
        type: 'post',
        example: url + '/picture_cate'
      },
      {
        desc: '照片分类更改',
        path: url + '/picture_cate/:id',
        type: 'put',
        example: url + '/picture_cate/328'
      },
      {
        desc: '照片分类删除',
        path: url + '/picture_cate/:id',
        type: 'del',
        example: url + '/picture_cate/328'
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
        desc: '检查是否登录',
        path: url + '/checkLogin',
        type: 'post',
        example: url + '/checkLogin'
      },
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
        example: url + '/user/resiger',
        params: {
          password: '密码',
          email: '邮箱',
          account: '账号'
        }
      },
      {
        desc: '登录',
        path: url + '/user/login',
        type: 'post',
        example: url + '/user/login',
        params: {
          password: '密码',
          account: '账号 || 邮箱'
        }
      }
    ],
    Upload: [
      {
        desc: '上传单个文件',
        path: url + '/uploadfile',
        type: 'post',
        example: url + '/uploadfile'
      },
      {
        desc: '上传多个文件',
        path: url + '/uploadfiles',
        type: 'post',
        example: url + '/uploadfiles'
      }
    ]
  }
})

export default router
