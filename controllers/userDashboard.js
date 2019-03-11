var express = require('express');
var hotelModel = require.main.require('./model/hotels');
var userModel = require.main.require('./model/adminModel');

var router = express.Router();


router.get('/', (req, res)=>{
	if(req.session.name != 'khalid' && req.session.name != null ){
		 userModel.getUsers(function(result) {
			  obj = {
				getUsers: result
			  };
		
			  console.log(obj);

			  userModel.getHotels(function(results) {
				  getHotels = results;
				  console.log(getHotels);
		
		
				  userModel.getTours(function(results) {
					  getTours = results;
					  console.log(getTours);
		
					  //After successful completion of all 3 queries send data back to cliend(front-end)
					  //its better to create new obj everytime and send it
					  //store all the data in obj and send back to client
					  var obj = {};
					  obj.getUsers = result;
					  obj.getHotels = getHotels;
					  obj.getTours = getTours;
					  obj.name = req.body.uname;

					  console.log(obj.print);
					  res.render('login/userDashboard', obj);
				  });
				});
			  });
			}

			else{
				res.redirect('/login');
			}

});

router.post('/', (req, res)=>{
	/* if(req.session.name != 'khalid' && req.session.name != null ){
		 userModel.getUsers(function(result) {
			  obj = {
				getUsers: result
			  };
		
			  console.log(obj);

			  userModel.getHotels(function(results) {
				  getHotels = results;
				  console.log(getHotels);
		
		
				  userModel.getTours(function(results) {
					  getTours = results;
					  console.log(getTours);
		
					  //After successful completion of all 3 queries send data back to cliend(front-end)
					  //its better to create new obj everytime and send it
					  //store all the data in obj and send back to client
					  var obj = {};
					  obj.getUsers = result;
					  obj.getHotels = getHotels;
					  obj.getTours = getTours;
					  obj.name = req.body.uname;

					  console.log(obj.print);
					  res.render('login/userDashboard', obj);
				  });
				});
			  });
			}

			else{
				res.render('login');
			} */

});



router.get('/allhotels', (req, res)=>{

if(req.session.name != 'khalid' && req.session.name != null ){
		hotelModel.getHotelView(function(results) {

					var user = {
					List: results
					};
			
					res.render('user/all-hotels', user);
					});
				}

	else{
		res.redirect('/login');
	}

});





module.exports = router;