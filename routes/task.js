var express = require('express');
const task = require('../models/task');
var user = require('../models/user');
var router = express.Router();
var passport = require('passport');

router.get('/createTask',function(req,res){
    var newTask= new task();
    newTask.save(function(err,data){
        if(err){
            console.log(err);
            res.render('error');
        }
        else{
            res.redirect('/task/'+data._id);
        }
    })
});


function ensureAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login') // if not auth
  };

  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next()
    }
    res.redirect('/');  // if auth    
  };




router.get('/task/:id',ensureAuthenticated, (req, res) => {
    
    

    if(req.params.id){
        task.findOne({_id:req.params.id},function(err,data){
            if(err) {console.log(err); res.redirect('/');}
else if(data) {


    res.render('task',{data:data});

}
else res.redirect('/');
        })
    }
    else{
        res.render('error');
    }
});
module.exports=router;