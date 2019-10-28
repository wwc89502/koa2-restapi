import jwt from 'jsonwebtoken'

const verToken = token => {
  return new Promise((resolve, rejece) => {
    const info = jwt.verify(token.split(' ')[1], global.koajwtStr)
    resolve(info)
    rejece({
      status: 0,
      message : info.message
    })
  })
}

export default verToken
