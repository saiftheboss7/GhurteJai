var express = require('express');
var userModel = require.main.require('./model/hotels');
var router = express.Router();


function getDateTime() {

    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
router.get('/', (req, res)=>{
    
    userModel.getUsernames(function(results) {

            var user = {
            list: results
            };

            res.render('admin/newHotel', user);
    });	
});

router.post('/', (req, res)=>{
    
     var user = {
        hotel_title : req.body.hotel_title,
        hotel_location : req.body.hotel_location,
        hotel_desc : req.body.hotel_desc,
        hotel_owner : req.body.hotel_owner,
        image : 'assets/Admin/dist/img/hotel-1-1.jpg',
        addedBy : 'Khalid'
    };

    userModel.insert(user, function(success){
		if(success){
            console.log(user);
			res.redirect('http://google.com');
		}else{
			res.send("Failed");
		}
    });
     

});



module.exports = router;