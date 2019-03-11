var express = require('express');
var userModel = require.main.require('./model/userModel');
var router = express.Router();


router.get('/', (req, res)=>{

	userModel.getAllUsers(function(results) {

		var user = {
		List: results
		};

		res.render('admin/all-users', user);
		});


});

module.exports = router;