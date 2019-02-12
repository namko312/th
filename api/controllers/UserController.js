/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var validate = require('../services/validationUser.js')
var firebase = require('../services/uploadFirebase')
module.exports = {
  user_me: async (req, res) => {
    try {
      var user = await validate.validateMe(req)
      res.json({
        success: false,
        user: user
      })
    } catch (err) {
      res.json({
        success: false,
        message: JSON.stringify(err)
      })
    }
  },
  user_me_updatePreview: async (req, res) => {
    try {
      if(!req.body.f_html) throw 'Missing field'
      var user = await validate.validateMe(req)
      await User.update({ id: user.id}).set({f_preview: req.body})
      res.json({
        success: true,
        user: {
          id: user.id
        }
      })
    } catch (err) {
      res.json({
        success: false,
        message: JSON.stringify(err)
      })
    }
  },
  user_me_update: async (req, res) => {
    try {
      var user = await validate.validateMe(req)
      req.body.id = user.id
      var obj = await validate.validateUserUpdateByUser(req.body)
      obj.check = true
      await User.update(user.id).set(obj)
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
  me_uploadImage: async (req, res) => {
    try {
      var user = await validate.validateMe(req)
      var firebase_url = await firebase.uploadImageFile(req, `/upload/${user.id}/${new Date().getTime()}`)
      var link = await firebase.getImage(firebase_url)
      await Image.create({
        path: firebase_url,
        link: link,
        alt: req.body.alt ? req.body.alt : '',
        owner: user.id
      })
      res.json({
        success: true,
        data: {link:link}
      })
    } catch (err) {
      console.log(err)
      res.json({
        success: false,
        message: JSON.stringify(err)
      })
    }
  },
};
