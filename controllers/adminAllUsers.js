var express = require('express');
var userModel = require.main.require('./model/userModel');
var router = express.Router();


router.get('/', (req, res)=>{

	
	if(req.session.name =='khalid'){
	userModel.getAllUsers(function(results) {

		var user = {
		List: results
		};

		res.render('admin/all-users', user);
		});
	}
	else{
		res.redirect('/login');
	}


});

router.get('/edit/:id', (req, res)=>{

	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			var allData= {
				result : result[0],
				message : ''
			};
			res.render('admin/edit-users', allData);
		}else{
			res.redirect('/');
		}
	});
});

router.post('/edit/:username', (req, res)=>{
	var result = {
		name : req.body.name,
		email : req.body.email,
		phone : req.body.phone,
		password : req.body.password
	};

	var user ={
		id: req.params.username,
		result : result,
		message : 'User Info Updated'
	};
	
	if(req.body.password != '')
	{
		userModel.updateUserInfo(user, function(success){
			if(success){
				res.render('admin/edit-users', user);
			}else{
				res.redirect('/allusers');
			}
		});
	}
	else{
		userModel.updateUserInfoNoPass(user, function(success){
			if(success){
				res.render('admin/edit-users', user);
			}else{
				res.redirect('/allusers');
			}
		});
	}

});

router.get('/delete/:id', (req, res)=>{

	userModel.deleteUserInfo(req.params.id, function(success){
		if(success){
			res.redirect('/allusers');
		}
		else{
			res.redirect('/admindashboard');
		}
	});
});	


module.exports = router;