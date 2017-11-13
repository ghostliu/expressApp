var express = require('express');

var Utils = require('../utils/utils');
var router = express.Router();
var db = require('../utils/dbUtils');

var requestTime = "["+Utils.DateUtils.getFormatDate(new Date()) + "] ";

router.use(function timeLog(req,res,next){
	console.log(requestTime+"进入index");
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(requestTime + "跳转到主页");
  	res.render('index', { title: 'xx后台管理系统',pageName:'',siteName:"好好哦",users:[{username:"wilson"},{username:"wilson zhong "},{username:"zhang wei"}] });
  	// res.render('admin-index',{title:'这是一个中文标题'});
});

/* 左侧导航,顶部导航 */
//个人设置
router.get('/userInfo',function(res,req,next){
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
router.get('/logout',function(res,req,next){
	console.log(requestTime+"用户退出");
	next();
});

//用户登录
router.get('/login',function(res,req,next){
	console.log(requestTime+"用户登录");
});

//消息
router.get('/userMessage',function(res,req,next){
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
		res.render('systemSet',{pageName:'系统配置',siteName:siteName});
	});
});
/*
create table LL_SystemConfig (
   FID                  int                  identity,
   FName                varchar(200)         null,
   FValue               varchar(500)         null,
   FNote                varchar(500)         null
)
go

if exists (select 1
          from sysobjects
          where  id = object_id('UpdateLL_SystemConfig')
          and type in ('P','PC'))
   drop procedure UpdateLL_SystemConfig
go


create procedure UpdateLL_SystemConfig 
@i_FID int,
@i_FName varchar(200),
@i_FValue varchar(500),
@i_FNote varchar(500)
as

begin

if @i_FID =''
    insert into LL_SystemConfig(FName,FValue,FNote)
    values(@i_FName,@i_FValue,@i_FNote)
else
    update LL_SystemConfig set FName = @i_FName,FValue = @i_FValue,FNote = @i_FNote
    where FID = @i_FID

end
go

*/

module.exports = router;
