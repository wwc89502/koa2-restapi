import Koa from 'koa'
import Serve from 'koa-static'
import cors from 'koa2-cors'
import koaBody from 'koa-body'
import Article from './routes/article'
import Home from './routes/index'

const app = new Koa()

app
  .use(Serve(__dirname + '/', {extensions: ['html']}))
  .use(cors())
  .use(koaBody())
  .use(Home.routes(), Home.allowedMethods())
  .use(Article.routes(), Article.allowedMethods())

app.listen(3000, () => {
  console.log('app listen at 3000')
})
