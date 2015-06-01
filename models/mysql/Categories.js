var DB = require('../db.js');
var BaseModel = require('../base.js');

var Categories = DB.getMysqlSchema().define('categories', {
	id: {type : Number, dataType: 'int', index : true},
	name : String,
	total : Number,
});

for (var key in BaseModel) {
	Categories[key] = BaseModel[key];
}

for (var key in BaseModel.proFunctions()) {
	Categories.prototype[key] = BaseModel.proFunctions()[key];
}

module.exports = Categories;