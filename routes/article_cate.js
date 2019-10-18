import Router from 'koa-router'
import articleCateController from '../controller/article_cate'

const router = new Router({
  prefix: '/api/article_cate'
})

// 文章分类列表
router.get('/', articleCateController.getList)

// 文章分类详情
router.get('/:id', articleCateController.getDetail)

// 文章分类创建
router.post('/', articleCateController.create)

// 文章分类更改
router.put('/:id', articleCateController.update)

// 文章分类删除
router.del('/:id', articleCateController.delect)

export default router
