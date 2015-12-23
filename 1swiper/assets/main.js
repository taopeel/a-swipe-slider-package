$(function(){

var isMobile = /iPad|iPod|iPhone|Android/.test(navigator.userAgent),
    $window = $(window),
    winW = $window.width(),
    winH = $window.height();

if(!isMobile){
    $('body').addClass('pc');
    winW = 600;
}

//slider
var mainSwiper = new Swiper ('#mainSlider', {
        direction: 'vertical',
        nextButton:'.nextp',
        onSlideChangeStart:function () {
            if(mainSwiper.activeIndex == 1){
                $('#toSubmitPage').hide();
            }else{
                $('#toSubmitPage').show();
            }
        },
        noSwipingClass:'iframewrap',
        lazyLoading:true
    })

var galleryTop = new Swiper('.gallery-top', {
        //loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        //loop: true,
        centeredSlides: true,
        //spaceBetween: 10,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;

})

/* background audio */
var bgAudio = document.getElementById('bgAudio');

$('.audioctrl').on('click','a',function(e){
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this);
    $this.toggleClass('active');
    $this.siblings().toggleClass('active');
    var id = $this.attr('id');
    if(id=='mute-btn'){
        bgAudio.play();
    }else if(id=='play-btn'){
        bgAudio.pause();
    }
});

//background audio autoplay
bgAudio.play();
if (bgAudio.paused) {
    $('#mute-btn').addClass('active');
    $('#play-btn').removeClass('active');
}else{
    $('#mute-btn').removeClass('active');
    $('#play-btn').addClass('active');
};