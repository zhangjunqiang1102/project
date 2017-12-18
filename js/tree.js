let treeRender = (function () {
    let $menu=$('.menu');
    let bindEvent=function () {
        $menu.on('click',function (e) {
                  tarTag=target.tagName;
                let target=e.target,
                    tarTag=target.tagName,
                    $target = $(target);
                if(tarTag==='EM'){
                    target=target.parentNode;
                  $target=$(target);
            }
            if(tarTag==='H3'){
                let $next=$target.next();
                if($next.length===0) return; //当前h3所在的没有东西，没有下一级ul的，我们不操作；
                let $em=$target.children('em');
                $em.toggleClass('minus');
                $next.stop().slideToggle('fast', function () {
                    if (!$em.hasClass('minus')) {  //=>已经把当前结构收起了:后代都要收起
                        $next.find('ul').css('display', 'none');
                        $next.find('em').removeClass('minus');
                    }
                });
            }
        });
    };
    return {
        init: function () {
            bindEvent();
        }
    }
})();
treeRender.init();