import Router from 'koa-router'
import uploadController from '../controller/upload'
import uploadUpyunController from '../controller/upload-upyun'

const router = new Router({
  prefix: '/api'
})

// 上传单个文件
router.post('/uploadfile', uploadController.uploadfile)

// 上传多个文件
router.post('/uploadfiles', uploadController.uploadfiles)

// 上传单个文件（Upyun）
router.post('/putFile', uploadUpyunController.putFile)
router.get('/getFile', uploadUpyunController.getFile)


// 上传单个文件（Upyun）
// router.get('/putFile', uploadUpyunController.putFile)

export default router
