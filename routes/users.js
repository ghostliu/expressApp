var express = require('express');
var router = express.Router();
var Utils = require('../utils/utils');
var db = require('../utils/dbUtils');

var requestTime = "["+Utils.DateUtils.getFormatDate(new Date()) + "] ";

/* GET users listing. */
//查询用户信息
router.get('/', function(req, res, next) {
	//var id = '5';
	//db.select('SYS_Users',"","where FUserID = @id",{id:id}," ",function(err,result){
	/*db.selectAll('SYS_Users',function(err,result){
		console.log(requestTime + "跳转到用户主页");
		res.render('users', { title: '用户管理',pageName:'用户管理',users:result.recordset});
	});*/
	// 请求页,如果为空则显示第1页
	var page = 1;
	if(req.query.p){
		page = req.query.p < 1 ? 1 : req.query.p;
	}
	// 每页显示数量
	var limit = req.body.numberOfPages ? req.body.numberOfPages : 10;
	
	var searchContent = req.body.searchContent ? req.body.searchContent : '';
	console.log('pageSize: %d,page: %d ,searchContent: %s',limit,page,searchContent);

	var pageOption = {
		i_pageSize:{
			sqlType:"number",
			direction:"input",
			inputValue:limit
		},
		i_page:{
			sqlType:"number",
			direction:"input",
			inputValue:page
		},
		i_query:{
			sqlType:"string",
			direction:"input",
			inputValue:searchContent
		}
	};

	db.executeProcedure('pageSYS_User',pageOption,function(err, recordsets,returnValue,affected){
		console.log(requestTime + "跳转到用户主页");
		if (err){
    		res.json(err);
    	} else
    	{
    		// size 当前页面有多少条记录
			// pageCount 一共有多少页
			// numberOf 分页用几个标签显示
    		//res.json(recordsets);
    		var pageCount = recordsets.recordsets[1][0].totalCount;
    		res.render('users', { title: '用户管理',pageName:'用户管理',users:recordsets.recordset,
    			totalCount:pageCount,
    			pageCount: Math.ceil(parseInt(pageCount) / limit),
    			size:recordsets.recordset.length,
    			numberOf:pageCount > 10 ? 10 : pageCount,
    			num:page,
    			limit:limit});
    		//console.log(recordsets.recordsets[1][0].totalCount);	
    	}
	});
});

//存储过程添加用户
router.get('/addUser',function(req,res,next) {
	//执行存储过程，使用的参数名称要和数据库中的参数一致
	//direction值暂时无用
	var user = {
		i_LoginName:{
			sqlType:"string",
			direction:"input",
			inputValue:"testUser"
		},
		i_UserName:{
			sqlType:"string",
			direction:"input",
			inputValue:"测试用户2"
		},
		i_Password:{
			sqlType:"string",
			direction:"input",
			inputValue:"123888"
		},
		i_Sex:{
			sqlType:"number",
			direction:"input",
			inputValue:1
		},
		i_Email:{
			sqlType:"string",
			direction:"input",
			inputValue:"liulizhi@129.com"
		},
		i_MobilePhone:{
			sqlType:"string",
			direction:"input",
			inputValue:"15161623605"
		},
		i_FNote:{
			sqlType:"string",
			direction:"input",
			inputValue:"我是备注"
		},
		i_IsSuper:{
			sqlType:"number",
			direction:"input",
			inputValue:0
		},
		i_WeiXinId:{
			sqlType:"string",
			direction:"input",
			inputValue:'rider999'
		},
		i_CreateByUserId:{
			sqlType:"number",
			direction:"input",
			inputValue:10000
		},
		i_CreateByUserName:{
			sqlType:"string",
			direction:"input",
			inputValue:'系统管理员'
		},
	};
	db.executeProcedure("AddSYS_User", user, function(err, recordsets,returnValue,affected){
    	console.log('存储过程方式插入成功');
    	if (err){
    		res.json(err);
    	} else
    	{
    		res.json(recordsets);	
    	}
    	//res.redirect('back');//返回前一个页面
    });
});

router.get('/add', function (req, res, next) {//添加一条数据
    var user = {
    	username:'liulixhi',
    	LoginName:'llz',
    	pwd:'123',
    	email:'liu@124.com',
    	Telephone:'151616123456'
    };
    db.add(user, "SYS_Users", function(err, result){
    	console.log('插入成功'+res.json(result));
        //res.redirect('back');//返回前一个页面
    });
});

router.get('/delete/:id', function (req, res, next) {//删除一条id对应的news表的数据
    var id = req.params.id;
    db.del("where id = @id", {id:id}, "news", function(err, result){
        res.redirect('back');//返回前一个页面
    });
});
 
router.post('/update/:id', function (req, res, next) {//更新一条对应id的news表的数据
    var id = req.params.id;
    var content = req.body.content;
    db.update({content:content}, {id:id}, "news", function(err, result){
        res.redirect('back');
    });
});

router.get('/getUserById/:id',function(req,res,next) {
	var id = req.params.id;
	if (isNaN(id)){
		res.json('{error:"输入参数有误！"}');
	} else {
		db.select('SYS_Users',"","where FUserID = @id",{id:id}," ",function(err,result){
			console.log(err);
			res.json(result.recordset);
		});	
	}
});

router.get('/getUserByUserName/:username',function(req,res,next) {
	var username = req.params.username;
	if (username == ""){
		res.json('{error:"输入参数有误！"}');
	} else {
		db.likeQuery('select * from SYS_Users where UserName like "%@username%"',{username:username},function(err,result){
			console.log(err);
			res.json(result.recordset);
		});
	}
});


module.exports = router;
