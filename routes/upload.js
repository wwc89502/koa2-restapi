import Router from 'koa-router'
import uploadController from '../controller/upload'
import uploadUpyunController from '../controller/upload-upyun'
import uploadQiniuController from '../controller/upload-qiniu'

const router = new Router({
  prefix: '/api'
})

// 上传单个文件
router.post('/uploadfile', uploadController.uploadfile)

// 上传多个文件
router.post('/uploadfiles', uploadController.uploadfiles)

// 上传单个文件（Upyun）
// router.post('/putFile', uploadUpyunController.putFile)

// 上传单个文件（qiniu）
router.post('/putFile', uploadQiniuController.putFile)


export default router
