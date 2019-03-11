var db = require('./db');

module.exports={

    getHotels: function(callback){
		var sql = "select * from hotels where deletedAt is null order by hotel_id asc LIMIT 5";
		db.getResult(sql, [], function(results){
			callback(results);
		});
		},

    getHotelTitleID: function(hotelID, callback){
		var sql = "SELECT title, hotel_id from hotels where hotel_id=?";

		db.getResult(sql, [hotelID], function(result){
			callback(result);
		});
		},
		
    getHotelRoomType: function(hotelID, callback){
		var sql = "select * from room_type where deletedAt is null and hotel_id= ?  order by hotel_id asc";
		db.getResult(sql, [hotelID], function(results){
			callback(results);
		});
		},

		getHotelRoomTypeTitle: function(roomTypeID, callback){
			var sql = "SELECT room_name from room_type where room_type_id= ?";
			db.getResult(sql, [roomTypeID], function(results){
				callback(results);
			});
			},

		getRoomTypeData: function(ids, callback){
			var sql = "SELECT * from room_type where hotel_id= ? and room_type_id= ?";
			db.getResult(sql, [ids.hotel_id , ids.room_type_id], function(results){
				callback(results);
			});
			},

		insertHotelBooking: function(allData, callback){
			var sql = "insert into hotel_enquiry(hotel_id, room_type_id, name, email, phone, checkin, checkout, total_room, child, adult, message, count, addedBy) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
			db.execute(sql, [allData.hotel_id, allData.room_type_id, allData.enq_hotel_name, allData.enq_hotel_email, allData.enq_hotel_phone, allData.enq_hotel_checkin, allData.enq_hotel_checkout, allData.enq_hotel_room, allData.enq_hotel_child, allData.enq_hotel_adult, allData.enq_hotel_message, allData.count, allData.name], function(status){
				callback(status);
			});
		}, 

		updateAvailableRoom: function(updateData, callback){
			var sql = "UPDATE room_type SET available= ? WHERE hotel_id= ? and room_type_id= ?";
			db.execute(sql, [updateData.available, updateData.hotel_id, updateData.room_type_id], function(status){
				callback(status);
			});
		}
}



