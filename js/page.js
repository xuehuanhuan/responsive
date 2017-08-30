var pageTotal=0;//总页数  
var rowTotal=0;//总个数  
var currentPage=0;//当前页数  
var startRow=0;//页开始个数  
var endRow=0;//页结束个数  
var pageSize=4;//每页个数  
$(function(){  
    page();//调用分页函数
    // 对每个页码小按钮设置点击翻页  
    $('.paging .add').on('click','a',function(){
        // 点击每个小按钮添加样式
        $(this).addClass("selected").siblings().removeClass("selected"); 
        // 获取当前点击的页码
        var pageNum=$(this).text(); 
        // 调用翻页函数 
        gotoPage(pageNum); 
    }); 
    // 点击前一个按钮函数
    $(".paging .prev").click(function(){
        // 如果当前处于第一页则不能再点击向前按钮
        if(currentPage==1){  
            $(".paging .prev").addClass("btn-disable");
        }else{  
            // 进行向前点击
            gotoPage(--currentPage);
            // 可以向前点击则把下一个按钮置成可用状态
            $(".paging .last").removeClass("btn-disable"); 
            // 页码按钮进行相应的变化
            $('.paging .add a').eq(currentPage-1).addClass("selected").siblings().removeClass("selected"); 
        }  
    });  
    // 点击下一个按钮
    $(".paging .last").click(function(){ 
        // 如果当前处于最后一页则不能再点击向后按钮 
        if(currentPage==pageTotal){  
            $(".paging .last").addClass("btn-disable");
        }else{  
            gotoPage(++currentPage);
            // 页码按钮进行相应的变化
            $('.paging .add a').eq(currentPage-1).addClass("selected").siblings().removeClass("selected");
            // 把向前的按钮置成可用状态
            $(".paging .prev").removeClass("btn-disable");
        }  
    })  
});  
 //进行页面的数据渲染函数 
function page(){  
    // 使用json处理数据
    $.ajax({  
        url:"json.json",  
        type:"POST",  
        dataType:"json",  
        timeout:1000,  
        error:function(){  
            alert("ajax error");  
        },  
        success:function(data){  
            rowTotal=data.length; //获取json的数据个数 
            pageTotal=Math.ceil(rowTotal/pageSize);//上取整求页数  
            currentPage=1; //设置当前页为第一页 
            //绘制数据，进行渲染  
            if(pageTotal==1){  
                // 循环加载数据
                for(var i=0;i<pageSize;i++){  
                    // 把页面结构添加
                    $(".describe").append('<div class="subCon"><div class="left"><img src="" alt="" /></div><div class="right"><div class="title"><div class="title1"></div><div class="title2"></div></div><div class="con"></div><div class="btn"><a href="">现在预约</a></div></div></div>');
                    // 把json的图片信息加载到页面上
                    $('.subCon').eq(i).find('img').attr("src",data[i].img);
                    // 把标题的信息添到页面上
                    $('.subCon').eq(i).find('.title1').html(data[i].title);
                    $('.subCon').eq(i).find('.title2').html(data[i].subTitle);
                    // 把内容的图片加载到页面上
                    $('.subCon').eq(i).find('.con').html(data[i].con);
                }  
            }else{ 
                 //页面等于其他页数时进行渲染 
                for(var i=0;i<pageSize;i++){  
                    $(".describe").append('<div class="subCon"><div class="left"><img src="" alt="" /></div><div class="right"><div class="title"><div class="title1"></div><div class="title2"></div></div><div class="con"></div><div class="btn"><a href="">现在预约</a></div></div></div>');
                    $('.subCon').eq(i).find('img').attr("src",data[i].img);
                    $('.subCon').eq(i).find('.title1').html(data[i].title);
                    $('.subCon').eq(i).find('.title2').html(data[i].subTitle);
                    $('.subCon').eq(i).find('.con').html(data[i].con);
                    // console.log(i);
                }  
                //绘制页面上的页数小按钮  
                for(var i=1;i<pageTotal+1;i++){  
                    $(".paging .add").append('<a href="###">'+i+'</a>'); 
                    // 给个按钮的整体宽度，让下按钮居中
                    var width=(i+2)*26+((i+1)*10);
                }
                // 把第一个按钮设置默认值
                $('.paging .add a').eq(0).addClass("selected");
                 // 把宽度设置成css样式
                $('.paging').css("width",width+'px');
            }  
        }  
    });  
}  
//翻页函数  
function gotoPage(pageNum){  
    $.ajax({  
        url:"json.json",  
        type:"POST",  
        dataType:"json",  
        timeout:1000,  
        error:function(){  
            alert("ajax error");  
        },  
        success:function(data){ 
            //更新当前的页数 
            currentPage=pageNum;
            // 计算开始的个数  
            startRow=pageSize*(pageNum-1);
            // 计算结束的个数  
            endRow=startRow+pageSize; 
            // 判断结束的个数 
            endRow=(rowTotal>endRow)?endRow:rowTotal;  
            // 对加载的每个页面进行渲染啊,先置空当前的
            $(".describe").empty();
            for(var i=startRow;i<endRow;i++){ 
                $(".describe").append('<div class="subCon"><div class="left"><img src="" alt="" /></div><div class="right"><div class="title"><div class="title1"></div><div class="title2"></div></div><div class="con"></div><div class="btn"><a href="">现在预约</a></div></div></div>');
                $('.subCon').eq(i%pageSize).find('img').attr("src",data[i].img);
                $('.subCon').eq(i%pageSize).find('.title1').html(data[i].title);
                $('.subCon').eq(i%pageSize).find('.title2').html(data[i].subTitle);
                $('.subCon').eq(i%pageSize).find('.con').html(data[i].con);  
            }      
        }  
    });  
}  