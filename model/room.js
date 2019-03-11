var db = require('./db');

module.exports={

	get: function(room_type_id, callback){
		var sql = "select * from room_type where room_type_id=?";

		db.getResult(sql, [room_type_id], function(result){
			callback(result);
		});
	},
	getRooms: function(callback){
		var sql = "select * from room_type where deletedAt is null order by room_type_id asc";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getHotelOwner: function(callback){
		var sql = "select hotel_id, title from hotels where deletedAt is null order by hotel_id asc";
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
	insertRooms: function(user, callback){
		var sql = "insert into room_type(hotel_id,room_name,room_desc, price,capacity,available,image) values (?,?,?,?,?,?,?)";
		db.execute(sql, [user.hotel_id, user.room_type, user.room_desc, user.room_price, user.room_capacity, user.room_capacity, user.image], function(status){
			callback(status);
		});
	},

	updateRoomTypeInfo: function(user, callback){
		var sql = "UPDATE room_type SET room_desc= ?, price=?, capacity= ?, available=? where room_type_id= ?";
		db.execute(sql, [user.result.room_desc, user.result.price, user.result.capacity, user.result.available, user.id], function(status){
			callback(status);
		});
	},

	update: function(user, callback){
		var sql = "update user set username=?,password=?, type=? where id=?";
		db.execute(sql, [user.uname, user.password,user.type, user.id], function(status){
			callback(status);
		});
	},

	deleteRoomTypeInfo: function(room_type_id, callback){
		var sql = "update room_type set deletedAt= CURRENT_TIMESTAMP where room_type_id= ?";
		db.execute(sql, [room_type_id], function(status){
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



