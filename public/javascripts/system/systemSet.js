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
            type: 'POST',
            url: '/systemSet/saveSystemConfig',
            data: postData,
            dataType: 'json',
            success: function (data) {
              alert('保存成功!');
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
