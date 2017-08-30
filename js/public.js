$(function () {
	// 浏览器视口的变化
	$(window).resize(function(){ 
        var width=$(window).width();
        // 如果视口宽度小于750时进行响应式设计
        if(width<750){
            // 如果浏览器屏幕小于750；把轮播图的图片进行替换
        	$('.bannerbox .banner img').attr("src","image/banner1.jpg");
            // 把课程的图片进行替换
        	$('.course .left img').attr("src","image/card11.jpg");
            // 根据浏览器的滚动；对底部进行固定
        	$(window).scroll(function(){
                // 当滚动页面大于3200时，一直固定
    			if($(document).scrollTop()>=3200){
    				$('.fixed').css('position','relative');
    			}else{
                    // 达到底部时，让固定的模块嵌入页面里
    				$('.fixed').css('position','fixed');
    			}
    		});
            // 点击出现弹出层
    		$('.head .right').click(function(){
    			$('.menu').css("display","block");
                // 把弹出层进行删除
    			$('.icon_close').click(function(){   
    				$('.pop').css("display","none");
    			});
    		});
        }else{
            // 保持1120px时正常显示
        	$('.bannerbox .banner img').attr("src","image/banner.jpg");
        	$('.course .left img').attr("src","image/card1.jpg");
        	$('.menu').css("display","none");
        }
    });   
})