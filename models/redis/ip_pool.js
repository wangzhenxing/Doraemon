var DB = require('../db.js');
var BaseModel = require('../base');

var IpPool = DB.getSchema().define('ip_pool', {
	ip: { type: String, index: true },
	client_key: { type: String, index: true },
	updated : { type:Date}
}, {
	restPath: '/ip_pool' // tell WebService adapter which path use as API endpoint
});


IpPool.validatesPresenceOf('ip', 'client_key', 'updated');

for (var key in BaseModel) {
	IpPool[key] = BaseModel[key];
}

for (var key in BaseModel.proFunctions()) {
	IpPool.prototype[key] = BaseModel.proFunctions()[key];
}

module.exports = IpPool;