var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,dont){
    done(null,user_id);
});

passport.deserializeUser(function(id,done){
    user.findOne({_id:id},function(err,user){
        done(err,user);
    })
});
passport.use(new LocalStrategy({
    usernameField:'email'},

function (username,password,done) {
    User.findOne({email:username},function(err,done){
        if(err) return done(err);
        if(!user){
            return done(null,false,{
                message:'Incorrect username or password'
            });
        }
        if(!user.validPassword(password)){
            return done(null,false,{
                message:'Incorrect username or password'
            });
        }
        return done(null, user);
    })
}
));