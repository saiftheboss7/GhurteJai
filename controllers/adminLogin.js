var express = require('express');
var userModel = require.main.require('./model/adminModel');
var mysql = require('mysql');
var router = express.Router();


router.get('/', (req, res)=>{

	if(req.session.name=='khalid'){
		res.redirect('/admindashboard');
	}
	res.render('login/index');
});



 router.post('/', (req, res)=>{

	if(req.body.uname=='khalid' && req.body.pwd=="123456"){
		 req.session.name = req.body.uname; //CreateSessionVariable
			  res.redirect('/admindashboard');
	}
	else{

		var user = {
			uname : req.body.uname,
			password : req.body.pwd
		};

		userModel.validate(user, function(result){
			if(result.length > 0){
				req.session.name = req.body.uname;
				res.redirect('/userdashboard');
			}else{
				res.send("User Login Unsuccessful <a href='/login'>Go Back</a>");
			}
		});

	}
});




module.exports = router;