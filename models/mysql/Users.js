var DB = require('../db.js');
var BaseModel = require('../base');

var Users = DB.getMysqlSchema().define('users', {
    id: { type : Number, dataType: 'int', index : true },
	name : String,
	password : String,
	email : String,
	created: Date
});

for (var key in BaseModel) {
	Users[key] = BaseModel[key];
}

for (var key in BaseModel.proFunctions()) {
	Users.prototype[key] = BaseModel.proFunctions()[key];
}

module.exports = Users;
