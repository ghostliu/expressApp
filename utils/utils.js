Date.prototype.format = function(format) {
	var o = {
		"M+":this.getMonth()+1,
		"d+":this.getDate(),
		"h+":this.getHours(),
		"m+":this.getMinutes(),
		"s+":this.getSeconds(),
		"q+":Math.floor((this.getMonth() + 3) / 3),
		"S":this.getMilliseconds()
	};
	if (/(y+)/.test(format))
	{
		format = format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for (key in o)
	{
		if (new RegExp("(" + key + ")").test(format))
		{
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[key] : ("00" + o[key]).substr(("" + o[key]).length));
		}
	}
	return format;
};

var Utils = {
	isEmptyString:function(value) {
		if (value == "" || value == undefined || value == null)
		{
			return true;
		} else {
			return false;
		}
	}
};



var DateUtils = {
	getFormatDate:function(date,pattern) {
		try
		{
			if(Utils.isEmptyString(date))
			{
				return "";
			}
			if (Utils.isEmptyString(pattern))
			{
				pattern = 'yyyy-MM-dd hh:mm:ss';	
			}
			return date.format(pattern);
		} catch (e){
			console.log("日期转换错误："+date + ",格式："+date.format);
			return date;
		}
	}
};

exports.DateUtils = DateUtils;
exports.Utils = Utils; 