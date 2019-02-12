var stream = require('stream')
const {Storage} = require('@google-cloud/storage')
const storage = new Storage({
  projectId: "thuonghieu-2ff3b",
  keyFilename: __dirname + "/serviceAccountKey.json"
})
const bucket = storage.bucket("gs://thuonghieu-2ff3b.appspot.com/")
const envDev = false
module.exports = {
  //upload duoi dang base 64
  uploadImage: function (base64, filename) {
    return new Promise( (fullfill, reject) => {
      if(envDev) filename = '/test' + filename
      var ex = base64.substring("data:image/".length, base64.indexOf(";base64"))
      if(ex != 'gif' && ex != 'png' && ex != 'jpeg') {
        return reject('f_favicon invalid upload')
      }
      var file = bucket.file(filename + '.' + ex)
      base64 = base64.replace(/^data:image\/\w+;base64,/, '')
      var bufferStream = new stream.PassThrough()
      bufferStream.end(Buffer.from(base64, 'base64'))
      bufferStream.pipe(file.createWriteStream({
        metadata: {
          contentType: 'image/' + ex,
          metadata: {
            custom: 'metadata'
          }
        }
      })).on('error', function(err) {
        return reject('Loi upload Favicon')
      }).on('finish', function() {
        return fullfill(filename + '.' + ex)
      })
    })

  },
  //upload duoi dang file
  uploadImageFile: function (req, filename) {
    return new Promise( (fullfill, reject) => {
      if(envDev) filename = '/test' + filename
      if(!req.files['image']) return reject('File not found')
      if(!req.files['image'][0]) return reject('File not found')
      var image = req.files['image'][0]
      var ex = null
      switch (image.mimetype) {
        case 'image/jpeg':
          ex = 'jpg'
          break
        case 'image/png':
          ex = 'png'
          break
        case 'image/gif':
          ex = 'gif'
          break
        default:
          ex = null
          break
      }
      if(!ex) throw 'Not a image'
      var file = bucket.file(filename + '.' + ex)
      var bufferStream = new stream.PassThrough()
      bufferStream.end(image.buffer)
      bufferStream.pipe(file.createWriteStream({
        metadata: {
          contentType: 'image/' + ex,
          metadata: {
            custom: 'metadata'
          }
        }
      })).on('error', function(err) {
        return reject('Upload file error')
      }).on('finish', function() {
        return fullfill(filename + '.' + ex)
      })
    })
  },
  //get image info
  getImage: function (url) {
    return new Promise( (fullfill, reject) => {
      const file = bucket.file(url)
      file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      }).then((data) => {
        return fullfill(data[0])
      }).catch((err) => {
        return reject(err)
      })
    })
  },

  //delete image
  deleteImage: function (url) {
    return new Promise( (fullfill, reject) => {
      const file = bucket.file(url)
      file.delete().then((data) => {
        return fullfill(data[0])
      }).catch((err) => {
        return reject(err)
      })
    })
  },
}
