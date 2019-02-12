module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    if(req.session.passport.user.role == 'user')
      return next();
  }
  return res.redirect('/brand/login');
};
