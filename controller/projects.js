import DB from '../config/db'

//引入sequelize对象
const Sequelize = DB.sequelize

//引入数据表模型
const projects = Sequelize.import('../module/projects')
//自动创建表
projects.sync({force: false})

//数据库操作类
class projectsModule {
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

  static async getList () {
    return await projects.findAll({
      order: [
        ['id', 'DESC']
      ]
    })
  }

  static async create ({title, name, desc, technology, viewAddress, codeAddress, complete_time, isShow}) {
    return await projects.create({
      title,
      name,
      desc,
      technology,
      viewAddress,
      codeAddress,
      complete_time,
      isShow
    })
  }

  static async update (ID, {title, name, desc, technology, viewAddress, codeAddress, complete_time, isShow}) {
    return await projects.update({
      title,
      name,
      desc,
      technology,
      viewAddress,
      codeAddress,
      complete_time,
      isShow
    }, {
      where: {
        ID
      }
    })
  }

  static async delect (ID) {
    return await projects.destroy({
      where: {
        ID
      }
    })
  }
}

export default class projectsController {
  static async getList (ctx) {
    let data = await projectsModule.getList()

    data.forEach(item => {
      item['dataValues'].technology = item['dataValues'].technology.split(',')
    })

    ctx.body = {
      data
    }
  }

  static async create (ctx) {
    const req = ctx.request.body
    let obj = {
      title: req.title || '',
      name: req.name || '',
      desc: req.desc || '',
      technology: req.technology || '',
      viewAddress: req.viewAddress || '',
      codeAddress: req.codeAddress || '',
      complete_time: req.complete_time || await projectsModule.getTime(),
      isShow: req.isShow || 1,
    }
    const res = await projectsModule.create(obj)
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
    const req = ctx.request.body
    const params = ctx.params

    let obj = {
      title: req.title || '',
      name: req.name || '',
      desc: req.desc || '',
      technology: req.technology || '',
      viewAddress: req.viewAddress || '',
      codeAddress: req.codeAddress || '',
      complete_time: req.complete_time || await projectsModule.getTime(),
      isShow: req.isShow || 1,
    }

    const res = await projectsModule.update(Number(params.id), obj)
    if (res) {

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
    const data = await projectsModule.delect(Number(params.id))

    if (data) {

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
