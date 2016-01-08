var $window = $(window);

var winW = $window.width(),
    winH = $window.height();
var picList;

//loader
var $loader = $('#loader'),
    $loadcount = $('#loadcount');
var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete, this);
queue.loadManifest([
    {id: "cover", src:"img/1.jpg"},
    {id: "img1", src:"img/1.jpg"},
    {id: "img2", src:"img/2.jpg"},
    {id: "img3", src:"img/3.jpg"},
    {id: "img4", src:"img/4.jpg"},
    {id: "img5", src:"img/5.jpg"},
    {id: "img6", src:"img/6.jpg"},
    {id: "img7", src:"img/7.jpg"},
    {id: "img8", src:"img/8.jpg"},
    {id: "img9", src:"img/9.jpg"},
    {id: "img10", src:"img/10.jpg"},
    {id: "img11", src:"img/11.jpg"},
    {id: "img12", src:"img/12.jpg"},
    {id: "img13", src:"img/13.jpg"},
    {id: "img14", src:"img/14.jpg"},
    {id: "img15", src:"img/15.jpg"},
    {id: "img16", src:"img/16.jpg"},
    {id: "img17", src:"img/17.jpg"},
    {id: "img18", src:"img/18.jpg"},
    {id: "img19", src:"img/19.jpg"},
    {id: "img20", src:"img/20.jpg"}
]);
function handleComplete() {
    picList = queue.getItems();
    var fullrow_pics = $('.fullrow img').attr('src',function(){
                                var id = this.id;
                                var pic_needed = picList.filter(function(ele){
                                            return ele.item.id == id;
                                        });
                                return pic_needed[0].item.src;
                            });
    var cover_pics = $('.card-cover').css({
        'background-image': function(){
            var $this = $(this);
            var imgid = $this.data('imgid');
            var pic_needed = picList.filter(function(ele){
                        return ele.item.id == imgid;
                    });
            return 'url('+pic_needed[0].item.src+')';
        },
        '-webkit-background-size':'cover',
        'background-size':'cover'
    });
    $loader.hide();
    $card.eq(0).addClass('active-card');
}
queue.on("progress", function() {
    var loadtext = Math.round(queue.progress*100);
    $loadcount.text(loadtext+'%');
});

var $card = $('.card');
$card.eq(0).css('z-index','10').next().css({
    '-webkit-transform': 'translate3d(0,'+winH+'px,0)',
    'transform': 'translate3d(0,'+winH+'px,0)'
});
$card.each(function(i){
    var $this = $(this);
    $this.swipe({
        //Generic swipe handler for all directions
        swipeUp:function() {
            console.log('up',i);
            if(i<$card.length){
                $this.removeClass('active-card').css({
                    'z-index':2
                }).next().addClass('active-card').css({
                    '-webkit-transform': 'translate3d(0, 0, 0)',
                    'transform': 'translate3d(0, 0, 0)',
                    '-webkit-transition': '-webkit-transform .5s ease',
                    'transition': 'transform .5s ease',
                    'z-index':10
                }).next().removeClass('active-card').css({
                    'transform': 'translate3d(0,'+winH+'px,0)',
                    '-webkit-transform': 'translate3d(0,'+winH+'px,0)'
                });
            }
        },
        swipeDown:function() {
            console.log('down',i);
            if(i>0){
                $this.removeClass('active-card').css({
                    'transform': 'translate3d(0,'+winH+'px,0)',
                    '-webkit-transform': 'translate3d(0,'+winH+'px,0)',
                    'z-index':2
                }).prev().addClass('active-card').css({
                    'transform': 'translate3d(0,0,0)',
                    '-webkit-transform': 'translate3d(0,0,0)',
                    'z-index':10
                })
            }
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:30
    });
})

$(".scrollbox").perfectScrollbar();

$('.btn-more').on('click',function(e){
    e.preventDefault();
    var $this = $(this);
    $this.parents('.card-cover').next().show();
})
$('.btn-close').on('click',function(e){
    e.preventDefault();
    var $this = $(this);
    $this.parent().hide();
})
