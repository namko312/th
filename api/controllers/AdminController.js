/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var validate = require('../services/validationUser.js')
var firebase = require('../services/uploadFirebase')
module.exports = {
  user_create: async (req, res) => {
    try {
      var user = req.body
      var regrexUsername = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
      if(!user.username.match(regrexUsername) || !user.password.match(regrexUsername)) {
        throw {name: 'INVALID_FIELD'}
      }
      var user_exist = await User.find({
        username: user.username
      });
      if(user_exist.length == 0) {
        var new_user = await User.create(user)
        res.json({
          success: true
        })
      } else {
        throw 'Username da ton tai'
      }
    } catch (err) {
      res.json({
        success: false,
        message: JSON.stringify(err)
      })
    }
  },
  updatePreview: async (req, res) => {
    try {
      if(!req.body.id || !req.body.f_html) throw 'Thieu id hoac f_html_preview'
      var user = await User.update({ id: req.body.id }).set({f_preview: req.body})
      res.json({
        success: true,
        user: {
          id: req.body.id
        }
      })
    } catch (err) {
      res.json({
        success: false,
        message: JSON.stringify(err)
      })
    }
  },
  user_update: async (req, res) => {
    try {
      if(!req.body.id) throw 'Missing ID'
      if(!req.body.password) throw 'Missing Password'
      if(!req.body.outdate) throw 'Missing OutDate'
      var obj = await validate.validateUserUpdateByAdmin(req.body)
      await User.update(req.body.id ).set(obj)
      res.json({
        success: true
      })
    } catch (err) {
      console.log(err)
      res.json({
        success: false,
        message: JSON.stringify(err)
      })
    }
  },
  uploadImage: async(req, res) => {
    try {
      var uid = req.headers.uid
      if(!uid) throw 'Cant detech user'
      var exist_user = await User.findOne({id: uid})
      if(!exist_user) throw 'User not found'
      var firebase_url = await firebase.uploadImageFile(req, `/upload/${uid}/${new Date().getTime()}`)
      var link = await firebase.getImage(firebase_url)
      await Image.create({
        path: firebase_url,
        link: link,
        alt: req.body.alt ? req.body.alt : '',
        owner: uid
      })
      res.json({
        success: true,
        data: {link:link}
      })
    } catch (err) {
      res.json({
        success: false,
        message: JSON.stringify(err)
      })
    }
  },
  user_get_manager: async (req, res) => {
    try {
      var limit = parseInt(req.query.limit)
      var skip = parseInt(req.query.skip)
      if(!limit && skip !== 0 && !skip) throw 'invalid query'
      req.query.search = JSON.parse(req.query.search)
      var filter = req.query.search.filter
      var where = {
        username : {
          'contains' : req.query.search.username
        }
      }
      if(filter.all){

      } else if(filter.active) {
        where.block = false
        where.check = false
        where.outdate = { '>': new Date().getTime() }
      } else {
        if(filter.choxetduyet) {
          where.check = true
        }
        if(filter.khongxetduyet) {
          where.block = true
        }
        if(filter.expired) {
          where.outdate = { '<': new Date().getTime() }
        }
      }
      var users = await User.find({
        where: where,
        select: ['username','password','check','block', 'blockDescription','outdate','type','adminDescription', 'f_title', 'f_description', 'f_logo', 'f_cover', 'updatedAt']
      }).limit(limit).skip(skip)
      var count = await User.count({
        where: where
      })
      res.json({
        success: true,
        users: users,
        count: count
      })
    } catch (err) {
      console.log(err)
      res.json({
        success: false,
        message: JSON.stringify(err)
      })
    }
  }
};
