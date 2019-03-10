var express = require('express');
var homeModel = require.main.require('./model/home-model');
var hotelModel = require.main.require('./model/hotel-model');
var router = express.Router();

// router.get('/', (req, res)=>{
// 		var user = {
// 			name: req.session.name
// 		};
// 		res.render('index', user);
// });	

// router.get('/', (req, res)=>{
	
// 	userModel.getHotels(function(hotels){
// 		if(hotels.length > 0){
			
// 			var user = {
// 				name: req.session.name,
// 				hotel: hotels
// 			};
// 			res.render('index', user);
// 		}
// 	});	
// });  

router.get('/', (req, res)=>{
    
    var allCatTitles= {};
	homeModel.getHotels(function(hotels){
		if(hotels.length > 0){
            homeModel.getPosts(function(posts){
                if(posts.length > 0){
                    for(var i=0; i< posts.length; i++)
                    {
                        homeModel.getCategoryTitle(posts[i].cat_id, function(catTitles){
                            if(catTitles.length > 0){
                                //console.log(catTitles);
                                allCatTitles[i]= catTitles;
                                //console.log(allCatTitles[i]);
                            }
                        });	
                    }
                    var allData = { 
                        name: req.session.name,
                        hotel: hotels,
                        post: posts,
                        //catTitle: allCatTitles
                    };
                   // console.log(allData.catTitle);
                    res.render('index', allData);
                }
            });	
		}
	});	
});

router.get('/hotels', (req, res)=>{
	hotelModel.getHotels(function(hotels){
		if(hotels.length > 0){
			
			var allData = {
				name: req.session.name,
				hotel: hotels
			};
			res.render('hotels', allData);
		}
	});	
});	

router.get('/hotel-room/:id', (req, res)=>{

	hotelModel.getHotelTitleID(req.params.id, function(hotelDatas){
		if(hotelDatas.length >0 ){
            hotelModel.getHotelRoomType(req.params.id, function(hotelRoomTypes){
                if(hotelRoomTypes.length >0 ){
                    var allData = { 
                        name: req.session.name,
                        hotelData: hotelDatas[0],
                        hotelRoomType: hotelRoomTypes
                    };
                    res.render('hotel-room', allData);
                }
            });
		}else{
			res.redirect('/hotels');
		}
	});
});	

router.get('/hotel-room/:hotel_id/:room_type_id', (req, res)=>{

	hotelModel.getHotelTitleID(req.params.hotel_id, function(hotelDatas){
		if(hotelDatas.length >0 ){
            hotelModel.getHotelRoomTypeTitle(req.params.room_type_id, function(hotelRoomTypes){
                if(hotelRoomTypes.length >0 ){
                    var allData = { 
                        name: req.session.name,
                        hotelData: hotelDatas[0],
                        hotelRoomType: hotelRoomTypes[0],
                        query : req.query,
                        message : ''
                    };
                    //console.log(allData);
                    res.render('hotel-booking', allData);
                }
            });
		}else{
			res.redirect('/hotels');
		}
	});
});	
 
