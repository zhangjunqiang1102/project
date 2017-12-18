let imgList=document.getElementsByTagName('img');
for (let i = 0; i < imgList.length; i++) {
 $event.on(imgList[i],'mousemove',function (e) {
     e.preventDefault();
 })
}

let down = function (e) {
    //this:oBox
    this.strX = e.clientX;
    this.strY = e.clientY;
    this.strL = this.offsetLeft;
    this.strT = this.offsetTop;

    this._MOVE = move.myBind(this);

    this._UP = up.myBind(this);
    $event.on(document, 'mousemove', this._MOVE);
    $event.on(document, 'mouseup', this._UP);
    //=>结束当前盒子正在运行的动画,开始新的拖拽
    clearInterval(this.timerDrop);
    clearInterval(this.timerFly);
};
let move = function (e) {
    let curL = e.clientX - this.strX + this.strL,
        curT = e.clientY - this.strY + this.strT;
    curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
    curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
    this.style.left = curL + 'px';
    this.style.top = curT + 'px';
// 计算水平方向的速度
    if (!this.preFly) {
        this.preFly = this.offsetLeft;
    } else {
        this.speedFly = this.offsetLeft - this.preFly;
        this.preFly = this.offsetLeft;
    }
};
let up = function (e) {
    $event.off(document, 'mousemove', this._MOVE);
    $event.off(document, 'mouseup', this._UP);
    moveFly.call(this);
    moveDrop.call(this)
};

//水平方向飞
let moveFly = function () {
    let speedFly = this.speedFly;
    this.timerFly = setInterval(() => {
        if (Math.abs(speedFly) < 0.5) {
            clearInterval(this.timerFly);
            return;
        }
        speedFly *= 0.98;//
        let curL = this.offsetLeft + speedFly;
        if (curL > maxL || curL < 0) {
            speedFly *= -1;//控制反方向运动
            curL = curL > maxL ? maxL : (curL < 0 ? 0 : curL);//不管怎么走都不要超过边界
        }
        this.style.left = curL + 'px'
    }, 17)
};

//垂直方向飞
let moveDrop=function () {
    let speedDrop=10,
        flagDrop=0;
    this.timerDrop=setInterval(()=>{
        if(flagDrop>=2){
            clearInterval(this.timerDrop);
            return;
        }
       speedDrop*=0.98;
        speedDrop+=10;
        let curT=this.offsetTop+speedDrop;
        if (curT>=maxT){
            speedDrop*=-1;
            curT=maxT;
            flagDrop++;
        }else {
            flagDrop=0;
        }
        this.style.top=curT+'px'
    },17)

};


let oBox = document.getElementById('box'),
    oBox2=document.getElementById('box2');
$event.on(oBox2, 'mousedown', down);
$event.on(oBox, "mousedown", down);
maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth;
maxT = (document.documentElement.clientHeight || document.body.clientHeight)- oBox.offsetHeight;
//
// let imgL = document.getElementsByTagName('img');
// for (let i = 0; i < imgL.length; i++) {
//     $event.on(imgL[i], 'mousemove', function (e) {
//         e.preventDefault();
//     })
// }
//
// let down = function (e) {
//     this.strX = e.clientX;
//     this.strY = e.clientY;
//     this.strL = this.offsetLeft;
//     this.strT = this.offsetTop;
//
//     this._MOVE = move.myBind(this);
//     this._UP = move.myBind(this);
//     $event.on(document, 'mousemove', this._MOVE);
//     $event.on(document, 'mouseup', this._UP);
//     console.log('o');
//     clearInterval(this.timerDrop);
//     clearInterval(this.timerFly);
//
// };
//
// let move = function (e) {
//     let curL = e.clientX - this.strX + this.strL,
//         curT = e.clientY - this.strY + this.strT;
//     curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
//     curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
//
//     this.style.left = curL + 'px';
//     this.style.top = curT + 'px';
//
//     if (!this.preFly) {
//         this.preFly = this.offsetLeft;
//     } else {
//         this.speedFly = this.offsetLeft - this.preFly;
//         this.preFly = this.offsetLeft;
//     }
//
// };
// let up = function (e) {
//     $event.off(document, 'mousemove', this._MOVE);
//     $event.off(document, 'mouseup', this._UP);
//
//     console.log('ok');
//     moveFly.call(this);
//     moveDrop.call(this);
// };
//
// let moveFly = function () {
//     let speedFly = this.speedFly;
//     this.timerFly = setInterval(() => {
//         if (Math.abs(speedFly) < 0.5) {
//             clearInterval(this.timerFly);
//             return
//         }
//         speedFly *= 0.98;
//         let curL = this.offsetLeft + speedFly;
//         if (curL > maxL || curL < 0) {
//             speedFly *= -1;
//             curL = curL > maxL ? maxL : (curL < 0 ? 0 : curL);
//         }
//         this.style.left = curL + 'px';
//     }, 17)
// };
//
// let moveDrop = function () {
//     let speedDrop = 10,
//         fragDrop = 0;
//     this.timerDrop = setInterval(() => {
//         if (fragDrop >= 2) {
//             clearInterval(this.timerDrop);
//             return;
//         }
//         speedDrop *= 0.98;
//         speedDrop += 10;
//         let curT = this.offsetTop + speedDrop;
//         if (curT > maxT) {
//             speedDrop *= -1;
//             curT = maxT;
//             fragDrop++;
//         } else {
//             fragDrop = 0;
//         }
//         this.style.top = curT + 'px'
//     }, 17)
// };
// let oBox = document.getElementById('box'),
//     oBox2 = document.getElementById('box2'),
//     maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
//     maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;
//
// $event.on(oBox2, 'mousedown', down);
// $event.on(oBox, 'mousedown', down);


/*
 *事件触发
 *   1.浏览器都有一个自己最小的反应时间，当我们移动过程中，浏览器总会在最小的反应时间内触发mouse-move事件行为
 *   移动相同距离之下
 *    移动速度快，浏览器反应过来的次数就少（触发事件的次数少）
 *    移动速度慢，浏览器反应过来的次数就多（触发事件的次数多）
 *
 */