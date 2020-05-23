import DB from '../config/db'

//引入sequelize对象
const Sequelize = DB.sequelize

//引入数据表模型
const article = Sequelize.import('../module/article')
//自动创建表
article.sync({force: true})

import { getTime } from '../tools'

//数据库操作类
class articleModule {
  static async getTotal (post_status, cate_id) {
    let obj = {}
    if (post_status) {
      obj = {
        post_status
      }
    }
    if (cate_id) {
      obj = Object.assign(obj, {
        cate_id
      })
    }

    return await article.findAndCountAll({
      where: obj
    })

  }

  static async getList (post_status, offset, limit, cate_id) {
    let obj = {}
    if (post_status) {
      obj = {
        post_status
      }
    }
    if (cate_id) {
      obj = Object.assign(obj, {
        cate_id
      })
    }
    return await article.findAll({
      offset: offset,
      limit: limit,
      where: obj,
      order: [
        ['id', 'DESC']
      ]
    })
  }

  static async create ({cate_id, post_content, post_title, post_status, comment_status}) {
    return await article.create({
      created_date: getTime(),
      post_content,
      post_title,
      post_status,
      comment_status,
      cate_id,
      modified_date: getTime(),
      comment_count: 0
    })
  }

  static async getDetail (id) {
    return await article.findOne({
      where: {
        id
      }
    })
  }

  static async update (id, {cate_id, post_content, post_title, post_status, comment_status}) {
    return await article.update({
      post_content,
      post_title,
      post_status,
      comment_status,
      cate_id,
      modified_date: getTime(),
    }, {
      where: {
        id
      }
    })
  }

  static async delect (id) {
    return await article.destroy({
      where: {
        id
      }
    })
  }
}

export default class articleController {
  static async getList (ctx) {
    const post_status = ctx.query.status // draft publish
    const cate_id = ctx.query.cate_id || 0

    let currentPage = Number(ctx.query.page) || 1
    let num = Number(ctx.query.num) || 10
    let startPage = (currentPage - 1) * num
    const total = (await articleModule.getTotal(post_status, cate_id))['count']

    let totalPages = Math.ceil(total / num)

    const data = await articleModule.getList(post_status, startPage, num, cate_id)

    ctx.body = {
      totalPages: totalPages,
      total: total,
      currentPage: currentPage,
      num: num,
      list: data
    }
  }

  static async getDetail (ctx) {
    const params = ctx.params
    const data = await articleModule.getDetail(Number(params.id))

    if (data) {
      ctx.body = {
        status: 1,
        data: data
      }
    } else {
      ctx.body = {
        status: 0,
        msg: '文章不存在'
      }
    }
  }

  static async create (ctx) {
    const req = ctx.request.body
    let obj = {
      cate_id: req.cate_id || 0,
      post_content: req.post_content || '',
      post_title: req.post_title || '',
      post_status: req.post_status || 'publish',
      comment_status: req.comment_status || 'open',
    }
    const res = await articleModule.create(obj)
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
    let data = await articleModule.getDetail(Number(params.id))

    if (data) {
      const req = ctx.request.body

      let obj = {
        cate_id: req.cate_id || 0,
        post_content: req.post_content || '',
        post_title: req.post_title || '',
        post_status: req.post_status || 'publish',
        comment_status: req.comment_status || 'open',
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
