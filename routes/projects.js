import Router from 'koa-router'
import projectsController from '../controller/projects'

const router = new Router({
  prefix: '/api/projects'
})

// 项目列表
router.get('/', projectsController.getList)

// 项目创建
router.post('/', projectsController.create)

// 项目更改
router.put('/:id', projectsController.update)

// 项目删除
router.del('/:id', projectsController.delect)

export default router