router.post('/hotel-room/:hotel_id/:room_type_id', (req, res)=>{
    if(req.body.bookNow == 'bookNow')
    {
        var ids = {
            hotel_id : req.params.hotel_id,
            room_type_id : req.params.room_type_id
        }
        hotelModel.getHotelTitleID(req.params.hotel_id, function(hotelDatas){
            if(hotelDatas.length >0 ){
                hotelModel.getHotelRoomTypeTitle(req.params.room_type_id, function(hotelRoomTypes){
                    if(hotelRoomTypes.length >0 ){
                        hotelModel.getRoomTypeData(ids, function(roomTypeDatas){
                            if(roomTypeDatas.length > 0)
                            {
                                var allData ={
                                    enq_hotel_name : req.body.enq_hotel_name,
                                    enq_hotel_email : req.body.enq_hotel_email,
                                    enq_hotel_phone : req.body.enq_hotel_phone,
                                    enq_hotel_checkin : req.body.enq_hotel_checkin,
                                    enq_hotel_checkout : req.body.enq_hotel_checkout,
                                    enq_hotel_room : req.body.enq_hotel_room,
                                    enq_hotel_child : req.body.enq_hotel_child,
                                    enq_hotel_adult : req.body.enq_hotel_adult,
                                    enq_hotel_message : req.body.enq_hotel_message,
                                    name: 'Khalid',
                                    hotelData: hotelDatas[0],
                                    hotelRoomType: hotelRoomTypes[0],
                                    hotelRoomTypeData : roomTypeDatas[0],
                                    message : ''
                                };
                                if(req.body.enq_hotel_room <= allData.hotelRoomTypeData.available)
                                {
                                    res.render('booking-confirm-hotel', allData);
                                }
                                else
                                {
                                    var allData = {
                                        name: req.session.name,
                                        hotelData: hotelDatas[0],
                                        hotelRoomType: hotelRoomTypes[0],
                                        message : 'No Rooms Available'
                                    }
                                    res.render('hotel-booking', allData);
                                }
                            }
                        });
                    }
                });
            }else{
                res.redirect('/hotels');
            }
        });
    }
    else if(req.body.payNow == 'payNow') {
        var ids = {
            hotel_id : req.params.hotel_id,
            room_type_id : req.params.room_type_id
        }
        hotelModel.getHotelTitleID(req.params.hotel_id, function(hotelDatas){
            if(hotelDatas.length >0 ){
                hotelModel.getHotelRoomTypeTitle(req.params.room_type_id, function(hotelRoomTypes){
                    if(hotelRoomTypes.length >0 ){
                        hotelModel.getRoomTypeData(ids, function(roomTypeDatas){
                            if(roomTypeDatas.length > 0)
                            {
                                var allData ={
                                    hotel_id : req.params.hotel_id,
                                    room_type_id : req.params.room_type_id,
                                    enq_hotel_name : req.body.enq_hotel_name,
                                    enq_hotel_email : req.body.enq_hotel_email,
                                    enq_hotel_phone : req.body.enq_hotel_phone,
                                    enq_hotel_checkin : req.body.enq_hotel_checkin,
                                    enq_hotel_checkout : req.body.enq_hotel_checkout,
                                    enq_hotel_room : req.body.enq_hotel_room,
                                    enq_hotel_child : req.body.enq_hotel_child,
                                    enq_hotel_adult : req.body.enq_hotel_adult,
                                    enq_hotel_message : req.body.enq_hotel_message,
                                    name: 'Khalid',
                                    hotelData: hotelDatas[0],
                                    hotelRoomType: hotelRoomTypes[0],
                                    hotelRoomTypeData : roomTypeDatas[0],
                                    count : 0,
                                    message : 'Enquiry Sent'
                                };
                                hotelModel.insertHotelBooking(allData, function(success){
                                    if(success){
                                        hotelModel.getRoomTypeData(ids, function(roomTypeData){
                                            if(roomTypeData.length >0 ){
                                                var update_available = roomTypeData[0].available - req.body.enq_hotel_room;
                                                var updateData = {
                                                    hotel_id : req.params.hotel_id,
                                                    room_type_id : req.params.room_type_id,
                                                    available : update_available
                                                };
                                                hotelModel.updateAvailableRoom(updateData, function(success){
                                                    if(success){
                                                        res.render('booking-confirm-hotel', allData);
                                                    }else{
                                                        res.redirect('/hotels');
                                                    }
                                                });
                                            }else{
                                                res.redirect('/hotels');
                                            }
                                        });
                                    }else{
                                        res.redirect("/hotels");
                                    }
                                });
                            }
                        });
                    }
                });
            }else{
                res.redirect('/hotels');
            }
        });
    }

    //res.render('booking-confirm-hotel', allData);
});
module.exports = router;