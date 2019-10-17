import Koa from 'koa'
import Serve from 'koa-static'
import cors from 'koa2-cors'
import koajwt from 'koa-jwt'
import koaBody from 'koa-body'
import Home from './routes/index'
import Article from './routes/article'
import Users from './routes/users'
import Projects from './routes/projects'

const app = new Koa()

app
  .use(Serve(__dirname + '/', {extensions: ['html']}))
  .use(cors())
  .use(koaBody())
  .use(Home.routes(), Home.allowedMethods())
  .use(Article.routes(), Article.allowedMethods())
  .use(Users.routes(), Users.allowedMethods())
  .use(Projects.routes(), Projects.allowedMethods())
  .use(async (ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          status: '0',
          desc: '登陆过期，请重新登陆'
        }
      } else {
        throw err
      }
    })
  })
  .use(koajwt({
    secret: '123456'
  }).unless({
    path: [/^\/user\/regist/, /^\/user\/login/]
  }))

app.listen(3000, () => {
  console.log('app listen at 3000')
})
