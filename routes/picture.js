import Router from 'koa-router'
import pictureController from '../controller/picture'

const router = new Router({
  prefix: '/api/picture'
})

// 照片列表
router.get('/', pictureController.getList)

// 照片详情
router.get('/:id', pictureController.getDetail)

// 照片创建
router.post('/', pictureController.create)

// 照片更改
router.put('/:id', pictureController.update)

// 照片删除
router.del('/:id', pictureController.delect)

export default router
