var bcryptPassword = require('../api/services/bcryptPassword.js');
var passport = require('passport'),
	LocalStrategy   = require('passport-local').Strategy;

var adminLocalHandle = function(username, password, done){
  process.nextTick(function(){
    Admin.findOne({email:username}, function(err, admin){
      if(err){return done(err)}
      if(!admin){
        return done(null, false, {message:'email_not_found'});
      }
      bcryptPassword.decode(password, admin.password, function(ok){
        if(!ok)	return done(null, false, { message: 'password_not_correct' });
        admin.role = 'admin'
        return done(null, admin);
      });
    })
  });
}
var userLocalHandle = function(username, password, done){
  process.nextTick(function(){
    User.findOne({username:username}, function(err, user){
      if(err){return done(err)}
      if(!user){
        return done(null, false, {message:'email_not_found'});
      }
      if(password == user.password) {
        user.role = 'user'
        return done(null, user)
      } else {
        return done(null, false, { message: 'password_not_correct' });
      }
    })
  });
}

passport.serializeUser(function(user, done){
	done(null, {role:user.role, id:user.id, username: user.username, password: user.password});
});

passport.deserializeUser(function(_user, done){
	if(_user.role == 'admin'){
		Admin.findOne({id:_user.id}, function(err, admin){
			admin.role = 'admin';
			done(null, admin);
		});
	}
	if(_user.role == 'user'){
    done(null, _user)
  }
});

passport.use('admin-local',new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},adminLocalHandle))

passport.use('user-local',new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},userLocalHandle))
