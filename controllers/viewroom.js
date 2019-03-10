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

router.post('/', (req, res)=>{
    
     /* var user = {
        hotel_title : req.body.hotel_title,
        hotel_location : req.body.hotel_location,
        hotel_desc : req.body.hotel_desc,
        hotel_owner : req.body.hotel_owner,
        image : 'dist/img/hotel-1-1.jpg',
        addedBy : 'Khalid'
    };

    userModel.insert(user, function(success){
		if(success){
            console.log(user);
			res.redirect('http://google.com');
		}else{
			res.send("Failed");
		}
    }); */
     

});



module.exports = router;