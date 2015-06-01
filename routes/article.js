var express = require('express');
var router = express.Router();
var articles = require('../models/mysql/Articles.js');
var articleManager = require('../managers/articles/ArticleManager.js');
var categories = require('../models/mysql/Categories.js');
var blogConf = require('../conf/config.js');
var async = require('async');

var blogTitle = blogConf.getBlogConf().title;

/* get article detail */
router.get('/detail', function(req, res, next) {
	var id = req.query.id;
	articles.qQueryOne({
		'id' : id
	}).then(function(article) {
		return article;
	}).then(function(article) {
		categories.qQuery().then(function(categories) {
			res.render('articleDetail', {
				blogTitle : blogTitle,
				article : article,
				categories : categories,
			});
		});
	});

});

/* get page articles when scrolling */
router.get('/pageArticles', function(req, res, next) {
	// res.send(req.query.id);
	var page = req.query.page != null ? req.query.page : 0;
	var category = req.query.category;
	articleManager.getArticles(page, category).then(function(articles) {
		res.send(articles);
	});
});

/* get page articles with category */
router.get('/category', function(req, res, next) {
	var id = req.query.id;
	
	async.parallel([ function(callback) {
		articleManager.getArticles(0, id).then(function(articles) {
			callback(null, articles);
		});
	}, function(callback) {
		categories.qQuery().then(function(categories) {
			callback(null, categories);
		});
	} ], function(err, results) {
		res.render('category', {
			blogTitle : blogTitle,
			articles : results[0],
			categories : results[1],
			categoryId : id,
		});
	});
});

/*add new article*/
router.get('/creation', function(req, res) {
	async.parallel([ function (callback) {
	  categories.qQuery().then(function(categories) {
	    callback(null, categories);
		});
	}], function (err, results) {
		res.render('creation', {
			blogTitle : blogTitle,
			categories : results[0],
		});
	});

});

module.exports = router;