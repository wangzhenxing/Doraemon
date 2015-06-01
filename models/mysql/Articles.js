var DB = require('../db.js');
var BaseModel = require('../base.js');

var Articles = DB.getMysqlSchema().define('articles', {
	id: { type : Number, dataType: 'int', index : true },
	title : String,
	author : String,
	hits : Number,
	content : String,
	category : Number,
	created : Date,
	updated : Date,
	status : Number,
	created_date : Date,
});

for (var key in BaseModel) {
        Articles[key] = BaseModel[key];
}

for (var key in BaseModel.proFunctions()) {
        Articles.prototype[key] = BaseModel.proFunctions()[key];
}

module.exports = Articles;