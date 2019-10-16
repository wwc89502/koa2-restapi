import DB from '../config/db'

//引入sequelize对象
const Sequelize = DB.sequelize

//引入数据表模型
const article = Sequelize.import('../module/article')
//自动创建表
article.sync({force: false})

//数据库操作类
class articleModule {
  static async getTime (time = new Date(), format = 'yyyy-MM-dd HH:mm:ss') {
    let t = new Date(time)
    let tf = function (i) {return (i < 10 ? '0' : '') + i}
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear())
          break
        case 'MM':
          return tf(t.getMonth() + 1)
          break
        case 'mm':
          return tf(t.getMinutes())
          break
        case 'dd':
          return tf(t.getDate())
          break
        case 'HH':
          return tf(t.getHours())
          break
        case 'ss':
          return tf(t.getSeconds())
          break
      }
    })
  }

  static async getTotal (post_status) {
    let obj = {}
    if (post_status) {
      obj = {
        post_status
      }
    }

    return await article.findAndCountAll({
      where: obj
    })

  }

  static async getList (post_status, offset, limit) {
    let obj = {}
    if (post_status) {
      obj = {
        post_status
      }
    }
    return await article.findAll({
      offset: offset,
      limit: limit,
      where: obj,
      order: [
        ['ID', 'DESC']
      ]
    })
  }

  static async create ({post_content, post_title, post_status, comment_status, post_content_filtered}) {
    return await article.create({
      post_date: await articleModule.getTime(),
      post_content,
      post_title,
      post_status,
      comment_status,
      post_name: encodeURIComponent(post_title),
      post_modified: await articleModule.getTime(),
      post_content_filtered,
      comment_count: 0
    })
  }

  static async getDetail (ID) {
    return await article.findOne({
      where: {
        ID
      }
    })
  }

  static async update (ID, {post_content, post_title, post_status, comment_status, post_content_filtered}) {
    return await article.update({
      post_content,
      post_title,
      post_status,
      comment_status,
      post_name: encodeURIComponent(post_title),
      post_modified: await articleModule.getTime(),
      post_content_filtered
    }, {
      where: {
        ID
      }
    })
  }

  static async delect (ID) {
    return await article.destroy({
      where: {
        ID
      }
    })
  }
}

export default class articleController {
  static async getList (ctx) {
    const post_status = ctx.query.status // draft publish

    let currentPage = Number(ctx.query.page) || 1
    let num = Number(ctx.query.num) || 10
    let startPage = (currentPage - 1) * num
    const total = (await articleModule.getTotal(post_status))['count']

    let totalPages = Math.ceil(total / num)

    const data = await articleModule.getList(post_status, startPage, num)

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
      post_content: req.post_content || '',
      post_title: req.post_title || '',
      post_status: req.post_status || 'publish',
      comment_status: req.comment_status || 'open',
      post_content_filtered: req.post_content_filtered || ''
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
        post_content: req.post_content || '',
        post_title: req.post_title || '',
        post_status: req.post_status || 'publish',
        comment_status: req.comment_status || 'open',
        post_content_filtered: req.post_content_filtered || ''
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
