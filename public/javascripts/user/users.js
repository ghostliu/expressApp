(function($) {
    
    //分页功能
    var options = {
        //当前页
        currentPage:1,
        //总页数
        totalPages:5,
        //每页显示数量
        numberOfPages:10
    };

    $('#page1').bootstrapPaginator(options);

})(jQuery);
