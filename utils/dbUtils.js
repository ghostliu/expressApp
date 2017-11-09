var mssql = require('mssql');
var config = require('./config');

var direction = {
    Input:"input",
    Output:"output",
    Return:"return"
};

var restoreDefaults = function()
{
	config	
};

var getConnection = function(callback)
{
	if(!callback)
	{
		callback = function(){};
	}

	var con = new mssql.ConnectionPool(config,function(err){
		if(err)
		{
			throw err;
		}
		callback(con);
	});
}

//写sql语句自由查询
var querySql = function (sql, params, callBack) {
    getConnection(function(connection){
        var ps = new mssql.PreparedStatement(connection);
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

//执行存储过程，输出参数有问题，不使用output
var executeProcedure = function(procedure,params,callBack) {
    getConnection(function(connection){
        var request = new mssql.Request(connection);
        if (params != "")
        {
            for (var index in params)
            {
                //console.log("参数："+index +"参数值："+params[index].inputValue + " sqltype: "+params[index].sqlType);
                /*if (params[index].directon == direction.Output)
                {
                    request.output(index,params[index].sqlType);
                } else {
                    request.input(index,params[index].sqlType,params[index].inputValue);
                }*/
                if (params[index].sqlType == "string")
                {
                    request.input(index,mssql.NVarChar,params[index].inputValue);
                } else if (params[index].sqlType == "number")
                {
                    request.input(index,mssql.Int,params[index].inputValue);
                }
            }
        }
        request.execute(procedure,function(error,recordsets,returnValue,affected){
            if(error){
                callBack(error);
            } else {
                /*for (var index in params)
                {

                    if(params[index].direction == direction.Output)
                    {
                        console.log("输出参数值："+JSON.stringify(request.parameters[index]));
                        params[index].outputValue = request.parameters[index].value;
                    }
                }*/
                callBack(error,recordsets,returnValue,affected);
                //recordsets结果 
                //{"recordsets":[[{"UserID":"12373"}]],"recordset":[{"UserID":"12373"}],"output":{},"rowsAffected":[1,1,1,1],"returnValue":1}
            }
        });
    });
    restoreDefaults();
};

/*alter PROCEDURE [dbo].[AddCX_Users]  
@i_UserName     varchar(100),  
@i_LoginName    varchar(100),  
@i_PWD          varchar(100),  
@i_EMail        varchar(100),  
@i_Telephone    varchar(100),  
@i_Mobilephone  varchar(100),  
@i_IsSuper      bit,
@o_UserId       varchar(50) output 
as  
Insert Into CX_Users (  
 UserName,  
 LoginName,  
 PWD,  
 EMail,  
 Telephone,  
 Mobilephone,  
 IsSuper  
)  
Values(  
 @i_UserName,  
 @i_LoginName,  
 @i_PWD,  
 @i_EMail,  
 @i_Telephone,  
 @i_Mobilephone,  
 @i_IsSuper  
)  
set @o_UserId =@@identity  
select @o_UserId as UserID
return 1*/

//模糊查询，未完成
var likeQuery = function(sql,params,callBack) {
    getConnection(function(connection){
        var ps = new mssql.PreparedStatement(connection);
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

//查询该表所有符合条件的数据并可以指定前几个
var select = function (tableName, topNumber, whereSql, params, orderSql, callBack) {
    getConnection(function(connection){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "select * from " + tableName + " ";
        if (topNumber != "") {
            sql = "select top(" + topNumber + ") * from " + tableName + " ";
        }
        sql += whereSql + " ";
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    console.log("参数是数值型");
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    console.log("参数是字符串型:"+mssql.NVarChar);
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        sql += orderSql;
        console.log(sql);
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

var selectAll = function (tableName, callBack) {//查询该表所有数据
    getConnection(function(connection){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "select * from " + tableName + " ";
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute("", function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

var add = function (addObj, tableName, callBack) {//添加数据
    getConnection(function(connection){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "insert into " + tableName + "(";
        if (addObj != "") {
            for (var index in addObj) {
                if (typeof addObj[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof addObj[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
                sql += index + ",";
            }
            sql = sql.substring(0, sql.length - 1) + ") values(";
            for (var index in addObj) {
                if (typeof addObj[index] == "number") {
                    sql += addObj[index] + ",";
                } else if (typeof addObj[index] == "string") {
                    sql += "'" + addObj[index] + "'" + ",";
                }
            }
        }
        sql = sql.substring(0, sql.length - 1) + ")";
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(addObj, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

var update = function (updateObj, whereObj, tableName, callBack) {//更新数据
    getConnection(function(connection){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "update " + tableName + " set ";
        if (updateObj != "") {
            for (var index in updateObj) {
                if (typeof updateObj[index] == "number") {
                    ps.input(index, mssql.Int);
                    sql += index + "=" + updateObj[index] + ",";
                } else if (typeof updateObj[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                    sql += index + "=" + "'" + updateObj[index] + "'" + ",";
                }
            }
        }
        sql = sql.substring(0, sql.length - 1) + " where ";
        if (whereObj != "") {
            for (var index in whereObj) {
                if (typeof whereObj[index] == "number") {
                    ps.input(index, mssql.Int);
                    sql += index + "=" + whereObj[index] + " and ";
                } else if (typeof whereObj[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                    sql += index + "=" + "'" + whereObj[index] + "'" + " and ";
                }
            }
        }
        sql = sql.substring(0, sql.length - 5);
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(updateObj, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

var del = function (whereSql, params, tableName, callBack) {//删除数据
    getConnection(function(connection){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "delete from " + tableName + " ";
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        sql += whereSql;
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

exports.config = config;
exports.del = del;
exports.select = select;
exports.update = update;
exports.querySql = querySql;
exports.selectAll = selectAll;
exports.restoreDefaults = restoreDefaults;
exports.add = add;
exports.executeProcedure = executeProcedure;