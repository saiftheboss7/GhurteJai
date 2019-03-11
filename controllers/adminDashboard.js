var express = require('express');
var userModel = require.main.require('./model/adminModel');
var router = express.Router();


router.get('/', (req, res)=>{

	if(req.session.name =='khalid'){
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
					  res.render('login/admindashboard', obj);
				  });
				});
			  });	
	}
	else{
		res.redirect("/login");
	}

});

router.post('/', (req, res)=>{

	if(req.body.uname=='khalid' && req.body.pwd=="123456"){
		req.session.name = req.body.uname; //CreateSessionVariable
			 res.redirect('/admindashboard');
   }
   else {
	   var user = {
		   uname : req.body.uname,
		   password : req.body.pwd
	   };

	   userModel.validate(user, function(result){
		   if(result.length > 0){
			   req.session.name = req.body.uname;
			   req.session.uid = result[0].id;
			   res.redirect('/userdashboard');
		   }else{
			   res.send("User Login Unsuccessful <a href='/login'>Go Back</a>");
		   }
	   });

   }

});




module.exports = router;