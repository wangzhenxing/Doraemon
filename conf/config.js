/**
  * project conf
  */
exports.getRedisConf = function() {
	return {
		"host": "127.0.0.1",
		"port": 6379
	};
}

exports.getMysqlConf = function() {
	return {
		"host": "127.0.0.1",
		"port": 3306,
		"database": "blog",
    	"username": "root",
		"password": "lyywzx"
	}
}


/**
  * return version
  * @return {int}
  */
exports.getVersion = function() {
	var currentVersion = 5;
	return currentVersion;
}

exports.getPort = function() {
	return 10001;
}

/**
 * @brief function
 * 文章相关配置
 * @return
 */
exports.getBlogConf = function(){
    return {
        'pageSize' : 5,
        'title' : "lyy-wzx blog"
    } ;
}
