import Router from 'koa-router'
import otherController from '../controller/other'

const router = new Router({
  prefix: '/api'
})

//天气
router.get('/weather/:location', otherController.getWeather)

export default router
