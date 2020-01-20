if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
  new WOW().init();
};
$('.header_lang').wSelect();
$('.header_lang').val('EN').change(); // should see in console
//$('.header_opt').css('color','#b3dbc0');
/* */
/*$(function(){
(function(){
function animate(item, x, y, index) {
 dynamics.animate(item, {
   translateX: x,
   translateY: y,
   opacity: 1
  }, {
    type: dynamics.spring,
    duration: 800,
    frequency: 120,
    delay: 100 + index * 30
  });
}

minigrid('.case_item_menu', '.item', 6, animate);

window.addEventListener('resize', function(){
  minigrid('.case_item_menu', '.item', 6, animate);
});
})();
})*/
$(".index_search_box .search_sele").mouseenter(function(){
  $(this).children(".search_sele_btn").addClass("hover")
})
$(".index_search_box .search_sele .search_sele_btn").mouseleave(function(){
  $(this).removeClass("hover")
})
$(".case_item_menu .item").mouseenter(function(){
  $(this).toggleClass("hover")
})
$(".case_item_menu .item").mouseleave(function(){
  $(this).toggleClass("hover")
})
/* */
$(".campsite_content_box .item").mouseenter(function(){
  $(this).toggleClass("hover")
})
$(".campsite_content_box .item").mouseleave(function(){
  $(this).toggleClass("hover")
})

/* */
$(".tutor_tip_navi .list dd .lab_box").click(function(){
  if($(this).hasClass("active") == true){
      $(this).removeClass("active");
      $(this).find("input[type=checkbox]").removeAttr("checked");
  }else{
    $(this).addClass("active");
    $(this).find("input[type=checkbox]").attr("checked","checked");

  }

})
/* */
var competi_bit_box = new Swiper('.competi_bit_box', {
      spaceBetween: 10,
      slidesPerView: 10,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.competi_tis_box', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.competi_bit_next',
        prevEl: '.competi_bit_prev',
      },
      thumbs: {
        swiper: competi_bit_box
      }
});
/* */
$(function(){
(function(){
  /*
function animate(item, x, y, index) {
 dynamics.animate(item, {
   translateX: x,
   translateY: y,
   opacity: 1
  }, {
    type: dynamics.spring,
    duration: 800,
    frequency: 120,
    delay: 100 + index * 30
  });
}
*/
minigrid('.campsite_detail_item', '.item', 5, animate);

window.addEventListener('resize', function(){
  minigrid('.campsite_detail_item', '.item', 5, animate);
});
})();
})
/* */
var fileInput = document.querySelector('#authen_file'),
    previewImg = document.querySelector('#authen_img');
  fileInput.addEventListener('change', function () {
      var file = this.files[0];
      var reader = new FileReader();
      // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
      reader.addEventListener("load", function () {
          previewImg.src = reader.result;
          $(".regis_content_box .content_box .authen_image .cont_box .authen_image_box").show();
      }, false);
      // 调用reader.readAsDataURL()方法，把图片转成base64
      reader.readAsDataURL(file);
  }, false);
$(".authen_image_box .shut").click(function(){
  $(this).parent(".authen_image_box").hide();
  $(this).siblings("img").attr("src","");
})
