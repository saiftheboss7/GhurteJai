var db = require('./db');

module.exports={

	get: function(userId, callback){
		var sql = "select * from hotels where hotel_id=?";

		db.getResult(sql, [userId], function(result){
			callback(result);
		});
	},
	getUsernames: function(callback){
		var sql = "select username from users where deletedAt is null";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getTours: function(callback){
		var sql = "SELECT COUNT(*) as count FROM tours WHERE deletedAt is NULL";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getHotelView: function(callback){
		var sql = "select * from hotels where deletedAt is null order by hotel_id asc";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getHotelEnquiry: function(callback){
		var sql = "SELECT * from hotel_enquiry, hotels where hotel_enquiry.hotel_id= hotels.hotel_id and hotels.deletedAt is NULL and hotel_enquiry.deletedAt is NULL";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	validate: function(user, callback){
		var sql = "select * from user where username=? and password=?";

		db.getResult(sql, [user.uname, user.password], function(result){
			callback(result);
		});
	},
	insert: function(user, callback){
		var sql = "insert into hotels(title,location,image,hotel_desc,owner,addedBy,last_modified) values (?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [user.hotel_title, user.hotel_location, user.image, user.hotel_desc, user.hotel_owner, user.addedBy, user.addedBy], function(status){
			callback(status);
		});
	},

	updateHotelInfo: function(user, callback){
		var sql = "UPDATE hotels SET title= ? , location= ?, hotel_desc= ? where hotel_id= ?";
		db.execute(sql, [user.result.hotel_title, user.result.hotel_location,user.result.hotel_desc, user.id], function(status){
			callback(status);
		});
	},

	update: function(user, callback){
		var sql = "update user set username=?,password=?, type=? where id=?";
		db.execute(sql, [user.uname, user.password,user.type, user.id], function(status){
			callback(status);
		});
	},

	deleteHotelInfo: function(hotel_id, callback){
		var sql = "update hotels set deletedAt= CURRENT_TIMESTAMP where hotel_id= ?";
		db.execute(sql, [hotel_id], function(status){
			callback(status);
		});
	},

	delete: function(userId, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [userId], function(status){
			callback(status);
		});
	}
}



