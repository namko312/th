var moment = require('moment')
var firebase = require('../services/uploadFirebase')
module.exports = {
  validateUserUpdateByAdmin: function (user) {
    return new Promise((fullfill, reject) => {
      var run = async () => {
        try {
          var searchUser = await User.findOne({where: {id: user.id}, select: ['f_cover','f_favicon','f_logo']}).populate('images')
          var regrexPassword = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
          //password
          if(!user.password.match(regrexPassword)) {
            throw 'Password phải có 6 đến 20 ký tự và không chứa kí tự đặc biệt'
          }
          //type
          if(user.type != 'business' && user.type != 'producer') {
            throw 'Type not valid'
          }
          //outdate
          if(!moment(parseInt(user.outdate)).isValid()) {
            throw 'Outdate invalid'
          }
          //adminDescription
          if(typeof user.adminDescription != 'string') {
            throw 'Invalid adminDescription'
          }
          //block
          if(typeof user.block != 'boolean') {
            throw 'Invalid block'
          }
          //blockDescription
          if(typeof user.blockDescription != 'string') {
            throw 'Invalid blockDescription'
          }
          //block and blockDescription relasionship
          if(user.block === false) {
            user.blockDescription = ''
          }
          //check
          if(typeof user.check != 'boolean') {
            throw 'Invalid check'
          }
          //notNeedCheck
          if(typeof user.notNeedCheck != 'boolean') {
            throw 'Invalid notNeedCheck'
          }
          //f_zalo
          if(typeof user.f_zalo != 'string') {
            throw 'Invalid f_zalo'
          }
          //f_facebook
          if(typeof user.f_facebook != 'string') {
            throw 'Invalid f_facebook'
          }
          //f_phone
          if(typeof user.f_phone != 'string') {
            throw 'Invalid f_phone'
          }
          //f_address
          if(typeof user.f_address != 'string') {
            throw 'Invalid f_address'
          }
          //f_email
          if(typeof user.f_email != 'string') {
            throw 'Invalid f_email'
          }
          //f_website
          if(typeof user.f_website != 'string') {
            throw 'Invalid f_website'
          }
          //f_title
          if(typeof user.f_title != 'string') {
            throw 'Invalid f_title'
          }
          //f_description
          if(typeof user.f_description != 'string') {
            throw 'Invalid f_description'
          }
          if(user.f_description.match(/<script[\s\S]*?>[\s\S]*?<\/script>/)){
            throw 'Invalid f_description cause have xxxx'
          }
          //f_html
          if(typeof user.f_html != 'string') {
            throw 'Invalid f_html'
          }
          if(user.f_html.match(/<script[\s\S]*?>[\s\S]*?<\/script>/)){
            throw 'Invalid f_html cause have xxxx'
          }
          var imgs_in_f_html = user.f_html.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
          var listImg = []
          if(imgs_in_f_html && imgs_in_f_html.length) {
            for(var i = 0; i < imgs_in_f_html.length; i++) {
              var matchSrc = imgs_in_f_html[i].match(/src="(.*?)"/)
              if(matchSrc) {
                listImg.push(matchSrc[1].replace(/&amp;/g, '&'))
              }
            }
            var listxoaimg = []
            for(var i = 0; i <  searchUser.images.length; i++) {
              for(var j = 0; j < listImg.length; j++) {
                if(listImg[j] == searchUser.images[i].link) break
                if(j == listImg.length - 1) {
                  listxoaimg.push(searchUser.images[i])
                }
              }
            }
            for(var i = 0; i < listxoaimg.length; i++) {
              await Image.destroy({id: listxoaimg[i].id})
              await firebase.deleteImage(listxoaimg[i].path)
            }
          }
          //f_favicon
          if(typeof user.f_favicon != 'string') {
            throw 'Invalid f_favicon'
          }
          if(user.f_favicon_upload) {
            user.f_favicon = await firebase.uploadImage(user.f_favicon, `/profile/${user.id}/favicon`)
            user.f_favicon = await firebase.getImage(user.f_favicon)
          } else {
            user.f_favicon = searchUser.f_favicon
          }
          //f_logo
          if(typeof user.f_logo != 'string') {
            throw 'Invalid f_logo'
          }
          if(user.f_logo_upload) {
            user.f_logo = await firebase.uploadImage(user.f_logo, `/profile/${user.id}/logo`)
            user.f_logo = await firebase.getImage(user.f_logo)
          } else {
            user.f_logo = searchUser.f_logo
          }
          //f_cover
          if(typeof user.f_cover != 'string') {
            throw 'Invalid f_cover'
          }
          if(user.f_cover_upload) {
            user.f_cover = await firebase.uploadImage(user.f_cover, `/profile/${user.id}/cover`)
            user.f_cover = await firebase.getImage(user.f_cover)
          } else {
            user.f_cover = searchUser.f_cover
          }

          //f_preview REMOVE
          user = _.omit(user, 'f_preview')
          //id REMOVE
          user = _.omit(user, 'id')
          user = _.omit(user, 'images')
          user = _.omit(user, 'updatedAt')
          return fullfill(user)
        } catch (e) {
          return reject(e)
        }
      }
      run()
    })
  },
  validateMe: function (req) {
    return new Promise((fullfill, reject) => {
      var run = async  () => {
        try {
          var uid = req.session.passport.user.id
          if(!uid) throw 'User not found'
          var user = await User.findOne({
            where: {
              id: uid
            },
            select: ['username' , 'f_zalo', 'f_facebook', 'f_phone', 'f_address', 'f_email', 'f_website', 'f_title', 'f_description', 'f_html', 'f_favicon', 'f_logo', 'f_cover']
          })
          if(!user) throw 'User not found'
          return fullfill(user)
        } catch (err) {
          return reject(err)
        }
      }
      run()
    })
  },
  validateUserUpdateByUser: function (user) {
    return new Promise((fullfill, reject) => {
      var run = async () => {
        try {
          var return_user = {}
          var searchUser = await User.findOne({where: {id: user.id}, select: ['f_cover','f_favicon','f_logo']}).populate('images')
          //f_zalo
          if(typeof user.f_zalo != 'string') {
            throw 'Invalid f_zalo'
          }
          //f_facebook
          if(typeof user.f_facebook != 'string') {
            throw 'Invalid f_facebook'
          }
          //f_phone
          if(typeof user.f_phone != 'string') {
            throw 'Invalid f_phone'
          }
          //f_address
          if(typeof user.f_address != 'string') {
            throw 'Invalid f_address'
          }
          //f_email
          if(typeof user.f_email != 'string') {
            throw 'Invalid f_email'
          }
          //f_website
          if(typeof user.f_website != 'string') {
            throw 'Invalid f_website'
          }
          //f_title
          if(typeof user.f_title != 'string') {
            throw 'Invalid f_title'
          }
          //f_description
          if(typeof user.f_description != 'string') {
            throw 'Invalid f_description'
          }
          if(user.f_description.match(/<script[\s\S]*?>[\s\S]*?<\/script>/)){
            throw 'Invalid f_description cause have xxxx'
          }
          //f_html
          if(typeof user.f_html != 'string') {
            throw 'Invalid f_html'
          }
          if(user.f_html.match(/<script[\s\S]*?>[\s\S]*?<\/script>/)){
            throw 'Invalid f_html cause have xxxx'
          }
          var imgs_in_f_html = user.f_html.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
          var listImg = []
          if(imgs_in_f_html && imgs_in_f_html.length) {
            for(var i = 0; i < imgs_in_f_html.length; i++) {
              var matchSrc = imgs_in_f_html[i].match(/src="(.*?)"/)
              if(matchSrc) {
                listImg.push(matchSrc[1].replace(/&amp;/g, '&'))
              }
            }
            var listxoaimg = []
            for(var i = 0; i <  searchUser.images.length; i++) {
              for(var j = 0; j < listImg.length; j++) {
                if(listImg[j] == searchUser.images[i].link) break
                if(j == listImg.length - 1) {
                  listxoaimg.push(searchUser.images[i])
                }
              }
            }
            for(var i = 0; i < listxoaimg.length; i++) {
              await Image.destroy({id: listxoaimg[i].id})
              await firebase.deleteImage(listxoaimg[i].path)
            }
          }
          //f_favicon
          if(typeof user.f_favicon != 'string') {
            throw 'Invalid f_favicon'
          }
          if(user.f_favicon_upload) {
            user.f_favicon = await firebase.uploadImage(user.f_favicon, `/profile/${user.id}/favicon`)
            user.f_favicon = await firebase.getImage(user.f_favicon)
          } else {
            user.f_favicon = searchUser.f_favicon
          }
          //f_logo
          if(typeof user.f_logo != 'string') {
            throw 'Invalid f_logo'
          }
          if(user.f_logo_upload) {
            user.f_logo = await firebase.uploadImage(user.f_logo, `/profile/${user.id}/logo`)
            user.f_logo = await firebase.getImage(user.f_logo)
          } else {
            user.f_logo = searchUser.f_logo
          }
          //f_cover
          if(typeof user.f_cover != 'string') {
            throw 'Invalid f_cover'
          }
          if(user.f_cover_upload) {
            user.f_cover = await firebase.uploadImage(user.f_cover, `/profile/${user.id}/cover`)
            user.f_cover = await firebase.getImage(user.f_cover)
          } else {
            user.f_cover = searchUser.f_cover
          }
          //ADD ATTR
          //return_user.f_custom_url = user.f_custom_url
          return_user.f_zalo = user.f_zalo.trim()
          return_user.f_facebook = user.f_facebook.trim()
          return_user.f_phone = user.f_phone.trim()
          return_user.f_address = user.f_address.trim()
          return_user.f_email = user.f_email.trim()
          return_user.f_website = user.f_website.trim()
          return_user.f_title = user.f_title.trim()
          return_user.f_description = user.f_description.trim()
          return_user.f_html = user.f_html.trim()
          return_user.f_favicon = user.f_favicon
          return_user.f_logo = user.f_logo
          return fullfill(return_user)
        } catch (e) {
          return reject(e)
        }
      }
      run()
    })
  },
  validateUserViewRender: function (user) {
    return new Promise((fullfill, reject) => {
      var run = async  () => {
        try {
          if(!user.f_cover) user.f_cover = '/images/cover_default.png'
          return fullfill(user)
        } catch (err) {
          return reject(err)
        }
      }
      run()
    })
  },
};

