const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const TMP_DIR = path.resolve(__dirname, 'tmp')

exports.writeImage = function writeImage(base64, name) {
  name = name || `tmp_${Date.now()}`
  const imgName = `${name}.png`
  const imgPath = path.join(TMP_DIR, imgName)
  return new Promise((resolve, reject) => {
    fs.writeFile(imgPath, base64, 'base64', err => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

exports.getImgInfos = function getImgInfos(base64) {
  const buffer = new Buffer(base64, 'base64')
  return sharp(buffer).metadata()
}

exports.readFixture = function readFixture(name) {
  const fileName = path.resolve(__dirname, 'fixtures', name)
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, { encoding: 'utf8' }, (err, content) => {
      if (err) {
        return reject(err)
      }
      resolve(content)
    })
  })
}
