var express = require('express');
var router = express.Router();

router.use(function timeLog(req,res,next){
	console.log('Time: ',Date.now());
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("项目启动主页");
  res.render('index', { title: 'Express jade',users:[{username:"wilson"},
  														 {username:"wilson zhong "},
  														 {username:"zhang wei"}] 
  														});
});

module.exports = router;
