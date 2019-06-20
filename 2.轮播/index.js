;$(function($,window,document,undefined){ 
    $.fn.hshSlide = function(option){
        var defaults = {
            data:[],//存放图片的地址
            singleWidth:100,//每个图片的宽度
            singleHeight:50//每个图片的高度
        }
        var options = $.extend({},defaults,option);
        var $el = this;
        var app = {
            $elWidth:0,//父容器的宽度 
            $length:0,//图片的数量
            init:function(){
                var self = this,
                    timer = null;
                self.length = options.data.length;
                self.$elWidth = $($el).parent().width(); 
                self.renderList();
                self.event();
                window.onresize = function(){
                    self.$elWidth = $($el).parent().width();
                    if(!timer){
                        timer = setTimeout(function(){
                            self.renderList();
                            timer = null;
                        },500);
                    }
                }
            },
            renderList:function(){
                var self = this;
                $el.html('').css({'left':0,'padding-left':0}).parent().find('.hsh-arrow').remove();
                for(var i = 0;i<self.length;i++){
                    $el.append('<img src="'+options.data[i]+'"/>');
                }
                if(this.$elWidth<options.singleWidth*self.length){
                    $el.parent().append('<span class="hsh-left-arrow hsh-arrow">&lt;</span><span class="hsh-right-arrow hsh-arrow">&gt;</span>');
                    $el.css('padding-left',$('.hsh-left-arrow').width());
                }
            },
            event:function(){
                var self = this,
                    timer = null,
                    startX = 0,
                    startY = 0,
                    endX = 0,
                    endY = 0,
                    left = 0;
                $(document).on('click','.hsh-left-arrow',function(event){
                    event.stopPropagation();
                    event.preventDefault();
                    if(!timer){
                        timer = setTimeout(function(){
                            $el.prepend($el.find('img:last').clone());
                            $el.css('left',-option.singleWidth+'px');
                            $el.animate({
                                'left':'0px'
                            },300,function(){
                                $el.find('img:last').remove();
                                timer = null;
                            })
                        }, 300);
                    }
                })
                $(document).on('click','.hsh-right-arrow',function(event){
                    event.stopPropagation();
                    event.preventDefault();
                    if(!timer){
                        timer = setTimeout(function(){
                            $el.append($el.find('img').eq(0).clone());                    
                            $el.animate({
                                'left':-options.singleWidth+'px'
                            },300,function(){
                                $el.css('left',0);
                                $el.find('img').eq(0).remove();
                                timer = null;
                            })
                        }, 300);
                    }
                    
                })
                $(document).on('touchstart','.hsh-container',function(event){
                    event.stopPropagation();
                    event.preventDefault();
                    startX = event.originalEvent.targetTouches[0].pageX;
                    startY = event.originalEvent.targetTouches[0].pageY;
                    left = $el.position().left;
                })
                $(document).on('touchmove','.hsh-container',function(event){
                    event.stopPropagation();
                    event.preventDefault();
                    var distance = 0;
                    endX = event.originalEvent.targetTouches[0].pageX;
                    endY = event.originalEvent.targetTouches[0].pageY;
                    distance = endX - startX;
                    $el.css('left',left+distance+'px');
                    // if(distance>0){//向右滑

                    // }else if(distance<0){//向左滑

                    // }
                })
                $(document).on('touchend','.hsh-container',function(event){
                    event.stopPropagation();
                    event.preventDefault();
                    console.log('touchend')
                    var left = $el.position().left;
                    if(left>0){
                        $el.animate({
                            'left':0
                        },300)
                    }else if(Math.abs(left)+self.$elWidth>$el.width()){
                        $el.animate({
                            'left':-($el.width()-self.$elWidth)+'px'
                        },300)
                    }
                    
                })
            }
        }
        app.init();
    }
}(jQuery,window,document));
