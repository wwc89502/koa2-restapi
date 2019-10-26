import DB from '../config/db'

//引入sequelize对象
const Sequelize = DB.sequelize

//引入数据表模型
const picture = Sequelize.import('../module/picture')
//自动创建表
picture.sync({force: false})

import { getTime } from '../tools'

//数据库操作类
class pictureModule {
  static async getTotal (show_status, cate_id) {
    let obj = {}
    if (show_status) {
      obj = {
        show_status
      }
    }
    if (cate_id) {
      obj = Object.assign(obj, {
        cate_id
      })
    }

    return await picture.findAndCountAll({
      where: obj
    })

  }

  static async getList (show_status, offset, limit, cate_id) {
    let obj = {}
    if (show_status) {
      obj = {
        show_status
      }
    }
    if (cate_id) {
      obj = Object.assign(obj, {
        cate_id
      })
    }
    return await picture.findAll({
      offset: offset,
      limit: limit,
      where: obj,
      order: [
        ['ID', 'DESC']
      ]
    })
  }

  static async create ({cate_id, show_status, pic_title, upload_id, pic_content, comment_status}) {
    return await picture.create({
      created_date: getTime(),
      pic_content,
      pic_title,
      show_status,
      comment_status,
      pic_name: encodeURIComponent(pic_title),
      modified_date: getTime(),
      cate_id,
      upload_id,
      comment_count: 0
    })
  }

  static async getDetail (ID) {
    return await picture.findOne({
      where: {
        ID
      }
    })
  }

  static async update (ID, {cate_id, show_status, pic_title, upload_id, pic_content, comment_status}) {
    return await picture.update({
      pic_content,
      pic_title,
      show_status,
      comment_status,
      pic_name: encodeURIComponent(pic_title),
      modified_date: getTime(),
      cate_id,
      upload_id,
    }, {
      where: {
        ID
      }
    })
  }

  static async delect (ID) {
    return await picture.destroy({
      where: {
        ID
      }
    })
  }
}

export default class pictureController {
  static async getList (ctx) {
    const show_status = ctx.query.status
    const cate_id = ctx.query.cate_id || 0

    let currentPage = Number(ctx.query.page) || 1
    let num = Number(ctx.query.num) || 10
    let startPage = (currentPage - 1) * num
    const total = (await pictureModule.getTotal(show_status, cate_id))['count']

    let totalPages = Math.ceil(total / num)

    const data = await pictureModule.getList(show_status, startPage, num, cate_id)

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
    const data = await pictureModule.getDetail(Number(params.id))

    if (data) {
      ctx.body = {
        status: 1,
        data: data
      }
    } else {
      ctx.body = {
        status: 0,
        msg: '图片不存在'
      }
    }
  }

  static async create (ctx) {
    const req = ctx.request.body
    let obj = {
      cate_id: req.cate_id || 0,
      pic_content: req.pic_content || '',
      pic_title: req.pic_title || '',
      upload_id: req.upload_id || '',
      show_status: req.show_status || 1,
      comment_status: req.comment_status || 'open'
    }
    const res = await pictureModule.create(obj)
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
    let data = await pictureModule.getDetail(Number(params.id))

    if (data) {
      const req = ctx.request.body

      let obj = {
        cate_id: req.cate_id || 0,
        pic_content: req.pic_content || '',
        pic_title: req.pic_title || '',
        upload_id: req.upload_id || '',
        show_status: req.show_status || 1,
        comment_status: req.comment_status || 'open'
      }

      const res = await pictureModule.update(Number(params.id), obj)

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
    const data = await pictureModule.getDetail(Number(params.id))

    if (data) {
      const res = await pictureModule.delect(Number(params.id))

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
