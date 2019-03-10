/**
 * AdController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var validate = require('../services/validationUser.js')
var firebase = require('../services/uploadFirebase')
module.exports = {
  get_ad: async (req, res) => {
    try {
      res.json({
        success: true,
        // ad: {
        //   title: 'Quang cao ShopeeLike',
        //   description: 'Quang cao ShopeeLike',
        //   image: 'https://helpx.adobe.com/nz/stock/how-to/visual-reverse-image-search/_jcr_content/main-pars/image.img.jpg/visual-reverse-image-search-v2_1000x560.jpg',
        //   url: 'https://facebook.com/shopeelike'
        // }
      })
    } catch (err) {
      res.json({
        success: false,
        message: JSON.stringify(err)
      })
    }
  }
};
