import DB from '../config/db'

//引入sequelize对象
const Sequelize = DB.sequelize

//引入数据表模型
const articleCate = Sequelize.import('../module/article_cate')
//自动创建表
articleCate.sync({force: false})

import { getTime } from '../tools'

//数据库操作类
class articleCateModule {
  static async getList () {
    return await articleCate.findAll({
      order: [
        ['cate_id', 'DESC']
      ]
    })
  }

  static async create ({cate_title}) {
    return await articleCate.create({
      cate_title,
      created_date: getTime(),
      modified_date: getTime(),
    })
  }

  static async getDetail (cate_id) {
    return await articleCate.findOne({
      where: {
        cate_id
      }
    })
  }

  static async update (cate_id, {cate_title}) {
    return await articleCate.update({
      cate_title,
      modified_date: getTime()
    }, {
      where: {
        cate_id
      }
    })
  }

  static async delect (cate_id) {
    return await articleCate.destroy({
      where: {
        cate_id
      }
    })
  }
}

export default class articleCateController {
  static async getList (ctx) {
    const data = await articleCateModule.getList()

    ctx.body = {
      data
    }
  }

  static async getDetail (ctx) {
    const params = ctx.params
    const data = await articleCateModule.getDetail(Number(params.id))

    if (data) {
      ctx.body = {
        status: 1,
        data: data
      }
    } else {
      ctx.body = {
        status: 0,
        msg: '文章分类不存在'
      }
    }
  }

  static async create (ctx) {
    const req = ctx.request.body
    let obj = {
      cate_title: req.cate_title || ''
    }
    const res = await articleCateModule.createCate(obj)
    if (res) {
      ctx.body = {
        status: 1,
        msg: '创建成功',
        data: res
      }
    } else {
      ctx.body = {
        status: 0,
        msg: '创建失败'
      }
    }
  }

  static async update (ctx) {
    const params = ctx.params
    let data = await articleCateModule.getDetail(Number(params.id))

    if (data) {
      const req = ctx.request.body

      let obj = {
        cate_title: req.cate_title || ''
      }

      const res = await articleModule.update(Number(params.id), obj)

      ctx.body = {
        status: 1,
        msg: '更新成功'
      }
    } else {
      ctx.body = {
        status: 0,
        msg: '更新失败'
      }
    }
  }

  static async delect (ctx) {
    const params = ctx.params
    const data = await articleModule.getDetail(Number(params.id))

    if (data) {
      const res = await articleModule.delect(Number(params.id))

      ctx.body = {
        status: 1,
        msg: '删除成功'
      }
    } else {
      ctx.body = {
        status: 0,
        msg: '删除失败'
      }
    }
  }
}
