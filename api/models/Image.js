/**
 * Image.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //firebase
    path: {
      type: 'string',
      defaultsTo: ''
    },
    //link direct
    link: {
      type: 'string',
      defaultsTo: ''
    },
    alt: {
      type: 'string',
      defaultsTo: ''
    },
    // Add a reference to User
    owner: {
      model: 'user'
    }
  }

};

