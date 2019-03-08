var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

router.get('/', (req, res)=>{
		var user = {
			name: req.session.name
		};
		res.render('index', user);
});	

module.exports = router;