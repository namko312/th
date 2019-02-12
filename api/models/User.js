/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username:{
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      defaultsTo: 'producer'
    },
    outdate: {
      type: 'string',
      defaultsTo: new Date().getTime().toString()
    },
    adminDescription: {
      type: 'string',
      defaultsTo: ''
    },
    totalView: {
      type: 'number',
      defaultsTo: 0
    },
    // tk bị block ?
    block: {
      type: 'boolean',
      defaultsTo: false
    },
    // mô tả lý do tk bị block
    blockDescription: {
      type: 'string',
      defaultsTo: ''
    },
    // trạng thái admin xét duyệt
    check: {
      type: 'boolean',
      defaultsTo: true
    },
    // tài khoản đặc biệt không cần admin xét duyệt
    notNeedCheck: {
      type: 'boolean',
      defaultsTo: false
    },
    f_zalo: {
      type: 'string',
      defaultsTo: ''
    },
    f_facebook: {
      type: 'string',
      defaultsTo: ''
    },
    f_phone: {
      type: 'string',
      defaultsTo: ''
    },
    f_address: {
      type: 'string',
      defaultsTo: ''
    },
    f_email: {
      type: 'string',
      defaultsTo: ''
    },
    f_website: {
      type: 'string',
      defaultsTo: ''
    },
    f_title : {
      type: 'string',
      defaultsTo: ''
    },
    f_description: {
      type: 'string',
      defaultsTo: ''
    },
    f_html: {
      type: 'string',
      defaultsTo: ''
    },
    f_preview: {
      type: 'json',
      defaultsTo: ''
    },
    f_favicon: {
      type: 'string',
      defaultsTo: ''
    },
    f_logo: {
      type: 'string',
      defaultsTo: ''
    },
    f_cover: {
      type: 'string',
      defaultsTo: ''
    },
    // Add a reference
    images: {
      collection: 'image',
      via: 'owner'
    }
  }

};

