/** 
  * Module dependencies. 
  */

var Config = require('./../conf/config.js');
var Schema = require('jugglingdb').Schema;
var schema = new Schema('redis', Config.getRedisConf()); //port number depends on your configuration
var mysqlSchema = new Schema('mysql', Config.getMysqlConf());

/**
  * please refer https://github.com/1602/jugglingdb
  * return schema object
  */
exports.getSchema = function() {
	return schema;
}

exports.getMysqlSchema = function() {
	return mysqlSchema;
}
