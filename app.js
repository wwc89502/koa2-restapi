import Koa from 'koa'
import Serve from 'koa-static'
import cors from 'koa2-cors'
import koajwt from 'koa-jwt'
import koaBody from 'koa-body'
import Home from './routes/index'
import Article from './routes/article'
import ArticleCate from './routes/article_cate'
import Picture from './routes/picture'
import PictureCate from './routes/picture_cate'
import Users from './routes/users'
import Projects from './routes/projects'
import Upload from './routes/upload'

const app = new Koa()

global.koajwtStr = '123koajwt456chen789'
global.appPath = __dirname

app
  .use(cors())
  .use(Serve(__dirname + '/', {extensions: ['html']}))
  .use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
  }))
  .use(koajwt({
    secret: global.koajwtStr
  }).unless({
    path: [
      /^\/api\/user\/resiger/,
      /^\/api\/user\/login/,
      /^\/api\/uploadfile/,
      /^\/api\/uploadfiles/,
    ],
    method: 'GET'
  }))
  .use(Home.routes(), Home.allowedMethods())
  .use(Article.routes(), Article.allowedMethods())
  .use(ArticleCate.routes(), ArticleCate.allowedMethods())
  .use(Picture.routes(), Picture.allowedMethods())
  .use(PictureCate.routes(), PictureCate.allowedMethods())
  .use(Users.routes(), Users.allowedMethods())
  .use(Projects.routes(), Projects.allowedMethods())
  .use(Upload.routes(), Upload.allowedMethods())

app.listen(80, () => {
  console.log('app listen at 80')
})
