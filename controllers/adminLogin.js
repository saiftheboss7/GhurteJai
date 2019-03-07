var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{
	
	var user ={
		uname : req.body.uname,
		password : req.body.password
	};
	
	userModel.validate(user, function(result){
		if(result.length > 0){
			req.session.name = req.body.uname;
			req.session.uid = result[0].id;
			res.redirect('/home');
		}else{
			res.render("login/index");
		}
	});
});

module.exports = router;