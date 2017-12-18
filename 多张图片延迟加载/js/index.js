var nr = (function () {
    var _newsData = null,
        _newBox = document.getElementById('newBox');
    function qa() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'json/news.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _newsData = utils.toJSON(xhr.responseText)
            }
        };
        xhr.send(null);
    }
    function bindHTML() {
        if (!_newsData) return;
        var str = ``;
        for (var i = 0; i < _newsData.length; i++) {
            var item = _newsData[i];
            str += `<li><a href="${item.link}">
        <div class="imgBox">
            <img src=""data-img="${item.figure}" alt="">
            </div>
        <div class="con">
            <p class="title">${item.title}</p>
            <span>${item.comment}</span>
            </div>
         </a></li>`
        }
        _newBox.innerHTML = str;
    }
    function cd() {
        var imgL = _newBox.getElementsByTagName('img');
        for (var i = 0; i < imgL.length; i++) {
            var cg = imgL[i],
                cx = cg.parentNode;
            if (cg.isLoad) continue;

            if (A <= B) {
                lazyG(cg)
            }
        }
    }
    function lazyG(cg) {
        cg.isLoad = true;
        var tg = new Image;
        tg.onload = function () {
            cg.src = tg.src;
            cg.style.display = 'block';
            imgFade(cg);
            tg = null;
        };
        tg.src = cg.getAttribute('data-img');
    }
    //让当前图片能够间现出来
    function imgFade(cg) {
        var n=0;

       var timer= setInterval(function () {
           if(n>1){
               clearInterval(timer);
               timer=null;
               return
           }
           n+=0.05;

           utils.css(cg,'opacity',n)
       },17)//->17执行毫秒是执行定时器动画相对比较理想的间隔时间
    }

    return {
        init: function () {
            qa();
            bindHTML();
            setTimeout(cd, 500);
            window.onscroll = cd;
        }
    }
})();
nr.init();