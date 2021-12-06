var express = require('express');
const task = require('../models/task');
var user = require('../models/user');
var router = express.Router();

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

router.get('/task/:id',function(req,res){
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