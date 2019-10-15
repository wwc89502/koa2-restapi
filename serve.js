import Koa from 'koa'
// import Serve from 'koa-static'
import Router from 'koa-router'
import cors from 'koa2-cors'
import DB from './config/db'

const app = new Koa()
const router = new Router()

let errorCode = null

function getError (errorCode, msg = '参数错误') {
  let error = {
    status: 0,
    message: msg
  }
  switch (errorCode) {
    case 400 :
      break
    case 404 :
      break
  }
  return error
}

router.prefix('/api')

router.get('/', (ctx, next) => {
  ctx.body = 'API'
  next()
})

// 文章相关
router.get('/article', async (ctx, next) => {
  // 列表

  let currentPage = Number(ctx.query.page) || 1
  let num = Number(ctx.query.num) || 10
  // 需要对currentPage num进行验证
  let startPage = (currentPage - 1) * num
  let total = (await DB.query(`SELECT Count(*) FROM dblog_posts WHERE post_type="post" AND post_status="publish"`))[0]['Count(*)']
  let totalPages = Math.ceil(total / num)

  ctx.body = {
    totalPages: totalPages,
    total: total,
    currentPage: currentPage,
    num: num,
    list: await DB.query(`SELECT * FROM dblog_posts WHERE post_type="post" AND post_status="publish" ORDER BY ID DESC LIMIT ${startPage},${num}`)
  }
  next()
})
  .get('/article/:id', async (ctx, next) => {
    // 详情

    if (isNaN(ctx.params.id)) ctx.body = getError()
    else {
      let data = await DB.query(`SELECT * FROM dblog_posts WHERE id=${ctx.params.id} AND post_type="post" AND post_status="publish"`)
      if (data.length > 0) {
        ctx.body = Object.assign(data[0], {
          status: 1
        })
      } else {
        ctx.body = getError(404, '没有此文章')
      }
    }
    next()
  })
  .post('/article/:id', async (ctx, next) => {
    // 新增

    if (isNaN(ctx.params.id)) ctx.body = getError(400, '添加失败')
    next()
  })
  .put('/article/:id', async (ctx, next) => {
    // 修改

    if (isNaN(ctx.params.id)) ctx.body = getError(400, '修改失败')
    next()
  })
  .del('/article/:id', async (ctx, next) => {
    // 删除

    if (isNaN(ctx.params.id)) ctx.body = getError(400, '删除失败')
    next()
  })

// 友情链接
router.get('/friend-link', async (ctx, next) => {
  ctx.body = await DB.query(`SELECT * FROM dblog_links`)
  next()
})

// 云标签
router.get('/tag', async (ctx, next) => {
  ctx.body = await DB.query(`SELECT * FROM dblog_terms`)
  next()
})

// 登录
router.post('/login', async (ctx, next) => {
  next()
})

// app.use(Serve(__dirname + '/dist/', {extensions: ['html']}))
app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('app listen at 3000')
})
