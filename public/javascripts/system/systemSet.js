(function($) {
  this.saveSystemConfig = function(e) {
    var postData = 
    {
    	FID:1,
    	FName:'siteName',
    	FValue:$("#siteName").val(),
    	FNote:''
    };

    $.ajax(
        {
            type: 'post',
            url: '/systemSet/saveSystemConfig',
            data: postData,
            dataType: 'json',
            success: function (data) {
                if (data) {
                	console.log(data);
                }
            },
            error: function () {
                alert('保存失败!');
                return;
            }
        });
  }
})(jQuery);
