let magnifierRender=(function () {
    let smallBox=document.getElementById('smallBox'),
    bigBox=document.getElementById('bigBox'),
    mark=document.getElementById('mark'),
    bigImg=bigBox.getElementsByTagName('img')[0],
        markW=mark.offsetWidth,
        markH=mark.offsetHeight,
        smallW=smallBox.offsetWidth,
        smallH=smallBox.offsetHeight,
         maxL=smallW-markW,
         maxT=smallH-markH;
      //计算mark盒子的位置
let computedMark=function (e) {
      e=e||window.event;
      let curL=e.clientX-smallBox.offsetLeft-markW/2,
          curT=e.clientY-smallBox.offsetTop-markH/2;
      //边界判断
       curL=curL<0?0:(curL>maxL?maxL:curL);
       curT=curT<0?0:(curT>maxT?maxT:curT);
       //
       mark.style.left=curL+'px';
       mark.style.top=curT+'px';
    //->MARK跟随鼠标移动,我们也需要让BIG-IMG也跟着移动
    //1、MARK向右移动,BIG-IMG整体向左移动(移动方向是相反的)
    //2、MARK移动多少,BIG-IMG在MARK移动的基础上乘以3
   bigImg.style.left=-curL*3+'px';
   bigImg.style.top=-curT*3+'px';

};
//给small-box的相关事件绑定方法
let bindEvent=function () {
    smallBox.onmouseenter=function (e) {
          //计算mark的当前位置
          mark.style.display='block';
          bigBox.style.display='block';
            computedMark(e)
    };
    smallBox.onmousemove=function (e) {
    //  随时记录mark的位置，让mark和鼠标走；
        computedMark(e)
    };
    smallBox.onmouseleave=function (e) {
        mark.style.display='none';
        bigBox.style.display='none';
    }
};
    return{
        init:function (e) {
            mark.style.display='none';
            bindEvent()
        }
    }
})();
magnifierRender.init();