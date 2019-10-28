import Router from 'koa-router'
import usersController from '../controller/users'

const router = new Router({
  prefix: '/api/user'
})

//用户注册
router.post('/resiger', usersController.resiger)

//用户登录
router.post('/login', usersController.login)

//获取用户信息
router.post('/getUserInfo', usersController.getUserInfo)

export default router
