var express = require('express');

var Utils = require('../utils/utils');
var router = express.Router();
var db = require('../utils/dbUtils');

var requestTime = "["+Utils.DateUtils.getFormatDate(new Date()) + "] ";

router.use(function timeLog(req, res, next){
	console.log(requestTime+"进入index");
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(requestTime + "跳转到主页");
	var siteName = '';
  	res.render('index', { title: siteName+'后台管理系统',pageName:'',siteName:siteName,users:[{username:"wilson"},{username:"wilson zhong "},{username:"zhang wei"}] });
  	// res.render('admin-index',{title:'这是一个中文标题'});
});

/* 左侧导航,顶部导航 */
//个人设置
router.get('/userInfo',function(req, res, next){
	console.log(requestTime+"用户信息页面");
	var userInfo = {
		fuserid:10000,
		fusername:'我是谁啊',
		password:'123456',
		sex:1,
		email:'liulizhi10@124.com'
	};
	res.render('userInfo',{pageName:'个人信息设置',userInfo:userInfo});
});

//用户退出
router.get('/logout',function(req, res, next){
	console.log(requestTime+"用户退出");
	next();
});

//用户登录
router.get('/login',function(req, res, next){
	console.log(requestTime+"用户登录");
});

//消息
router.get('/userMessage',function(req, res, next){
	console.log(requestTime+"用户信息页面");
});

//系统配置
router.get('/systemSet',function(req, res, next) {
	console.log(requestTime + "系统配置");
	db.selectAll("LL_systemConfig",function(error,result){
		var sysConfig = result.recordset;
		var siteName = '';
		//res.json(sysConfig);
		for(var i = 0; i < sysConfig.length; i++)
		{
			switch(sysConfig[i].FName){
				case "siteName":	
					siteName = sysConfig[i].FValue;
					break;
				default:
					console.log("无参数值");
			}
		}
		res.render('systemSet',{title:'系统配置',pageName:'系统配置',siteNameInfo:siteName});
	});
});

// 系统配置，更新--get
router.get('/systemSet/saveSystemConfig',function(req, res, next){
	console.log(requestTime+'get系统配置信息更新');
	var type = 'req.query.type';
    var info = 'req.query.info';
    var ajaxTest = {
    	tips:'you are not alone'
    }
    res.send(ajaxTest);
    //res.json(['success', "服务器收到一个Ajax ["+type+"] 请求，信息为："+info]); 
});

// 系统配置，更新--post
router.post('/systemSet/saveSystemConfig',function(req, res, next){
	console.log(requestTime+'post系统配置信息更新');
	console.log("request url:"+req.url);
	var fid = req.body.FID;
	var fname = req.body.FName;
	var fvalue = req.body.FValue;
	var fnote = req.body.FNote;
	var systemConfig = {
		i_FID:{
			sqlType:"number",
			inputValue:fid
		},
		i_FName:{
			sqlType:"string",
			inputValue:fname
		},
		i_FValue:{
			sqlType:"string",
			inputValue:fvalue
		},
		i_FNote:{
			sqlType:"string",
			inputValue:fnote
		}
	};

	db.executeProcedure("UpdateLL_SystemConfig", systemConfig, function(err, recordsets,returnValue,affected){
    	if (err){
    		console.log('系统配置信息更新失败');
    		res.json(err);
    	} else
    	{
    		console.log('系统配置信息更新成功');
    		res.json(recordsets);	
    	}
    	//res.redirect('back');//返回前一个页面
    });

	//res.json({success:1});
	//res.redirect('/systemSet');
});

module.exports = router;
