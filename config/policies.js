/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  'HomeController': {
    'admin_dashboard': 'admin_login',
    'admin_manager_user': 'admin_login',
    'admin_manager_user_edit': 'admin_login',
    'preview': 'admin_login',

    'user_dashboard': 'user_login',
    'user_edit': 'user_login',
    'preview_me': 'user_login'
  },
  'AdminController': {
    '*':'admin_login'
  },
  'UserController': {
    '*':'user_login'
  },
  'admin/find':'admin_login',
  'admin/findOne':'admin_login',
  'admin/create':'admin_login',
  'admin/update':'admin_login',
  'admin/destroy':'admin_login',
  'admin/populate':'admin_login',
  'admin/add':'admin_login',
  'admin/remove':'admin_login',
  'admin/replace':'admin_login',

  'user/find':'admin_login',
  'user/findOne':'admin_login',
  'user/create':'admin_login',
  'user/update':'admin_login',
  'user/destroy':'admin_login',
  'user/populate':'admin_login',
  'user/add':'admin_login',
  'user/remove':'admin_login',
  'user/replace':'admin_login',

  'image/find':'admin_login',
  'image/findOne':'admin_login',
  'image/create':'admin_login',
  'image/update':'admin_login',
  'image/destroy':'admin_login',
  'image/populate':'admin_login',
  'image/add':'admin_login',
  'image/remove':'admin_login',
  'image/replace':'admin_login',
};
