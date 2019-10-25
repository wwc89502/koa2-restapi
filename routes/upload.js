import Router from 'koa-router'
import uploadController from '../controller/upload'

const router = new Router({
  prefix: '/api'
})

// 上传单个文件
router.post('/uploadfile', uploadController.uploadfile)

// 上传多个文件
router.post('/uploadfiles', uploadController.uploadfiles)

export default router
