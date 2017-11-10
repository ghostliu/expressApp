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
  	//res.render('index', { title: 'Express jade',users:[{username:"wilson"},{username:"wilson zhong "},{username:"zhang wei"}] });
  	res.render('admin-index');
});

module.exports = router;
