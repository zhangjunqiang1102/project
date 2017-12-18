// let loading = (function ($) {
//     let $loadingB=$('.loadingBox'),
//         $run=$loadingB.find('.run');
//     let imgList = ["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style1.jpg", "img/zf_style2.jpg", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher1.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher4.png", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"];
//
//     let total=imgList.length,
//         cur=0;
//     let computed=function () {
//       imgList.forEach(function (item) {
//           let tImg=new Image;
//           tImg.src=item;
//           tImg.onload=function () {
//               cur++;
//               tImg=null;
//               runF();
//           }
//       })
//
//     };
//     let runF=function () {
//       $run.css('width',cur/total*100+'%') ;
//       if(cur>=total){
//   let delayT=setTimeout(()=>{
//       $loadingB.remove();
//       phone.init();
//       clearInterval(delayT);
//   },1500)
//       }
//     };
//     return {
//         init: function () {
// $loadingB.css('display','block');
// computed();
//         }
//     }
// })(Zepto);
//
//
// let phone = (function ($) {
// let $phoneB=$('.phoneBox'),
//     $time=$phoneB.find('.time'),
//     $listen=$phoneB.find('.listen'),
//     $listenT=$listen.find('.touch'),
//     $detail=$phoneB.find('.detail'),
//     $detailTouch=$detail.find('.touch');
//
// let audioBell=$('#audioBell')[0],
//     audioSay=$('#audioSay')[0];
//
//     let $phonePlan=$.Callbacks();
//
//     $phonePlan.add(function () {
//         $listen.remove();
//         $detail.css('transform', 'translateY(0)');
//
//     });
//
//     $phonePlan.add(function () {
//         audioBell.pause();
//         audioSay.play();
//         $time.css('display','block');
//
//
//        let sayT=setInterval(()=>{
//            let dur=audioSay.duration,
//                cur=audioSay.currentTime;
//            let min=Math.floor(cur/60),
//                sec=Math.floor(cur-min*60);
//            min<10?min='0'+min:null;
//            sec<10?sec='0'+sec:null;
//            $time.html(`${min}:${sec}`);
//
//            if(cur>=dur){
//                clearInterval(sayT);
//              enterN();
//            }
//        },1000)
// });
//
//     $phonePlan.add(()=>$detailTouch.tap(enterN));
//     let enterN=function () {
//         audioSay.pause();
//         $phoneB.remove();
//         message.init();
//     };
//     return {
//         init: function () {
// $phoneB.css('display','block');
// audioBell.play();
// $listenT.tap($phonePlan.fire)
//         }
//     }
// })(Zepto);
//
//
// let message = (function ($) {
//    let $messageB=$('.messageBox'),
//        $talkB=$messageB.find('.talkBox'),
//        $talkL=$talkB.find('li'),
//        $keyBord=$messageB.find('.keyBord'),
//        $keyBordText=$keyBord.find('.span'),
//            $submit=$keyBord.find('.submit'),
//        musicA=$('#musicAudio')[0];
//
//        let $plan=$.Callbacks();
//
//        let step=-1,
//            autoT=null,
//            inter=1500,
//            offset=0;
//
//        $plan.add(()=>{
//            autoT=setInterval(()=>{
//                step++;
//                let $cur=$talkL.eq(step);
//                $cur.css({
//                   opacity:1,
//                   transform:'translateY(0)'
//                });
//                if(step===2){
//                    $cur.one('transitionend',()=>{
//                        $keyBord.css('transform','translateY(0)')
//              .one('transitionend', textM)
//                    });
//                    clearInterval(autoT);
//                    return
//                }
//                if(step>=4){
//                    offset+=-$cur[0].offsetHeight;
//                    $talkB.css(`transform`,`translateY(${offset}px)`)
//                }
//                if(step>=$talkL.length-1){
//                    clearInterval(autoT);
//
//                    let delay=setTimeout(()=>{
//                        musicA.pause();
//                        $messageB.remove();
//                        clearTimeout(delay)
//                    },inter)
//                }
//            },inter)
//        });
//
//        let textM=function () {
//          let text=$keyBordText.html();
//            $keyBordText.css('display','block').html('');
//          let timer=null,
//              n=-1;
//          timer=setInterval(()=>{
//              if(n>=text.length){
//                  clearInterval(timer);
//                  $keyBordText.html(text);
//                  $submit.css('display','block').tap(()=>{
//                      $keyBordText.css('display','none');
//
//                      $keyBord.css('transform','translateY(3.7rem)');
//                      $plan.fire();
//                  });
//                  return;
//              }
//              n++;
//              $keyBordText[0].innerHTML+=text.charAt(n);
//          },100)
//        };
//     return {
//         init: function () {
//            $messageB.css('display','block');
//            musicA.play();
//            $plan.fire();
//         }
//     }
// })(Zepto);
//
// $(document).on('touchstart touchmove touchend',function (e) {
//     e.preventDefault();
// });
// loading.init();
let loading = (function ($) {

    let $loadingBox=$('.loadingBox'),
        $run=$loadingBox.find('.run');

    let imgList=["img/icon.png", "img/zf_concatAddress.png", "img/zf_concatInfo.png", "img/zf_concatPhone.png", "img/zf_course.png", "img/zf_course1.png", "img/zf_course2.png", "img/zf_course3.png", "img/zf_course4.png", "img/zf_course5.png", "img/zf_course6.png", "img/zf_cube1.png", "img/zf_cube2.png", "img/zf_cube3.png", "img/zf_cube4.png", "img/zf_cube5.png", "img/zf_cube6.png", "img/zf_cubeBg.jpg", "img/zf_cubeTip.png", "img/zf_emploment.png", "img/zf_messageArrow1.png", "img/zf_messageArrow2.png", "img/zf_messageChat.png", "img/zf_messageKeyboard.png", "img/zf_messageLogo.png", "img/zf_messageStudent.png", "img/zf_outline.png", "img/zf_phoneBg.jpg", "img/zf_phoneDetail.png", "img/zf_phoneListen.png", "img/zf_phoneLogo.png", "img/zf_return.png", "img/zf_style3.jpg", "img/zf_styleTip1.png", "img/zf_styleTip2.png", "img/zf_teacher2.png", "img/zf_teacher3.jpg", "img/zf_teacher5.png", "img/zf_teacher6.png", "img/zf_teacherTip.png"];

    let total=imgList.length,
        cur=0;

    let computed=function () {
       imgList.forEach(function (item) {
           let tempImg=new Image;
           tempImg.src=item;
           tempImg.onload=function () {
               tempImg=null;
               cur++;
               runF()
           }
       })
    };
    let runF=function () {
      $run.css('width',cur/total*100+'%');
      if(cur>=total){
          let delayT=setTimeout(()=>{
              $loadingBox.remove();
              phone.init();
          },1500)
      }
    };
    return {
        init: function () {
        $loadingBox.css('display','block');
        computed();
        }
    }
})(Zepto);

