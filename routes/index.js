var express = require('express');
var router = express.Router();
var articleManager = require('../managers/articles/ArticleManager.js');
var categories = require('../models/mysql/Categories.js');
var moment = require('moment');
var async = require('async');
var blogConf = require('../conf/config.js');

var show = 5;

/* GET home page. */
//router.get('/index', function(req, res, next) {
//	var blogTitle = blogConf.getBlogConf().title;
//
//	// var page = req.query.i != null ? req.query.i : 0;
//	articleManager.getArticles(0).then(function(articles) {
//		return articles;
//		}).then(function(articles){
//		categories.qQuery().then(function(categories){
//			res.render('index', {
//				blogTitle : blogTitle,
//				articles : articles,
//				categories : categories,
//			});
//		});
//	});
//
//});


/*GET home page*/
router.get('/index', function(req, res, next) {
	var blogTitle = blogConf.getBlogConf().title;
	
	async.parallel([            
	  function(callback) {
	    articleManager.getArticles(0, null).then(function (articles) {
			callback(null, articles);  
		});   
	  },
      function(callback) {
		  categories.qQuery().then(function (categories){
			  callback(null, categories); 
		  });
	  }
      ],
      function (err, results) {
		res.render('index', {
			blogTitle : blogTitle,
			articles : results[0],
			categories : results[1],
		});
	});
	
});

module.exports = router;
