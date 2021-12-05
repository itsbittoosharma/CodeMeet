var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var config=require('../config');
var transporter=nodemailer.createTransport(config.mailer);
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
  {
    
    var mailOptions={
      from:'CodeMeet <noreply@codemeet.com>',
      to:'utkarshup562@gmail.com',
      subject: 'You got a new message from website',
      text: req.body.message
    };
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        return console.log(error);
      }
      res.render('thanks',{title:'CodeMeet'});
    });
    
    
    
    
    }
});

router.get('/login',function(req,res,next)
{
    res.render('login',{title:'Login - CodeMeet'});
});
router.get('/register',function(req,res,next)
{
    res.render('register',{title:'Register - CodeMeet'});
});

module.exports = router;
