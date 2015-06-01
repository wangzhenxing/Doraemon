var Q = require('q');   

exports.proFunctions = function() {
	return {"qSave": qSave, "qDestroy": qDestroy};
}

/*
* 采用promise编程风格的q类库，进行更新操作
*/
var qSave = function() {
	var self = this;
	var deferred = Q.defer();
	this.isValid(function (valid) {
    	if (!valid) {
        	deferred.reject(self.errors); // hash of errors {attr: [errmessage, errmessage, ...], attr: ...}    
   		 } else {
			self.save(function(err, addedObj){
				if(err === undefined || err === null) {
					deferred.resolve(addedObj);
				} else {
					deferred.reject(err);
				}
			})
		}
	});
	return deferred.promise;
}

var qDestroy = function() {
	var self = this;
	var deferred = Q.defer();

	self.destroy(function(err){
		if(err === undefined || err === null) {
			deferred.resolve("destroy success");
		} else {
			deferred.reject(err);
		}
	});

	return deferred.promise;
}

/*
* 采用promise编程风格的q类库，进行查询操作，返回json_array
* order: "key desc; key asc"
*/
exports.qQuery = function(queryConditions, limit, offset, order) {
	var deferred = Q.defer();

	var allConditions = {};
	if(queryConditions !== undefined && queryConditions !== null && Object.keys(queryConditions).length != 0) {
		allConditions = {"where": queryConditions};
	}

	if(limit !== null && limit !== undefined) {
		allConditions.limit = limit;
	}

	if(offset !== null && offset !== undefined) {
		allConditions.offset = offset;
	}

	if(order !== null && order !== undefined) {
		allConditions.order = order;
	}

	this.all(allConditions, function(err, objs){
		if(err === undefined || err === null) {
			if (objs === null || objs === undefined) {
				objs = [];
			}
			deferred.resolve(objs);
		} else {
			deferred.reject(new Error(err));
		}
	});
	return deferred.promise;
}

/*
 * 采用promise编程风格的q类库，进行查询操作，返回object
 * order: "key desc; key asc"
 */
exports.qQueryOne = function(queryConditions, order) {
	var deferred = Q.defer();

	var allConditions = {};
	if(queryConditions !== undefined && queryConditions != null && Object.keys(queryConditions).length != 0) {
		allConditions = {"where": queryConditions};
	}

	if(order != null && order !== undefined) {
		allConditions.order = order;
	}

	this.findOne(allConditions, function(err, objs){
		if(err === undefined || err === null) {
			if (objs === null || objs === undefined) {
				objs = [];
			}
			deferred.resolve(objs);
		} else {
			deferred.reject(new Error(err));
		}
	});
	return deferred.promise;
}

/*
* 采用promise编程风格的q类库，根据id进行查询操作，返回json_object
*/
exports.qQueryById = function(id) {
	var deferred = Q.defer();
	
	this.find(id, function(err, obj){
		if(err === undefined || err === null) { 
			deferred.resolve(obj);
		} else {
			deferred.reject(new Error(err));
		}
	});
	return deferred.promise;
}

/*
* 采用promise编程风格的q类库
* 如果id=data.id, update
* 否则insert
*/
exports.qUpsert = function(data) {
	var deferred = Q.defer();
	
	this.upsert(data, function(err){
		if(err === undefined || err === null) { 
			deferred.resolve("success");
		} else {
			deferred.reject(new Error(err));
		}
	});
	return deferred.promise;
}

exports.qUpsertByKeys = function(data, keys) {
	var deferred = Q.defer();
	var Model = this;

	var queryCon = {};
	for(var i in keys) {
		queryCon[keys[i]] = data[keys[i]];
	}
	Model.all({'where': queryCon}, function(err, foundObjs){
		if(err === undefined || err === null) {
			if(foundObjs.length > 0) {
				var promises = [];
				for(var i=0; i<foundObjs.length; i++) {
					if(foundObjs[i].id !== undefined) {
						promises.push(updateByModel(data, foundObjs[i]));
					}
				}
				Q.all(promises).then(
					function(success) {
						deferred.resolve("success");
					},function(err){
						deferred.reject(new Error("fail"));
					});
			} else {
        		Model.create(data, function(err, addedObj) {
		        	if(err === null) {
						deferred.resolve(addedObj);
					} else {
						deferred.reject(new Error(err));
					}
		       	}); 
			}	
		} else {
			deferred.reject(new Error(err));
		}
	});
	return deferred.promise;
}

exports.qDestroyAll = function() {
	var deferred = Q.defer();

	this.destroyAll(function(err){
		if(err === undefined || err === null) {
			deferred.resolve("destroy all success");
		} else {
			deferred.reject(new Error(err));
		}
	});
	return deferred.promise;
}

/**
 * 注意！目前该方法仅mysql-adpter支持！
 * @param queryConditions
 * @param updateData
 * @returns {promise|*|Q.promise}
 */
exports.qUpdate = function(queryConditions, updateData) {
	var deferred = Q.defer();

	var allConditions = {};
	if (queryConditions !== undefined && queryConditions !== null && Object.keys(queryConditions).length != 0) {
		allConditions = {"where": queryConditions};
	} else {
		deferred.reject(new Error('query condition missing'));
	}
	if(updateData !== undefined && updateData !== null && Object.keys(updateData).length != 0) {
		allConditions.update = updateData;
	} else {
		deferred.reject(new Error('update data missing'));
	}

	this.update(allConditions, function(err) {
		if(err === undefined || err === null) {
			deferred.resolve("destroy all success");
		} else {
			deferred.reject(new Error(err));
		}
	});

	return deferred.promise;
}

var updateByModel = function(data, model) {
	var deferred = Q.defer();
	model.updateAttributes(data, function(err, updatedObj){
		if(err === null) {
			deferred.resolve(updatedObj);
		} else {
			deferred.reject(new Error(err));
		}
	});
	return deferred.promise;
}