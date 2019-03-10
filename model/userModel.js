var db = require('./db');

module.exports={
	getAll: function(callback){
		var sql = "select * from users";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	insertUser: function(user, callback){
		var sql = "insert into users(username,name,password,email,phone,user_role,image) values (?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [user.username, user.name, user.password, user.email, user.phone, user.role, user.image], function(status){
			callback(status);
		});
	},
	checkUser: function(user, callback){
		var sql = "select * from user where username=?";

		db.getResult(sql, [user.username], function(result){
			callback(result);
		});
	},
	update: function(user, callback){
		var sql = "update user set username=?,password=?, type=? where id=?";
		db.execute(sql, [user.uname, user.password,user.type, user.id], function(status){
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



