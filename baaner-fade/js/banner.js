var bannerRender = (function () {
    var container = document.getElementById('container'),
        wrapper = utils.getElementsByClassName('wrapper', container)[0],
        focusBox = utils.getElementsByClassName('focusBox', container)[0],
        arrow = utils.children(container, 'a'),
        arrowLeft = arrow[0],
        arrowRight = arrow[1],
        bannerData = null,
        wrapperList = null,
        focusList = null,
        wrapperImgList = null;
    //=>获取数据
    function queryData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'json/banner.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                bannerData = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }
    //=>绑定数据
    function bindData() {
        if (!bannerData) return;
        var str = ``,
            strFocus = ``;
        for (var i = 0; i < bannerData.length; i++) {
            var item = bannerData[i];
            str += `<li class="slide">
                <img src="${item.img}" ="" alt="">
            </li>`;

            strFocus += `<li class="${i === bannerData.length - 1 ? 'last' : ''}"></li>`;
        }
        wrapper.innerHTML = str;
        focusBox.innerHTML = strFocus;
        //=>获取所有的LI以及IMG
        wrapperList = wrapper.getElementsByTagName('li');
        focusList = focusBox.getElementsByTagName('li');
        wrapperImgList = wrapper.getElementsByTagName('img');
    }
    //=>设置默认展示
    function initDefault(index) {
        index = index || 0;
        utils.css(wrapperList[index], {
            opacity: 1,
            zIndex: 1
        });
        focusList[index].className += ' select';//=>一定是加等于(因为部分LI有自己的原有样式)
    }
    //=>实现轮播图的自动切换
    var step = 0,//->记录当前展示的是第几个SLIDE(索引)
        prevStep = 0,//->记录上一个展示的SLIDE索引
        autoInterval = 2000,//->自动切换的时间因子
        autoTimer = null,//->自动切换的定时器
        count = 0;//->总共的SLIDE数量
    function autoMove() {
        step++;
        if (step === count) {
            step = 0;
        }
        change();
    }
    //=>轮播图公共切换方法
    function change() {
        if (step === prevStep) return;
        var curSlide = wrapperList[step],
            preSlide = wrapperList[prevStep];

        //->当前展示的SLIDE层级变为1 & 上一个展示的SLIDE层级变为0
        utils.css(curSlide, 'zIndex', 1);
        utils.css(preSlide, 'zIndex', 0);

        //->让当前展示的SLIDE透明度从0~1(动画)
        animate({
            curEle: curSlide,
            target: {opacity: 1},
            duration: 200,
            callBack: function () {
                //=>上一个SLIDE隐藏(透明度为0)
                utils.css(preSlide, 'opacity', 0);
            }
        });

        //->当前展示的这一个SLIDE就是下一次切换的上一次SLIDE
        prevStep = step;

        //=>焦点对齐
        selectFocus();
    }
    //=>焦点对齐的方法
    function selectFocus() {
        for (var i = 0; i < focusList.length; i++) {
            var item = focusList[i];
            if (i === focusList.length - 1) {
                item.className = i === step ? 'last select' : 'last';
                continue;
            }
            item.className = i === step ? 'select' : '';
        }
    }
    //=>滑过焦点实现切换
    function bindFocus() {
        for (var i = 0; i < focusList.length; i++) {
            focusList[i].myIndex = i;
            focusList[i].onmouseenter = function () {
                step = this.myIndex;
                change();
            }
        }
    }

    //=>点击左右按钮切换
    function bindArrow() {
        arrowLeft.onclick = function () {
            step--;
            if (step < 0) {
                step = count - 1;
            }
            change();
        };
        arrowRight.onclick = autoMove;
    }
    return {
        init: function () {
            // window.onload = computed;
            queryData();
            bindData();
            initDefault(step);
            count = bannerData.length;
            autoTimer = setInterval(autoMove, autoInterval);
            bindFocus();
            bindArrow();
        }
    }
})();
bannerRender.init();
