import fs from 'fs'
import path from 'path'

import qiniu from 'qiniu'
import { getTime } from '../tools'

const accessKey = 'tNUOzI2xu-RZeS6938c5-D_EkGBtqHeSKGCVIjAG'
const secretKey = 'dIg-d4prdmTj6888CTBVZfQsn_fbG70KQgy9KHJb'
const bucket = 'qiniu-chen'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: bucket
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

const cdnUrl = 'https://cdn.wweichen.com.cn'

var config = new qiniu.conf.Config()
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0
// 是否使用https域名
config.useHttpsDomain = true
// 上传是否使用cdn加速
config.useCdnDomain = true

class uploadUpyunModule {
  static async makeDir (path) {
    /*let status = null
    let msg = null

    const headFile = await uploadUpyunModule.headFile(path)

    if (headFile.status === 1) {
      if (!headFile.data) {
        const data = await client.makeDir(path).then(function (data) {
          status = 1
          return {
            data,
            status
          }
        })
          .catch(function (err) {
            status = 0
            msg = '文件创建失败'
            return {
              err,
              status,
              msg
            }
          })
        if (data.status !== 1) {
          return data
        }
      } else {
        return headFile
      }
    } else {
      return headFile
    }*/
  }

  static async headFile (path) {
    /*let status = null
    let msg = null
    const data = await client.headFile(path).then(function (data) {
      status = 1
      return data === false ? false : true
    })
      .catch(function (err) {
        status = 0
        msg = '文件查找失败'
        return err
      })
    return {
      data,
      status,
      msg
    }*/
  }

  static async getFile (path) {
    /*let status = null
    let msg = null
    const data = await client.getFile(path).then(function (data) {
      status = 1
      return data
    })
      .catch(function (err) {
        status = 0
        msg = '文件查找失败'
        return err
      })
    return {
      data,
      status,
      msg
    }*/

  }

  static async putFile (path, file, opt) {
    /*let status = null
    let msg = null
    const data = await client.putFile(path, file, opt).then(function (data) {
      status = 1
      return data
    })
      .catch(function (err) {
        status = 0
        msg = '文件上传失败'
        return err
      })
    return {
      data,
      status,
      msg
    }*/
  }
}

export default class uploadUpyunController {
  static async getFile (ctx) {
    /*const data = await uploadUpyunModule.getFile(ctx.query.path)
    ctx.body = {
      status: 1,
      data
    }*/
  }

  static async putFile (ctx) {
    const file = ctx.request.files.file // 获取上传文件

    var formUploader = new qiniu.form_up.FormUploader(config)
    var putExtra = new qiniu.form_up.PutExtra()
    var readableStream = fs.createReadStream(file.path) // 可读的流

    let extname = path.extname(file.name)

    let basePath = 'Upload'

    let isImg = false

    if (extname == '.jpg'
      || extname == '.png'
      || extname == '.gif'
      || extname == '.svg'
      || extname == '.bmp'
      || extname == '.raw') isImg = true

    if (isImg) basePath += '/images/'
    else basePath += '/files/'

    basePath += getTime(new Date(), 'yyyyMM')

    let random = Math.floor(Math.random() * 9000 + 1000).toString()

    let fileName = getTime(new Date(), 'yyyyMMddHHmmss') + '_' + random + extname

    basePath += fileName

    const qiniuUpload = await new Promise((resolve, reject) => {
      formUploader.putStream(uploadToken, basePath, readableStream, putExtra, (respErr, respBody, respInfo) => {
        if (respErr) {
          return resolve({
            msg: '上传失败',
            err: respErr,
            status: 0,
            uploadType: 'qiniu'
          })
        } else {
          let status = 1
          let msg = '上传成功'
          let res = {}
          if (respInfo.status === 200) {
            res = {
              url: '/' + respBody.key,
              cate: isImg ? 'image' : 'file'
            }
          } else {
            status = 0
            msg = '上传失败'
            res = {
              info: respInfo
            }
          }
          return resolve({
            msg,
            data: res,
            status,
            uploadType: 'qiniu'
          })
        }
      })
    })

    ctx.body = qiniuUpload
  }
}
