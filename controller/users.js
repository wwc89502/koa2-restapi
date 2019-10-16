import DB from '../config/db'

//引入sequelize对象
const Sequelize = DB.sequelize

//引入数据表模型
const users = Sequelize.import('../module/users')
//自动创建表
users.sync({force: false})

const Op = DB.Op

//数据库操作类
class usersModule {
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

  static async getUserInfo (account) {
    return await users.findOne({
      where: {
        [Op.or]: [{account: account}, {email: account}]
      },
      attributes: { exclude: ['password'] }
    })
  }

  static async resiger ({nicename, email, account, password}) {
    return await users.create({
      nicename,
      email,
      account,
      password,
      registered_time: await usersModule.getTime()
    })
  }

  static async login () {
    return await users.findOne({
      where: {
        userId
      }
    })
  }
}

export default class usersController {
  static async getUserInfo (ctx) {
    const req = ctx.request.body
    const data = await usersModule.getUserInfo(req.account)

    ctx.body = {
      status: 1,
      data
    }
  }
  static async resiger (ctx) {
    const req = ctx.request.body

    if (req.account && req.email && req.password) {
      try {
        const query = await usersModule.getUserInfo(req.account)
        if (query) {
          ctx.response.status = 200
          ctx.body = {
            code: -1,
            desc: '用户已存在'
          }
        } else {
          const param = {
            password: req.password,
            email: req.email,
            account: req.account,
            nicename: req.account
          }
          const data = await usersModule.resiger(param)

          ctx.response.status = 200
          ctx.body = {
            code: 0,
            desc: '用户注册成功',
            userInfo: {
              account: req.account
            }
          }
        }

      } catch (error) {
        console.log(error)
        ctx.response.status = 416
        ctx.body = {
          code: -1,
          desc: '参数不齐全'
        }
      }
    }
  }

  static async login (ctx) {
    const data = await usersModule.login()
  }
}
