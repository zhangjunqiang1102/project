// let marginR = (function () {
//     let $smallBox=$('.smallBox'),
//     $big=$('.bigBox'),
//     $mark=$('.mark'),
//     $bigImg=$big.children('img');
//     let computedM = function (e) {
//         let smallOffset=$smallBox.offset();
//         let curL = e.clientX - smallOffset.left - $mark.outerWidth() / 2,
//             curT = e.clientY - smallOffset.top  - $mark.outerHeight()/ 2;
//         let maxL=$smallBox.innerWidth()-$mark.outerWidth(),
//             maxT=$smallBox.innerHeight()-$mark.outerHeight();
//         curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
//         curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
//         $mark.css({
//                   left:curL,
//                    top:curT
//         });
//         $bigImg.css({
//                  left:-curL*3,
//                  top:-curT*3
//         });
//     };
//  function bindE (){
//         $smallBox.on('mouseenter',function (e) {
//      $mark.css('display','block');
//      $big.css('display','block');
//      computedM(e);
//         }).on('mousemove',computedM).on('mouseleave',function (e) {
//             $mark.css('display','none');
//             $big.css('display','none');
//         });
//      }
//     return {
//         init: function (e) {
//             bindE();
//         }
//     }
// })(jQuery);
// marginR.init();

let marginR = (function ($) {
    let $smallBox=$('.smallBox'),
        $big=$('.bigBox'),
        $mark=$('.mark'),
        $bigI=$big.children('img');
   let compM=function (e) {
    let smallBoxOffset=$smallBox.offset(),
        curL=e.clientX-smallBoxOffset.left-$mark.outerWidth()/2,
        curT=e.clientY-smallBoxOffset.top-$mark.outerHeight()/2;
    let maxL=$smallBox.innerWidth()-$mark.outerWidth(),
       maxT=$smallBox.innerHeight()-$mark.outerHeight();
    curL=curL<0?0:(curL>maxL?maxL:curL);
    curT=curT<0?0:(curT>maxT?maxT:curT);

    $mark.css({
        left:curL,
        top:curT
    });
    $bigI.css({
        left:-curL*3,
        top:-curT*3
    });
   };
   function bindE() {
       $smallBox.on('mouseenter',function (e) {
           $mark.css('display','block');
           $big.css('display','block');
           compM(e)
       }).on('mousemove',compM).on('mouseleave',function (e) {
           $mark.css('display','none');
           $big.css('display','none');
       });
   }
    return {
        init: function () {
         bindE();
        }
    }
})(jQuery);
marginR.init();










































