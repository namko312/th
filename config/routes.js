/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'HomeController.index',
  '/introduce': 'HomeController.introduce',
  '/policy': 'HomeController.policy',
  '/shop/:username': 'HomeController.shopID',



  '/logout': 'AuthController.logout',

  //ADMIN
  '/admin/login': 'HomeController.admin_login',
  '/admin/dashboard': 'HomeController.admin_dashboard',
  '/admin/manager/user': 'HomeController.admin_manager_user',
  '/admin/manager/user/edit/:username': 'HomeController.admin_manager_user_edit',
  'POST /admin/login/local': 'AuthController.adminLocal',

  //API ADMIN
  '/api/admin/user': 'AdminController.user_get_manager',
  'POST /api/admin/user': 'AdminController.user_create',
  'PUT /api/admin/user': 'AdminController.user_update',
  'PUT /api/admin/user/updatePreview': 'AdminController.updatePreview',
  'POST /api/admin/user/upload/image': 'AdminController.uploadImage',
  '/preview/:id': 'HomeController.preview',


  //USER
  '/preview/me': 'HomeController.preview_me',
  '/brand/login': 'HomeController.user_login',
  '/dashboard': 'HomeController.user_dashboard',
  '/dashboard/edit': 'HomeController.user_edit',
  '/user/me': 'UserController.user_me',
  'PUT /api/me/user': 'UserController.user_me_update',
  'PUT /api/me/user/updatePreview': 'UserController.user_me_updatePreview',
  'POST /api/me/upload/image': 'UserController.me_uploadImage',

  'POST /brand/login/local': 'AuthController.userLocal',


  //GENERAL
  '/general/user': 'GeneralController.user_get_public',

  //AD
  '/ad/get': 'AdController.get_ad',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
