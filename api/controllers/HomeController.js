/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var validate = require('../services/validationUser.js')
var moment = require('moment')
module.exports = {
  index: async (req, res) => {
    try {
      res.view('pages/homepage.ejs', {passport:req.session.passport, title: 'Trang chu'})
    } catch (e) {
      return res.notFound(e)
    }
  },

  policy: async (req, res) => {
    try {
      res.view('pages_ejs/policy.ejs', {passport:req.session.passport, title: 'Điều khoản'})
    } catch (e) {
      return res.notFound(e)
    }
  },
  introduce: async (req, res) => {
    try {
      res.view('pages_ejs/introduce.ejs', {passport:req.session.passport, title: 'Giới thiệu'})
    } catch (e) {
      return res.notFound(e)
    }
  },

  shopID: async (req, res) => {
    try {
      var user = await User.findOne({
        where: {
          username: req.params.username
        },
        select: ['check','block','type','outdate','username', 'f_zalo', 'f_facebook', 'f_phone', 'f_address', 'f_email',
          'f_website', 'f_title', 'f_description', 'f_html', 'f_favicon', 'f_logo', 'f_cover']
      })
      if(!user) {
        throw 'Shop khong ton tai'
      }
      user = await validate.validateUserViewRender(user)
      var hethan = parseInt(user.outdate) < new Date().getTime()
      if(user.block || user.check || hethan) {
        user.hethan = hethan
        res.view('pages_ejs/shop_kiemduyet.ejs', {passport:req.session.passport,title: 'Xin lỗi! Chúng mình không thể hiển thị nội dung này', favicon: user.f_favicon, user: user})
      } else {
        res.view('pages_ejs/shop.ejs', {passport:req.session.passport,noFooter: true, title: user.f_title, favicon: user.f_favicon, user: user})
      }
    } catch (e) {
      return res.notFound(e)
    }
  },


  //  Admin
  admin_login: (req, res) => {
    res.view('pages/admin_login.ejs', {});
  },
  admin_dashboard: (req, res) => {
    res.view('pages/admin_dashboard.ejs', {});
  },
  admin_manager_user: (req, res) => {
    res.view('pages/admin_manager_user.ejs', {title: 'Quản lý User'});
  },
  admin_manager_user_edit: async (req, res) => {
    var username = req.params.username
    if(!username) res.notFound()
    try {
      var user = await User.findOne({username})
      if(!user) return res.notFound()
      return res.view('pages/admin_manager_user_edit.ejs', {title: 'Chỉnh sửa - ' + username, username: username});
    } catch (e) {
      res.badRequest(JSON.stringify(e));
    }
  },
  preview: async (req, res) => {
    var id = req.params.id
    if(!id) res.notFound()
    try {
      var user = await User.findOne({
        where: {
          id: id
        },
        select: ['f_preview']
      })
      if(!user) return res.notFound()
      user = await validate.validateUserViewRender(user.f_preview)
      return res.view('pages_ejs/shop.ejs', {title: user.f_title, favicon: user.f_favicon, user: user});
    } catch (e) {
      res.badRequest(JSON.stringify(e));
    }
  },


  //ROUTE FOR USER
  user_login: (req, res) => {
    res.view('pages/user_login.ejs', {passport:req.session.passport});
  },
  user_dashboard: async (req, res) => {
    var uid = req.session.passport.user.id
    var user = await User.findOne({
      where: {id: uid},
      select: ['username', 'password', 'outdate' ,'type', 'totalView' ,'check', 'block', 'blockDescription']
    })
    var outdate = moment(parseInt(user.outdate))
    if(outdate.isValid()) {
      user.outdate = outdate.format("DD-MM-YYYY")
    }
    if(user.type == 'producer') user.type = 'Nhà sản xuất'
    else if(user.type == 'business') user.type = 'Nhà bán buôn'
    res.view('pages/user_dashboard.ejs', {passport:req.session.passport, user: user});
  },
  user_edit: (req, res) => {
    res.view('pages/user_edit.ejs', {passport:req.session.passport, noFooter: true});
  },
  preview_me: async (req, res) => {
    try {
      var uid = req.session.passport.user.id
      if(!uid) throw 'User not found'
      var user = await User.findOne({
        where: {
          id: uid
        },
        select: ['f_preview']
      })
      user = await validate.validateUserViewRender(user.f_preview)
      return res.view('pages_ejs/shop.ejs', {passport:req.session.passport,noFooter: true,title: user.f_title, favicon: user.f_favicon, user: user});
    } catch (e) {
      res.notFound(JSON.stringify(e));
    }
  },
};
