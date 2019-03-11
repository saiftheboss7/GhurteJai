var db = require('./db');

module.exports={
	get: function(username, callback){
		var sql = "select * from users where username=?";

		db.getResult(sql, [username], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	getAllUsers: function(callback){
		var sql = "select * from users where deletedAt is null order by username asc";
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

	updateUserInfo: function(user, callback){
		var sql = "UPDATE users SET name= ?, password= ?, email=?, phone=? where username= ?";
		db.execute(sql, [user.result.name, user.result.password, user.result.email, user.result.phone, user.id], function(status){
			callback(status);
		});
	},

	updateUserInfoNoPass: function(user, callback){
		var sql = "UPDATE users SET name= ?, email=?, phone=? where username= ?";
		db.execute(sql, [user.result.name, user.result.email, user.result.phone, user.id], function(status){
			callback(status);
		});
	},

	update: function(user, callback){
		var sql = "update user set username=?,password=?, type=? where id=?";
		db.execute(sql, [user.uname, user.password,user.type, user.id], function(status){
			callback(status);
		});
	},

	deleteUserInfo: function(username, callback){
		var sql = "update users set deletedAt= CURRENT_TIMESTAMP where username= ?";
		db.execute(sql, [username], function(status){
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



