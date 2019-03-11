var express = require('express');
var userModel = require.main.require('./model/hotels');
var router = express.Router();


router.get('/', (req, res)=>{

	userModel.getHotelEnquiry(function(results) {

		var user = {
		List: results
		};

		res.render('admin/all-hotels-enquiry', user);
		});

});

module.exports = router;