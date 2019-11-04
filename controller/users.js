import bcrypt from 'bcryptjs'
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

import { verToken, getTime } from '../tools'

//统一设置token有效时间
const expireTime = '24h'

//数据库操作类
class usersModule {

  static async getUserInfo (username) { // 登录后查询用户信息-需验证token
    return await users.findOne({
      where: {
        [Op.or]: [{username: username}, {email: username}]
      },
      attributes: {exclude: ['password']}
    })
  }

  static async getUserPwd (username) { // 仅后台使用不开放
    return await users.findOne({
      where: {
        [Op.or]: [{username: username}, {email: username}]
      }
    })
  }

  static async resiger ({nicename, email, username, password}) {
    return await users.create({
      nicename,
      email,
      username,
      password,
      registered_time: getTime()
    })
  }

  static async setUserInfo ({nicename, email, avatar}, username) {
    console.log({nicename, email, avatar}, username)
    return await users.update({
      nicename,
      email,
      avatar
    }, {
      where: {
      [Op.or]: [{username: username}]
    }
    })
  }

  static async setPwd (password, username) {
    return await users.update({
      password
    }, {
      where: {
        [Op.or]: [{username: username}]
      }
    })
  }
}

export default class usersController {
  static async getUserInfo (ctx) {
    const token = ctx.headers.authorization

    try {
      const result = await verToken(token)
      const data = await usersModule.getUserInfo(result.user)
      return ctx.body = {
        status: 1,
        userInfo: data,
        msg: '获取用户信息成功'
      }
    } catch (error) {
      ctx.status = 401
      return ctx.body = {
        status: 0,
        msg: error.message
      }
    }
  }

  static async setUserInfo (ctx) {
    const token = ctx.headers.authorization
    const req = ctx.request.body

    try {
      const result = await verToken(token)
      const data = await usersModule.getUserInfo(result.user)

      if (data) {
        const param = {
          email: req.email,
          nicename: req.nicename,
          avatar: req.avatar
        }
        const res = await usersModule.setUserInfo(param, data.username)

        if (res) {
          ctx.response.status = 200
          ctx.body = {
            status: 1,
            msg: '修改成功'
          }
        }

      } else {
        return ctx.body = {
          status: 0,
          msg: '该用户尚未注册'
        }
      }
    } catch (error) {
      ctx.status = 401
      return ctx.body = {
        status: 0,
        msg: error.message
      }
    }
  }

  static async setPwd (ctx) {
    const token = ctx.headers.authorization
    const req = ctx.request.body

    try {
      const result = await verToken(token)
      const data = await usersModule.getUserInfo(result.user)

      if (data) {
        const info = await usersModule.getUserPwd(data.username)
        if (bcrypt.compareSync(req.oPwd, info.password)) {
          const hash = bcrypt.hashSync(req.newPwd, 10)

          const res = await usersModule.setPwd(hash, data.username)
          if (res) {
            ctx.response.status = 200
            ctx.body = {
              status: 1,
              msg: '密码修改成功'
            }
          }
        } else {
          return ctx.body = {
            status: 0,
            msg: '用户密码错误'
          }
        }
      } else {
        return ctx.body = {
          status: 0,
          msg: '该用户尚未注册'
        }
      }
    } catch (error) {
      ctx.status = 401
      return ctx.body = {
        status: 0,
        msg: error.message
      }
    }
  }

  static async resiger (ctx) {
    const req = ctx.request.body

    if (req.username && req.email && req.password) {
      try {
        const query = await usersModule.getUserPwd(req.username)
        if (query) {
          ctx.response.status = 200
          ctx.body = {
            status: 0,
            msg: '用户已存在'
          }
        } else {
          const hash = bcrypt.hashSync(req.password, 10)
          const param = {
            password: hash,
            email: req.email,
            username: req.username,
            nicename: req.username
          }
          const data = await usersModule.resiger(param)

          ctx.response.status = 200
          ctx.body = {
            status: 1,
            msg: '用户注册成功',
            userInfo: {
              username: req.username
            }
          }
        }

      } catch (error) {
        console.log(error)
        ctx.response.status = 416
        ctx.body = {
          status: 0,
          msg: '参数不齐全'
        }
      }
    }
  }

  static async login (ctx) {
    const req = ctx.request.body
    if (!req.username || !req.password) {
      return ctx.body = {
        status: 0,
        msg: '用户名或密码不能为空'
      }
    } else {
      const data = await usersModule.getUserPwd(req.username)

      if (data) {
        if (bcrypt.compareSync(req.password, data.password)) {
          //生成token，验证登录有效期
          const token = jwt.sign({
            user: req.username,
            password: req.password
          }, global.koajwtStr, {expiresIn: expireTime})
          return ctx.body = {
            status: 1,
            token: token,
            msg: '登录成功'
          }
        } else {
          return ctx.body = {
            status: 0,
            msg: '用户密码错误'
          }
        }
      } else {
        return ctx.body = {
          status: 0,
          msg: '该用户尚未注册'
        }
      }
    }

  }
}
