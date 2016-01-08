$(function(){

var isMobile = /iPad|iPod|iPhone|Android/.test(navigator.userAgent),
    $window = $(window),
    winW = $window.width(),
    winH = $window.height();

if(!isMobile){
    $('body').addClass('pc');
    winW = 600;
}

//loader
var $loader = $('#loader'),
    $loadcount = $('#loadcount'),
    $tipSwipe = $('#tipSwipe');
var picList;
var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete, this);
queue.loadManifest([
    {id: "t-cover", src:"img/t-cover.png"},
    {id: "t1a", src:"img/t1a.png"},
    {id: "t1b", src:"img/t1b.png"},
    {id: "t2", src:"img/t2.png"},
    {id: "p1-1", src:"img/p1-1.png"},
    {id: "p1-2", src:"img/p1-2.png"},
    {id: "p2-2", src:"img/p2-2.png"},
    {id: "p2-1", src:"img/p2-1.png"},
    {id: "bcover-logo", src:"img/bcover-logo.png"}
]);
function handleComplete() {
    $loader.hide();
    $tipSwipe.css("visibility","visible");
    picList = queue.getItems();
    var fullrow_pics = $('img').attr('src',function(){
                                var id = this.id;
                                var pic_needed = picList.filter(function(ele){
                                            return ele.item.id == id;
                                        });
                                return pic_needed[0].item.src;
                            });
}
queue.on("progress", function() {
    var loadtext = Math.round(queue.progress*100);
    $loadcount.text(loadtext+'%');
    $('.cover').addClass('slider-active');
});

//swipe
var $slideDiv = $('.slider'),
    $pager = $('#pager'),
    $cpage= $('#cpage'),
    $tpage= $('#tpage');

var slideLength = $slideDiv.length;

$slideDiv.swipe({
    //Generic swipe handler for all directions
    swipeLeft:function() {
      swipeLeftHandler($(this));
    },
    swipeRight:function() {
      swipeRightHandler($(this));
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold:10
});

function swipeLeftHandler (theSlider) {
    var $this = theSlider;
    var theIndex = $this.index();

    console.log(theIndex,slideLength);

    //pager
    $cpage.text(theIndex+1);
    $tpage.text(slideLength-2); //减去封面+封底

    //every page
    switch(theIndex){
        //cover
        case 0:
            $this.removeClass('slider-active').next().addClass('slider-active');
            $('#pager').css('visibility','visible');
            break;
        //倒数第2页
        case (slideLength-2):
            $this.removeClass('slider-active').next().addClass('slider-active');
            $pager.css('visibility','hidden');
            break;
        //倒数第1页
        case (slideLength-1):
            return false;
            break;
        default:
            $this.removeClass('slider-active').next().addClass('slider-active');
    }
}
function swipeRightHandler (theSlider) {
    var $this = theSlider;
    var theIndex = $this.index();

    console.log(theIndex,slideLength);

    //pager
    $cpage.text(theIndex-1);
    $tpage.text(slideLength-2);

    //every page
    //console.log(theIndex);
    switch(theIndex){
        //cover
        case 0:
            return false;
            break;
        //第2页
        case 1:
            $this.removeClass('slider-active').prev().addClass('slider-active');
            $('.pager').css('visibility','hidden');
            break;
        //倒数第1页
        case (slideLength-1):
            $this.removeClass('slider-active').prev().addClass('slider-active');
            $pager.css('visibility','visible');
            break;
        default:
            $this.removeClass('slider-active').prev().addClass('slider-active');
    }
}


})