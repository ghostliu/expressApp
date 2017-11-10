var express = require('express');

var Utils = require('../utils/utils');
var router = express.Router();

var requestTime = "["+Utils.DateUtils.getFormatDate(new Date()) + "] ";

router.use(function timeLog(req,res,next){
	console.log(requestTime+"进入index");
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(requestTime + "跳转到主页");
  	res.render('index', { title: 'xx后台管理系统',users:[{username:"wilson"},{username:"wilson zhong "},{username:"zhang wei"}] });
  	// res.render('admin-index',{title:'这是一个中文标题'});
});

module.exports = router;
