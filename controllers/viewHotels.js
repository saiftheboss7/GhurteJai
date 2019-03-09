var express = require('express');
var userModel = require.main.require('./model/hotels');
var router = express.Router();


router.get('/', (req, res)=>{
	
	userModel.getHotelView(function(results) {

		var user = {
		List: results
		};

		res.render('admin/all-hotels', user);
		});	
		
});

 router.get('/edit/:id', (req, res)=>{

	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			res.render('home/edit', result[0]);
		}else{
			res.redirect('/');
		}
	});
});

router.post('/edit/:hotel_id', (req, res)=>{
	
	var user ={
		id: req.params.hotel_id,
		uname : req.body.uname,
		password : req.body.password,
		type : req.body.type
	};
	
	userModel.update(user, function(success){
		if(success){
			res.redirect('/home/userlist');
		}else{
			res.render("/home/edit/"+req.params.hotel_id);
		}
	});
});

router.get('/delete/:id', (req, res)=>{

	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			res.render('home/delete', result[0]);
		}else{
			res.redirect('/home/userlist');
		}
	});
});	

router.post('/delete/:id', (req, res)=>{
	
	userModel.delete(req.params.id, function(success){
		if(success){
			res.redirect('/home/userlist');
		}else{
			res.redirect("/home/delete/"+req.params.id);
		}
	});
});



module.exports = router;