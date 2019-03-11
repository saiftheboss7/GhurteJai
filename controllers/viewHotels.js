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
			var allData= {
				result : result[0],
				message : ''
			};
			res.render('admin/edit-hotels', allData);
		}else{
			res.redirect('/');
		}
	});
});

router.post('/edit/:hotel_id', (req, res)=>{
	var result = {
		hotel_title : req.body.hotel_title,
		hotel_location : req.body.hotel_location,
		hotel_desc : req.body.hotel_desc
	};
	var user ={
		id: req.params.hotel_id,
		result : result,
		message : 'Hotel Info Updated'
	};
	
	userModel.updateHotelInfo(user, function(success){
		if(success){
			res.render('admin/edit-hotels', user);
		}else{
			res.redirect('/viewhotels');
		}
	});
});

router.get('/delete/:id', (req, res)=>{

	userModel.deleteHotelInfo(req.params.id, function(success){
		if(success){
			res.redirect('/viewhotels');
		}
		else{
			res.redirect('/admindashboard');
		}
	});
});	




module.exports = router;