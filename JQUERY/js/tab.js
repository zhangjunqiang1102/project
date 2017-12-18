
// ~function () {
//     function plug(selector) {
//         var $tabBox=$('selector'),
//             $tabList=$tabBox.find('.tab>li'),
//             $conList=$tabBox.children('.con');
//
//
//     }
//
//
//
//
// }();
//








var tabRender=(function () {
   var $tabBox=$('#tabBox'),
    $tabList=$tabBox.find('.tab>li'),
       $conList=$tabBox.children('.con');
    var _default={
        initIndex:0,
        eventType:"click"
    };
    function bind() {
        $tabList.on(_default.eventType,function () {
            var $this=$(this),
                _index=$this.index();
            $this.addClass('select')
                .sibling().removeClass('select');

            $conList.eq(_index).addClass('select')
                .siblings().removeClass('select');


        });
    }

    function initD() {
        $tabList.removeClass('select');
        $conList.removeClass('select');

        $tabList.eq(_default.initIndex).addClass('select');
        $conList.eq(_default.initIndex).addClass('select')
    }

    return {
        init: function (options) {
          if(typeof options!=='undefined'){
             $.each(options,function (key,value) {
                  if(options.hasOwnProperty(key)){
                      _default[key]=value
                  }
              });
          }
          initD();
            bind()
        }
    }
})();
tabRender.init({
    initIndex: 1,
    eventType: 'mouseover'
});
