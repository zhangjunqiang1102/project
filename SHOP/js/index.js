"use strict";
//一.获取数据,然后在动态页面中显示
~function () {
    var xhr=new XMLHttpRequest();
    xhr.open("get","json/product.json",false);
    xhr.onreadystatechange=function () {
        if(xhr.readyState===4 &&xhr.status===200){
            var result=xhr.responseText;//-JSON格式的字符串
            window.result=utils.toJSON(result);
        }
    };
    xhr.send(null);
// -数据绑定 :ES6中的模本字符串(原理：传统的字符串拼接）
    var listBox=document.getElementById("list");
    var str=``;
    for (var i=0;i<result.length;i++){
        var item=result[i];
        str+=` <li data-price="${item.price}"data-hot="${item.hot}"data-time="${item.time}"><a href="javascript:;">
            <img src="${item.img}" alt="">
            <p>${item.title}</p>
            <span>${item.price}</span>
        </a></li>`;
    }
    listBox.innerHTML=str;
}();
//二 ，实现按照价格升序排序
~function () {
    var listBox = document.getElementById("list"),
        oList = listBox.getElementsByTagName("li"),
        headerBox = document.getElementById("header"),
        linkList = headerBox.getElementsByTagName("a");
    for (var i = 0; i < linkList.length; i++) {
        linkList[i].myMethod = -1;
        linkList[i].myIndex=i;
        linkList[i].onclick = function () {
            this.myMethod *= -1;
            changePosition.call(this);
        };
    }
    function changePosition() {
        var _this = this;
//点击当前A，我们需要把其它的A的myMethod回归初始值
        for (var k = 0; k < linkList.length; k++) {
            if(k!==_this.myIndex){
                //->不是当前点击的A
                linkList[k].myMethod=-1;
            }
        }
        oList = utils.toArray(oList);
        oList.sort(function (a, b) {
            var index=_this.myIndex,
                attr='';
            switch (index){
                case 0:
                    attr='data-time';
                    break;
                case 1:
                    attr='data-price';
                    break;
                case 2:
                    attr ='data-hot';
                    break;
            }
            var cur= a.getAttribute(attr),
                next = b.getAttribute(attr);
            if(index===0){
                cur=cur.replace(/-/g,'');
                next=next.replace(/-/g,'');
            }
            return (cur - next) * _this.myMethod;
        });

        var frg = document.createDocumentFragment();
        for (var i = 0; i < oList.length; i++) {
            frg.appendChild(oList[i])
        }
        listBox.appendChild(frg);
        frg = null;
    }
}();
// var shopRender=function () {
//           var  product=null,
//          listBox=document.getElementById("list"),
//          linkList=document.getElementById('header').getElementsByTagName('a');
// var getData=function() {
//     var xhr=new XMLHttpRequest();
//     xhr.open("get","json/product.json",false);
//     xhr.onreadystatechange=function () {
//         if(xhr.readyState===4&& xhr.status===200){
//             var result=xhr.responseText;
//             product=utils.toJSON(result);
//         }
//     };
//     xhr.send(null);
// };
// var bindHTML=function () {
//     if(!product) return
//     var str=``;
//     for(var i=0;i<product.length;i++){
//         var item=product[i];
//         str+=` <li data-price="${item.price}" data-hot="${item.hot}" data-time="${item.time}"><a href="javascript:;">
//         <img src="${item.img}" alt="">
//         <p>${item.title}</p>
//         <span>${item.price}</span>
//     </a></li>`
//     }
//     listBox.innerHTML=str;
// };
//实现商品排序
// var change=function () {
//     var oList=listBox.getElementsByTagName('li');
//     oList=utils.toArray(oList);
//     var _this=this,
//         index=_this.myIndex,
//         method=_this.myMethod;
//     for (var k=0;k<linkList.length;k++){
//         if(k!==index){
//             linkList[k].myMethod=-1;
//         }
//     }
//     var attrArray=['data-time','data-price','data-hot'],
//         attr=attrArray[index];
//     oList.sort(function (a,b) {
//         var cur=a.getAttribute(attr),
//          next=b.getAttribute(attr);
//         if(index===0){
//             cur=cur.replace(/-/,'');
//             next=next.replace(/-/,'')
//         }
//         return (cur-next)*method;
//     });
//     var frg=document.createDocumentFragment();
//     for (var i=0;i<oList.length;i++){
//         frg.appendChild(oList[i])
//     }
//     listBox.appendChild(frg);
//     frg=null;
// };
//     //=>bindEvent：绑定点击事件,点击实现排序
// var bindEvent=function () {
//     for (var i=0;i<linkList.length;i++){
//         var curLink=linkList[i];
//         curLink.myMethod=-1;
//         curLink.myIndex=i;
//         curLink.onclick=function () {
//             this.myMethod*=-1;
//             change.call(this)
//         }
//     }
// };
//     return {
//         init:function () {
//             getData();
//             bindHTML();
//             bindEvent();
//         }
//     }
// }();
// shopRender.init();