let phone = (function ($) {
      let $phoneBox=$('.phoneBox'),
          $time=$phoneBox.find('.time'),
          $listen=$phoneBox.find('.listen'),
          $listenTouch=$listen.find('.touch'),
          $detail=$phoneBox.find('.detail'),
          $detailTouch=$detail.find('.touch');

      let audioBell=$('#audioBell')[0],
          audioSay=$('#audioSay')[0];

      let $phonePlan=$.Callbacks();

      $phonePlan.add(function () {
          $listen.remove();
          $detail.css('transform','translateY(0)');
      });

      $phonePlan.add(function () {
          audioBell.pause();
          audioSay.play();
          $time.css('display','block');

          let sayT=setInterval(()=>{
              let duration=audioSay.duration,
                  current=audioSay.currentTime;
              let min=Math.floor(current/60),
                  sec=Math.floor(current-min*60);

              min<10?min="0"+min:null;
              sec<10?sec='0'+sec:null;

              $time.html(`${min}:${sec}`);

              if(current>=duration){
                  clearInterval(sayT);
                  enterN();
              }
          },1000)
      });
       $phonePlan.add(()=>$detailTouch.tap(enterN));

          let enterN=function () {
         audioSay.pause();
         $phoneBox.remove();
         messageR.init()
    };
    return {
        init: function () {
         $phoneBox.css('display','block');
         audioBell.play();
         $listenTouch.tap($phonePlan.fire);
        }
    }
})(Zepto);


