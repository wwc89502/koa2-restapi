import jwt from 'jsonwebtoken'

const verToken = token => {
  return new Promise((resolve, rejece) => {
    const info = jwt.verify(token, '123456')
    resolve(info)
  })
}
export default verToken
