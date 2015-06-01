// scroll and get new articles
function scroll(currentCategory){
	if (currentCategory == undefined) {
		currentCategory = null;
	}
	var winH = $(window).height();
    var i = 1; // current page
    $(window).scroll(function () {
        var pageH = $(document.body).height(); 
        var scrollT = $(window).scrollTop(); 
        var aa = (pageH-winH-scrollT)/winH;
        if (aa < 0.02) {
            $.getJSON("/article/pageArticles", {page : i, category : currentCategory}, function(json){
                if (json) {
                    var str ="";
                    $.each(json, function(index, array){
                        str += "<div class='post'><h3><a href='/article/detail?id=" + array['id'] + "' target='_blank'>" + array['title'] + "</a></h3>";
                        str += "<span>" + array['author'] + "</span>";
                        str += "<span style='padding-left:20px'> 创建于" + array['time'] + "</span>";
                        str += "<span style='padding-left:20px'> 浏览(" + array['hits'] + ")</span>";
                        str += "<br>";
                        str += array['content'];
                        str += "</div>";
                        
                    });
                    $("#mainbody").append(str);
                    i++;
                }
                else {
                    // no article
                    return false;
                }

               });
         }// end of aa < 0.02

    });// end of scroll function
}



$(document).ready(function(){
	scroll($('#category_id').val());
});