let messageR = (function ($) {
    let $messageBox=$('.messageBox'),
        $talkBox=$messageBox.find('.talkBox'),
        $talkList=$talkBox.find('li'),
        $keyBord=$messageBox.find('.keyBord'),
        $keyBordText=$keyBord.find('span'),
        $submit=$keyBord.find('.submit'),
        musicAudio=$('#musicAudio')[0];

        let $plan=$.Callbacks();

        let step=-1,
            autoT=null,
            offset=0;

        $plan.add(()=>{
            autoT=setInterval(()=>{
                step++;
                let $cur=$talkList.eq(step);
                $cur.css({
                    opacity:1,
                    transform:'translateY(0)'
                });
                if(step===2){
                    $cur.one('transitionend',()=>{
                        $keyBord.css('transform','translateY(0)').one('transitionend',textM);
                    });
                    clearInterval(autoT);
                    return
                }
                if(step>=4){
                    offset+=-$cur[0].offsetHeight;
                    $talkBox.css(`transform`,`translateY(${offset}px)`);
                }
                if(step>=$talkList.length-1){
                    clearInterval(autoT);
                    let delay=setTimeout(()=>{
                        musicAudio.pause();
                        $messageBox.remove();
                        cube.init();
                        clearTimeout(delay)
                    },1500)
                }
            },1500)
        });

        let textM=function () {
          let text=$keyBordText.html();
          $keyBordText.css('display','block').html('');
          let timer=null,
              n=-1;
          timer=setInterval(()=>{
              if(n>=text.length){
                  clearInterval(timer);
                  $keyBordText.html(text);
                  $submit.css('display','block').tap(()=>{
                      $keyBordText.css('display','none');
                      $keyBord.css('transform','translateY(3.7rem)');
                      $plan.fire();
                  });
                  return
              }
              n++;
              $keyBordText[0].innerHTML+=text.charAt(n)
          },100)
        };
    return {
        init: function () {
                 $messageBox.css('display','block');
                 musicAudio.play();
                 $plan.fire();
        }
    }
})(Zepto);
$(document).on('touchstart touchmove', function (e) {
    e.preventDefault();
});

let cube = (function ($) {
    let $cubeBox=$('.cubeBox'),
        $box=$cubeBox.find('.box');




    let touch=function (e) {
        let point=e.changedTouches[0];
        $(this).attr({
            strX:point.clientX,
            strY:point.clientY,
            isMove:false,
            changeX:0,
            changeY:0
        });
    };

    let touching=function (e) {
    let point=e.changedTouches[0],
    $this=$(this);
    let changeX=point.clientX-parseFloat($this.attr('strX')),
        changeY=point.clientY-parseFloat($this.attr('strY'));
    if(Math.abs(changeX)>10||Math.abs(changeY)>10){
        $this.attr({
            isMove:true,
            changeX:changeX,
            changeY:changeY
        });
    }
    };

    let touchEnd=function (e) {
      let point=e.changedTouches[0],
          $this=$(this);
      let isMove=$this.attr('isMove'),
          changeX=parseFloat($this.attr('changeX')),
          changeY=parseFloat($this.attr('changeY')),
          rotateX=parseFloat($this.attr('rotateX')),
          rotateY=parseFloat($this.attr('rotateY'));

      if(isMove==='false')  return;

        rotateX=rotateX-changeY/3;
        rotateY=rotateY+changeX/3;

         $this.css(`transform`,`scale(.6)rotateX (${rotateX}deg)rotateY(${rotateY}deg)`).attr({
    rotateX:rotateX,
    rotateY:rotateY
    })
   };

    return {
        init: function () {
        $cubeBox.css('display','block');
        $box.attr({
            rotateX:-30,
            rotateY:45
        }).on({
            touchstart:touch,
            touchmove:touching,
            touchend:touchEnd
        });
        $box.find('li').tap(function () {
            $cubeBox.css('display','none');
            let index=$(this).index();
            detail.init(index);
         });
        }
    }
})(Zepto);


let detail = (function ($) {
    let $detailBox=$('.detailBox'),
        $cubeBox=$('.cubeBox'),
        $returnL=$detailBox.find('.returnLink'),
        swipeE=null;
    let $mark=$('#makisuBox');

    let change=function (example) {

        let {slides:slideAry,activeI}=example;
        if(activeI===0){
            $mark.makisu({
                selector:'dd',
                overlap:0.6,
                speed:0.8
            });
            $mark.makisu('open');
        }else {
            $mark.makisu({
                selector:'dd',
                overlap:0,
                speed:0
            });
            $mark.makisu('close')
        }

        [].forEach.call(slideAry,(item,index)=>{
            if(index===activeI){
                item.id='page'+(activeI+1);
                return
            }
            item.id=null;
        })
    };
    return {
        init: function (index=0) {
            $detailBox.css('display','block');

            if(!swipeE){
                $returnL.tap(()=>{
                    $detailBox.css('display','none');
                    $cubeBox.css('display','block');
                });
                swipeE=new Swiper('.swiper-container',{
                    effect:'coverflow',
                    onInit:change,
                    onTransitionEnd:change
                });
            }
            index=index>5?5:index;
            swipeE.slideTo(index,0)
        }
    }
})(Zepto);
loading.init();
