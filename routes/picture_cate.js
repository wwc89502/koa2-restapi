import Router from 'koa-router'
import pictureCateController from '../controller/picture_cate'

const router = new Router({
  prefix: '/api/picture_cate'
})

// 照片分类列表
router.get('/', pictureCateController.getList)

// 照片分类详情
router.get('/:id', pictureCateController.getDetail)

// 照片分类创建
router.post('/', pictureCateController.create)

// 照片分类更改
router.put('/:id', pictureCateController.update)

// 照片分类删除
router.del('/:id', pictureCateController.delect)

export default router
