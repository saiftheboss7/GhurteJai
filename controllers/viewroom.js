var express = require('express');
var userModel = require.main.require('./model/room');
var router = express.Router();


router.get('/', (req, res)=>{
    
    userModel.getRooms(function(results) {

            var user = {
            List: results
            };

            res.render('admin/all-room-types', user);
    });

});

router.get('/edit/:id', (req, res)=>{

	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			var allData= {
				result : result[0],
				message : ''
			};
			res.render('admin/edit-rooms', allData);
		}else{
			res.redirect('/');
		}
	});
});

router.post('/edit/:room_type_id', (req, res)=>{
	var result = {
		price : req.body.room_price,
		capacity : req.body.room_capacity,
        available : req.body.room_available,
        room_desc : req.body.room_desc
	};
	var user ={
		id: req.params.room_type_id,
		result : result,
		message : 'Room Type Info Updated'
	};
	
	userModel.updateRoomTypeInfo(user, function(success){
		if(success){
			res.render('admin/edit-rooms', user);
		}else{
			res.redirect('/viewroom');
		}
	});
});

router.get('/delete/:id', (req, res)=>{

	userModel.deleteRoomTypeInfo(req.params.id, function(success){
		if(success){
			res.redirect('/viewroom');
		}
		else{
			res.redirect('/admindashboard');
		}
	});
});	



module.exports = router;