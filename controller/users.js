import DB from '../config/db'

//引入sequelize对象
const Sequelize = DB.sequelize

//引入数据表模型
const users = Sequelize.import('../module/users')
//自动创建表
users.sync({force: false})

const Op = DB.Op

//引入jwt做token验证
import jwt from 'jsonwebtoken'

import tools from '../tools/index'

//统一设置token有效时间
const expireTime = '1h'

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

  static async getUserInfo (account) { // 登录后查询用户信息-需验证token
    return await users.findOne({
      where: {
        [Op.or]: [{account: account}, {email: account}]
      },
      attributes: {exclude: ['password']}
    })
  }

  static async getUserPwd (account) { // 仅后台使用不开放
    return await users.findOne({
      where: {
        [Op.or]: [{account: account}, {email: account}]
      }
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
}

export default class usersController {
  static async getUserInfo (ctx) {
    const req = ctx.request.body
    const token = ctx.headers.token

    if (token) {
      try {
        const result = await tools.verToken(token)

        if (!req.account) {
          return ctx.body = {
            status: '0',
            desc: '参数错误'
          }
        } else {
          const data = await usersModule.getUserInfo(req.account)

          if (req.account == data.account) {
            return ctx.body = {
              status: '1',
              userInfo: data,
              desc: '获取用户信息成功'
            }
          }
        }
      } catch (error) {
        console.log(error)
        ctx.status = 401
        return ctx.body = {
          status: '0',
          desc: '登陆过期，请重新登陆'
        }
      }
    } else {
      ctx.status = 401
      return ctx.body = {
        status: '0',
        desc: '登陆过期，请重新登陆'
      }
    }
  }

  static async resiger (ctx) {
    const req = ctx.request.body

    if (req.account && req.email && req.password) {
      try {
        const query = await usersModule.getUserPwd(req.account)
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
    const req = ctx.request.body
    if (!req.account || !req.password) {
      return ctx.body = {
        status: '0',
        msg: '用户名或密码不能为空'
      }
    } else {
      const data = await usersModule.getUserPwd(req.account)
      if (data) {
        if (data.password === req.password) {
          //生成token，验证登录有效期
          const token = jwt.sign({
            user: req.account,
            password: req.password
          }, '123456', {expiresIn: expireTime})
          return ctx.body = {
            status: '1',
            token: token,
            desc: '登陆成功'
          }
        } else {
          return ctx.body = {
            status: '0',
            desc: '用户密码错误'
          }
        }
      } else {
        return ctx.body = {
          status: '0',
          desc: '该用户尚未注册'
        }
      }
    }

  }
}
