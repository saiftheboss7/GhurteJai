var db = require('./db');

module.exports={

    getHotels: function(callback){
		var sql = "select * from hotels where deletedAt is null order by hotel_id asc LIMIT 5";
		db.getResult(sql, [], function(results){
			callback(results);
		});
    },
    
    getMinPrice: function(userId, callback){
		var sql = "SELECT min(price) from room_type WHERE hotel_id= ?";

		db.getResult(sql, [minPrice], function(result){
			callback(result);
		});
    },

    getPosts: function(callback){
		var sql = "select * from posts where deletedAt is null order by addedOn asc LIMIT 3";
		db.getResult(sql, [], function(results){
			callback(results);
		});
    },

    getCategoryTitle: function(catID, callback){
		var sql = "SELECT title from categories WHERE cat_id=?";

		db.getResult(sql, [catID], function(result){
			callback(result);
		});
		}
		
}



