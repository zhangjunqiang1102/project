// let treeR = (function ($) {
//     let $menu=$('.menu');
//     let bindE=function () {
//       $menu.on('click',function (e) {
//           let target=e.target,
//               tarTag=target.tagName,
//               $target=$(target);
//           if(tarTag==='EM'){
//               target=target.parentNode;
//               tarTag=target.tagName;
//               $target=$(target)
//           }
//           if(tarTag==='H3'){
//               let $next=$target.next();
//               if($next.length===0) return;
//               let $em=$target.children('em');
//               $em.toggleClass('minus');
//               $next.stop().slideToggle('fast',function () {
//                   if(!$em.hasClass('minus')){
//                       $next.find('ul').css('display','none');
//                       $next.find('em').removeClass('minus');
//                   }
//               })
//           }
//       })
//     };
//     return {
//         init: function () {
//           bindE()
//         }
//     }
// })(jQuery);
// treeR.init();

let treeR= (function ($) {
    let $menu=$('.menu');
    let    bindE=function () {
         $menu.on('click',function (e) {
           let target=e.target,
           tarTag=target.tagName,
           $target=$(target);
           if(tarTag==='EM'){
               target=target.parentNode;
               tarTag=target.tagName;
               $target=$(target)
           }
           if(tarTag==='H3'){
               let $next=$target.next();
               if ($next.length===0)  return;
                   let $em=$target.children('em');
                   $em.toggleClass('minus');
                   $next.stop().slideToggle('fast',function () {
                   if(!$em.hasClass('minus')){
                       $next.find('ul').css('display','none');
                       $next.find('em').removeClass('minus');
            }
          })
        }
     })
 };

    return {
        init: function () {
         bindE()
        }
    }
})(jQuery);
treeR.init();























































