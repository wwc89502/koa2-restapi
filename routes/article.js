import Router from 'koa-router'
import articleController from '../controller/article'

const router = new Router({
  prefix: '/api'
})

// 文章列表
router.get('/article', articleController.getList)

// 文章详情
router.get('/article/:id', articleController.getArticle)

// 文章创建
router.post('/article', articleController.createArticle)

// 文章更改
router.put('/article/:id', articleController.updateArticle)

// 文章删除
router.del('/article/:id', articleController.delectArticle)

export default router
