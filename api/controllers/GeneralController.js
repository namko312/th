/**
 * GeneralController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  user_get_public: async (req, res) => {
    try {
      var limit = parseInt(req.query.limit)
      var skip = parseInt(req.query.skip)
      if(!limit && skip !== 0 && !skip) throw 'invalid query'
      var users = await User.find({
        where: {
          block: false,
          check: false,
          outdate: { '>': new Date().getTime() }
        },
        select: ['username', 'f_title', 'f_description', 'f_logo', 'f_cover', 'updatedAt', 'type']
      }).sort([{updatedAt: 'DESC' }]).limit(limit).skip(skip)

      res.json({
        success: true,
        users: users
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
