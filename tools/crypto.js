import crypto from 'crypto'

const encrypt = str => {
  // 加密
  let md5 = crypto.createHash('md5')
  let password = md5.update(str).digest('base64')
  return password
}

const decrypt = str => {
  // 解密
  let md5 = crypto.createHash('md5')
  let password = md5.update(str).digest('base64')
  return password
}

export default {
  encrypt,
  decrypt
}
