var express = require('express');
var router = express.Router();
var db = require('../utils/dbUtils');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var id = '5';
	db.select('LL_Users',"","where FUserID = @id",{id:id}," ",function(err,result){
		console.log("用户信息主页...");
		res.json(result.recordset);
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
			inputValue:"hujintao"
		},
		i_UserName:{
			sqlType:"string",
			direction:"input",
			inputValue:"hujintao"
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
			inputValue:""
		},
		i_IsSuper:{
			sqlType:"number",
			direction:"input",
			inputValue:0
		},
		i_WeiXinId:{
			sqlType:"string",
			direction:"input",
			inputValue:null
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
	db.executeProcedure("AddLL_Users", user, function(err, recordsets,returnValue,affected){
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
    db.add(user, "CX_Users", function(err, result){
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
		db.select('CX_Users',"","where FUserID = @id",{id:id}," ",function(err,result){
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
		db.likeQuery('select * from CX_Users where UserName like "%@username%"',{username:username},function(err,result){
			console.log(err);
			res.json(result.recordset);
		});
	}
});


module.exports = router;
