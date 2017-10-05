module.exports = function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => (data += chunk))
    req.on('end', () => {
      try {
        const body = JSON.parse(data)
        resolve(body)
      } catch (err) {
        reject(err)
      }
    })
  })
}
