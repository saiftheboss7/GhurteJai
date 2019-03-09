var db = require('./db');

module.exports={

    getHotels: function(callback){
		var sql = "select * from hotels where deletedAt is null order by hotel_id asc LIMIT 5";
		db.getResult(sql, [], function(results){
			callback(results);
		});
    },

    getHotelTitle: function(hotelID, callback){
		var sql = "SELECT title from hotels where hotel_id=?";

		db.getResult(sql, [hotelID], function(result){
			callback(result);
		});
    },
    getHotelRoomType: function(hotelID, callback){
		var sql = "select * from room_type where deletedAt is null and hotel_id= ?  order by hotel_id asc";
		db.getResult(sql, [hotelID], function(results){
			callback(results);
		});
    }
		
}



