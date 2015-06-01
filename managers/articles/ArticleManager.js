var articles = require('../../models/mysql/Articles.js');
var blogConf = require('../../conf/config.js');
var Q = require('q');
var moment = require('moment');

exports.getArticles = function(curPage, category) {
	var deferred = Q.defer();

	var pageSize = blogConf.getBlogConf().pageSize;
	var where = {};
	if (category !== null && category !== '') {
		where = {
			category : category
		};
	}
	articles.qQuery(where, pageSize, pageSize * curPage, "created desc").then(
			function(articles) {
				if (articles) {
					for ( var i in articles) {
						if (articles[i].content.length > 200) {
							articles[i].content = articles[i].content
									.substring(0, 200)
									+ "...";
						}
						articles[i].time = moment(articles[i].created).format(
								'YYYY-MM-DD HH:mm');
					}
				} else {
					articles = [];
				}
				deferred.resolve(articles);

			});

	return deferred.promise;
}