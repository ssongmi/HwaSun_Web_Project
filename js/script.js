$(function(){
    var $images = $("#images");
    var $btn_up = $(".btn_up");
    var $tour = $("#tour");
    var $tour_ul = $("#tour_box").children("ul");
    var $tab_tit = $("#tab_tit");
    var $tab_contents = $("#tab_contents");
    var $menu_back = $("#menu_back");
    var count = 0;
    var count_2 = 1;
    var $tit_li = $("#title_box > ul > li");
    var $content_ul = $("#content_06 > ul");
    var content_ID;
    var $food_box = $("#food_box");
    var slide_ID = 0;
    var slide_num = 0;
    var i = 0; // slide에서 사용

    //menu slidedown기능
    $(".gnb_box").hover(function(){
        $menu_back.stop().slideDown();
    },function(){
        $menu_back.stop().slideUp();
    });

    //slide 기능
    function sliding(){
        $images.animate({"margin-top":"-440px"},function(){
            $(this).removeAttr("style").children(":first").appendTo($images);
        });
        count =(count + 1) % 4;
        $(".tit_active").removeClass("tit_active");
        $tit_li.eq(count).addClass("tit_active");
    }
    slide_ID = setInterval(sliding,3000);

    // slide_button 기능
    $tit_li.on("click",function(){
        clearInterval(slide_ID);
        $(".tit_active").removeClass("tit_active");
        $(this).addClass("tit_active");

        slide_num = parseInt($(this).attr("data-index")) - parseInt($images.children(":first").attr("data-index"));
        // if(slide_num < 0) slide_num += 4;
        if(slide_num > 0){
            for(i=0; i<slide_num; i++){
                $images.animate({"margin-top":"-440px"},function(){
                    $(this).removeAttr("style").children(":first").appendTo($images);
                });
            }
        }
        else{
            count_2 = 1;
            $images.css("margin-top", "-440px").prepend($images.children(":last"))
                .animate({"margin-top":"0"},inverse);
            // for(i=0; i<-1*slide_num; i++){
            //     $images.animate({"margin-top":"-440px"},function(){
            //          $(this).removeAttr("style").children(":first").appendTo($images);
            //      });
            // }


        }

        count = parseInt($(this).attr("data-index"));
        slide_ID = setInterval(sliding,3000);
    });
    function inverse(){
        if(count_2 == -1*slide_num){return;}
        else{
            $images.css("margin-top", "-440px").prepend($images.children(":last"))
                .animate({"margin-top":"0"},inverse);
            count_2++;
        }


    }

    //tab기능
    $tab_tit.children("ul").children("li").on("click",function(){
        if(!($(this).is(".active"))){
            $(".active").removeClass("active");
            $tab_contents.children("ul").css("display","none");
            $tab_contents.children("."+$(this).attr("class")).css("display","block");
            $(this).addClass("active");
        }
    });

    // food next,prev 버튼
    $("#food_prev").on("click",function(){
        $food_box.children(":last").css("display","none").prependTo($food_box).fadeIn();
    });
    $("#food_next").on("click",function(){
        $food_box.children(":first").fadeOut(function(){
            $(this).appendTo($food_box).fadeIn();
        });


    });

    //tour next,prev버튼
    $tour.children("#tour_prev").on("click",function(){
        $tour_ul.animate({"margin-left":"-200px"},function(){
            $(this).removeAttr("style").children(":first").appendTo($tour_ul);
        });
    });
    $tour.children("#tour_next").on("click",function(){
        $tour_ul.prepend($tour_ul.children(":last")).css("margin-left","-200px")
            .animate({"margin-left":0});
    });

    //banner모음 버튼 기능
    function banner_set(){
        content_ID = setInterval(function(){
            $content_ul.animate({"margin-left":"-191.98px"},function(){
                $(this).removeAttr("style").children(":first").appendTo($content_ul);
            });
        },2000);
    }
    banner_set();
    $("#a06_prev").on("click",function(){
        clearInterval(content_ID);
        $content_ul.css("margin-left","-191.98px").children(":last").prependTo($content_ul);
        $content_ul.animate({"margin-left":"0"},function(){});
        banner_set();
        });
    $("#a06_next").on("click",function(){
        clearInterval(content_ID);
        $content_ul.animate({"margin-left":"-191.98px"},function(){
            $(this).removeAttr("style").children(":first").appendTo($content_ul);
        });
        banner_set();
    });
    $("#a06_stop").on("click",function(){
        if($(this).is(".btn_active")){
            $(this).removeClass("btn_active");
            banner_set();
        }
        else{
            clearInterval(content_ID);
            $(this).addClass("btn_active");
        }

    });


    // 유관기관 바로가기
    $btn_up.on("click",function(){
        if($(this).siblings("ul").is(".up")){
            $(".up").removeClass("up");
        }
        else{
            $(".up").removeClass("up");
            $(this).siblings("ul").addClass("up");
        }
    });
});
