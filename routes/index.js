var express = require('express');
var router = express.Router();
var { body, validationResult} = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about',function(req,res,next) {
  res.render('about',{ title: 'CodeMeet'});
});
router.get('/contact',function(req,res,next){
  res.render('contact',{title:'CodeMeet'});
})
.post('/contact',function(req,res,next){
  
  req.checkBody('name','Empty Name').notEmpty();
  req.checkBody('email','Invalid email').isEmail();
  req.checkBody('message','Empty message').notEmpty();
  var errors=req.validationErrors();
if(errors) {
  res.render('contact',{
    title:'CodeMeet',
    name: req.body.name,
    email:req.body.email,
    message: req.body.message,
    errorMessages: errors 
  });
}
else
  {res.render('thanks',{title:'CodeMeet'});}
});

module.exports = router;
