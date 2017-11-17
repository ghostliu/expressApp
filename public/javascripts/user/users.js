(function($) {
    //获得浏览器参数
    $.extend({
        getUrlVars: function() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++){
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function(name){
            return $.getUrlVars()[name];
        }
    });
    //封装浏览器参数
    var composeUrlParams=function(){
        var param='';
        $.each($.getUrlVars(), function(i, item) {
            if(item!='p'){
                var val=$.getUrlVar(item);
                if(val) param += "&" + item+"="+val;
            }
            });
        return param;
    }

    var page=$('#page1');
    var options = {
         //当前页
        currentPage:page.attr('pageNum'),
        //总页数
        totalPages:page.attr('pageCount'),
        //每页显示数量
        numberOfPages:page.attr('numberOfPages'),
        pageUrl: function(type, page, current) {
            return "/users?" + composeUrlParams() + "&p=" + page;
        }
    };

    $('#page1').bootstrapPaginator(options);

    // 搜索按钮点击事件
    $("#searchBtn").on("click",function(){
        var searchContent = $("#searchValue").val();

        if (searchValue == "" || searchValue == undefined){
            return ;
        }

        $.ajax(
        {
            type: 'POST',
            url: '/users',
            data: {searchContent:searchContent},
            dataType: 'json',
            success: function (data) {
                console.log('查询失败!');
                if (data) {
                    console.log(data);
                }
            },
            error: function () {
                console.log('查询失败!');
                return;
            }
        });
    });

})(jQuery);
