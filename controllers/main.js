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

	hotelModel.getHotelTitle(req.params.id, function(hotelTitles){
		if(hotelTitles.length >0 ){
            hotelModel.getHotelRoomType(req.params.id, function(hotelRoomTypes){
                if(hotelRoomTypes.length >0 ){
                    var allData = { 
                        name: req.session.name,
                        hotelTitle: hotelTitles[0],
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

module.exports = router;