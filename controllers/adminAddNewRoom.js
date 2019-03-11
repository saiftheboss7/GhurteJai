var express = require('express');
var userModel = require.main.require('./model/room');
var router = express.Router();

// router.post('/', (req, res)=>{
    
//     var newRoom = {
//        hotel_id:req.body.hotel_id,
//        room_type:req.body.room_type,
//        room_price:req.body.room_price,
//        room_capacity:req.body.room_capacity,
//        room_desc:req.body.room_desc,
//        image:'dist/img/room-5.jpg',
//        message : 'New Room Type Added'
//    };

//    userModel.insertRooms(newRoom, function(success){
//        if(success){
//         res.render('admin/add-new-room-type', newRoom);
//        }else{
//            res.redirect('/admindashboard');
//        } 
//    });
   

// });

router.post('/', (req, res)=>{

   userModel.getHotelOwner(function(results) {
       if(results.length > 0)
       {
        var newRoom = {
            list: results,
            hotel_id:req.body.hotel_id,
            room_type:req.body.room_type,
            room_price:req.body.room_price,
            room_capacity:req.body.room_capacity,
            room_desc:req.body.room_desc,
            image:'dist/img/room-5.jpg',
            message : 'New Room Type Added'
        };
        userModel.insertRooms(newRoom, function(success){
            if(success){
             res.render('admin/add-new-room-type', newRoom);
            }else{
                res.redirect('/admindashboard');
            } 
        });
    }
    });
});


router.get('/', (req, res)=>{
    if(req.session.name =='khalid'){
    
    userModel.getHotelOwner(function(results) {

            var user = {
            list: results,
            message : ''
            };

            res.render('admin/add-new-room-type', user);
    });	
    }
    else{
        res.redirect('/login');
    }
});




module.exports = router;