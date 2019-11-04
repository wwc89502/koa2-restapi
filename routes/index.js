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
        example: url + '/article',
        params: {
          cate_id: '分类id',
          post_content: '内容',
          post_title: '标题',
          post_status: '文章状态',
          comment_status: '评论状态',
        }
      },
      {
        desc: '文章更改',
        path: url + '/article/:id',
        type: 'put',
        example: url + '/article/328',
        params: {
          cate_id: '分类id',
          post_content: '内容',
          post_title: '标题',
          post_status: '文章状态',
          comment_status: '评论状态',
        }
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
        example: url + '/article_cate',
        params: {
          cate_title: '分类名'
        }
      },
      {
        desc: '文章分类更改',
        path: url + '/article_cate/:id',
        type: 'put',
        example: url + '/article_cate/328',
        params: {
          cate_title: '分类名'
        }
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
        example: url + '/picture',
        params: {
          cate_id: '分类id',
          pic_content: '内容',
          pic_title: '标题',
          upload_url: '图片链接',
          show_status: '是否展示',
          comment_status: '评论状态',
        }
      },
      {
        desc: '照片更改',
        path: url + '/picture/:id',
        type: 'put',
        example: url + '/picture/328',
        params: {
          cate_id: '分类id',
          pic_content: '内容',
          pic_title: '标题',
          upload_url: '图片链接',
          show_status: '是否展示',
          comment_status: '评论状态',
        }
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
        desc: '获取照片分类详情',
        path: url + '/picture_cate/:id',
        type: 'get',
        example: url + '/picture_cate/328'
      },
      {
        desc: '照片分类创建',
        path: url + '/picture_cate',
        type: 'post',
        example: url + '/picture_cate',
        params: {
          cate_title: '分类名'
        }
      },
      {
        desc: '照片分类更改',
        path: url + '/picture_cate/:id',
        type: 'put',
        example: url + '/picture_cate/328',
        params: {
          cate_title: '分类名'
        }
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
        desc: '获取项目详情',
        path: url + '/projects/:id',
        type: 'get',
        example: url + '/projects/2'
      },
      {
        desc: '项目创建',
        path: url + '/projects',
        type: 'post',
        example: url + '/projects',
        params: {
          title: '标题',
          name: '名称',
          desc: '描述',
          technology: '技术栈',
          viewAddress: '浏览地址',
          codeAddress: '代码地址',
          complete_time: '完成时间',
          isShow: '是否展示'
        }
      },
      {
        desc: '项目更改',
        path: url + '/projects/:id',
        type: 'put',
        example: url + '/projects/1',
        params: {
          title: '标题',
          name: '名称',
          desc: '描述',
          technology: '技术栈',
          viewAddress: '浏览地址',
          codeAddress: '源码地址',
          complete_time: '完成时间',
          isShow: '是否展示'
        }
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
        path: url + '/user/getUserInfo',
        type: 'post',
        example: url + '/user/getUserInfo'
      },
      {
        desc: '注册',
        path: url + '/user/resiger',
        type: 'post',
        example: url + '/user/resiger',
        params: {
          password: '密码',
          email: '邮箱',
          username: '账号'
        }
      },
      {
        desc: '登录',
        path: url + '/user/login',
        type: 'post',
        example: url + '/user/login',
        params: {
          password: '密码',
          username: '账号 || 邮箱'
        }
      },
      {
        desc: '修改密码',
        path: url + '/user/setPwd',
        type: 'post',
        example: url + '/user/setPwd',
        params: {
          oPwd: '原密码',
          newPwd: '新密码',
        }
      },
      {
        desc: '修改用户信息',
        path: url + '/user/setUserInfo',
        type: 'post',
        example: url + '/user/setUserInfo',
        params: {
          email: '邮箱',
          nicename: '昵称',
          avatar: '头像url'
        }
      }
    ],
    Upload: [
      {
        desc: '上传单个文件(又拍云--暂停使用)',
        path: url + '/putFile',
        type: 'post',
        example: url + '/putFile'
      },
      {
        desc: '上传单个文件(七牛云)',
        path: url + '/putFile',
        type: 'post',
        example: url + '/putFile'
      },
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
