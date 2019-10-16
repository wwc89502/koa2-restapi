import Router from 'koa-router'
import articleController from '../controller/article'

const router = new Router({
  prefix: '/api/article'
})

// 文章列表
router.get('/', articleController.getList)

// 文章详情
router.get('/:id', articleController.getDetail)

// 文章创建
router.post('/', articleController.create)

// 文章更改
router.put('/:id', articleController.update)

// 文章删除
router.del('/:id', articleController.delect)

export default router
