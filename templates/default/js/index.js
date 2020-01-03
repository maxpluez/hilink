
function goTop(){
	$('html,body').animate({'scrollTop':0},600); //滚回顶部的时间，越小滚的速度越快~
}
$(window).scroll(function () {
	if($(".header").hasClass("header_fixed-login")){
     	return false;
	}else{
        if ($(window).scrollTop() >= 60) {
            $('.header').addClass('header_fixed');
			$(".head-tel").removeClass("hide")
        }
        else {
            $('.header').removeClass('header_fixed');
            $(".head-tel").addClass("hide")
        }
	}
});
$(document).ready(function(){
    $("#phone_hover").hover(function () {
        $(".hover_phone").stop().animate({left: "-260px"});
    },function(){
        $(".hover_phone").stop().animate({left:"260px"});
    });
    $("#weibo_hover").hover(function () {
        $(".weibo_dis").stop().animate({left: "-110px"});
    },function(){
        $(".weibo_dis").stop().animate({left:"110px"});
    });
    $("#wechat").hover(function () {
        $(".wechat_dis").stop().animate({left: "-110px"});
    },function(){
        $(".wechat_dis").stop().animate({left:"110px"});
    });
    
    $("#f-weixin").hover(function () {
    	console.log("wuyw")
        $(".f-wechat").removeClass("hide").stop().animate({bottom: "-20px"},1000)
    },function(){
        $(".f-wechat").addClass("hide");
    });
    $("#f-weibo").hover(function () {
        console.log("wuyw")
        $(".f-weibo").removeClass("hide").stop().animate({bottom: "-20px"},1000)
    },function(){
        $(".f-weibo").addClass("hide");
    });
	var w= $(window).width();
	var h = $(window).height();
	
	$(".banner_dl").css("width",w);
	$(".banner_dl").css("height",h);
	$(".zhuce").css("height",h);
	
	
	$(".peixunH4").click(function(e){
	  $(".canzhan_forma").css({"display":"block"})   
	})
	
	$(".PeixunA").click(function(e){
	  $(".canzhan_forma").css({"display":"block"})   
	})
	
	$(".btnx1").click(function(e){
		    $(".canzhan_forma").css({"display":"block"})   
	})
	
	$(".canzhan_close").click(function(e){
		    $(".canzhan_forma").css({"display":"none"}) 
	})
 		
	$(".btnx2").click(function(e){
		    $(".banzhan_forma").css({"display":"block"})   
	})
	
	$(".banzhan_close").click(function(e){
		    $(".banzhan_forma").css({"display":"none"}) 
	})
	

	$(".city").click(function(e){
		    $("._citys").css({"display":"block"})  
			  
	})
	
	$(".zlxydd").click(function(e){
		    $(".zlxy").css({"display":"block"})   
	})
	
	$(".zlxyclose").click(function(e){
		    $(".zlxy").css({"display":"none"}) 
	})
 		
	$(".ss").click(function(e){
		    $(".sskuang").css({"left":"0","opacity":"1"})  
	})
	
	$(".close").click(function(e){
		    $(".sskuang").css({"left":"-100%","opacity":"0"})  
	})
	
	
	$(".gmdd").click(function(e){
		    $(".gmtc").css({"display":"block"})  
	})

	
  $(".gmtc_gb").click(function(e){
		    $(".gmtc").css({"display":"none"})  
	})

	
	if(w>1440){
    $(".swiper-banner").css("height",h-120);
	
	}
	
	if(w>1280&&w<=1440){
		 
  	var h2 = $(window).height();
    $(".swiper-banner").css("height",h2-70);

	}
	
	if(w<=1280){
		 
  	var h3 = $(window).height();
    $(".swiper-banner").css("height",h3);

	}
	

	
	$(window).load(function() {
		
	
		
		var h01 = $(".left-main").height()-20;
    $(".right-store").css("height",h01);
	
	
	var h1 = $(".list_image img").height();
		$(".swiper-tuijian").css("height",h1)
		
		var h2 = $(".buy_img").height();
	$(".buy_tp").css("height",h2);  


	});

  
  
  var qcloud={};
	$('[_t_nav]').hover(function(){
		var _nav = $(this).attr('_t_nav');
		clearTimeout( qcloud[ _nav + '_timer' ] );
		qcloud[ _nav + '_timer' ] = setTimeout(function(){
		$('[_t_nav]').each(function(){
		$(this)[ _nav == $(this).attr('_t_nav') ? 'addClass':'removeClass' ]('nav-up-selected');
		});
		$('#'+_nav).stop(true,true).slideDown(200);
		}, 500);
	},function(){
		var _nav = $(this).attr('_t_nav');
		
		
		clearTimeout( qcloud[ _nav + '_timer' ] );
		qcloud[ _nav + '_timer' ] = setTimeout(function(){
		$('[_t_nav]').removeClass('nav-up-selected');
		$('#'+_nav).stop(true,true).slideUp(200);
		}, 500);
	});
   

	var height1 = $(window).height()-100;
$(".dw_top").delay(100).animate({"width":"100%"},1000,function(){
	$(".dw_right").animate({"height":height1},1000,function(){
		$(".dw_bottom").animate({"width":"100%"},1000,function(){
			$(".dw_left").animate({"height":height1},1000)
			
			
			})
		})
	})
	

	
	
});

