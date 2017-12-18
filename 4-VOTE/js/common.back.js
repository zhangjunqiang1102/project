~function ($) {
    let computed=()=>{
        let $HTML=$(document.documentElement),
            winH=$HTML[0].clientWidth,
            value=100;
        value=winH<640?winH/640*100:value;
        $HTML.css('fontSize',value);
    };
    computed();
    $(window).on('resize',computed);
}(Zepto);
let cookie = (function () {
    let setValue = (name, value, expires = (new Date(new Date().getTime() + (1000 * 60 * 60 * 24))), path = '/', domain = '')=> {
        document.cookie = `${name}=${escape(value)};expires=${expires.toGMTString()};path=${path};domain=${domain}`;
    };

    let getValue = name=> {
        let cookieInfo = document.cookie,
            reg = new RegExp(`(?:^| )${name}=([^;]*)(?:;|$)`),
            ary = cookieInfo.match(reg);
        return ary ? unescape(ary[1]) : null;
    };

    let removeValue = (name, path = '/', domain = '')=> {
        let value = getValue(name);
        if (value) {
            document.cookie = `${name}= ;path=${path};domain=${domain};expires=Fri,02-Jan-1970 00:00:00 GMT`;
        }
    };

    return {
        set: setValue,
        get: getValue,
        remove: removeValue
    }
})();
~function(){
    let pro=String.prototype;

    pro.myQueryURLParameter=function myQueryURLParameter() {
        let obj={},
            reg=/[?&#]([^?#&=]+)(?:=([^?#&=]*))?/g;

        this.replace(reg,(...arg)=>{
            let [res,key,value]=arg;
            if (res.indexOf('#')>-1){
                obj['hash']=key;
                return;
            }
            obj[key]=value
        });
        return obj;
    };

}();

~function(){

    class Dialog{
        constructor(con='',{
            isTap=true,
            isAuto=2000,
            callBack=new Function()
        }={}){
            this.con=con;
            this.callback=callBack;
            this.isTap=isTap;
            this.isAuto=isAuto;

            this.init()
        }
        init(){
            this.createMark();
            if(this.isAuto!=0){
                this.autoT=setTimeout(()=>{
                    this.removeMark();
                    clearTimeout(this.autoT);
                },this.isAuto)
            }
            if(this.isTap){
                $(document).tap(e=>{
                    let target=e.target,
                        $target=$(target),
                        $par=$target.parent();
                    if($par.hasClass('box')) return;
                    this.removeMark();
                    clearTimeout(this.autoT);
                });
            }
        }
        createMark(){
            let sectionBox = document.createElement('section');
            sectionBox.className = 'markDialog';
            sectionBox.innerHTML =`<div class="box">
            <h3>提示</h3>
            <div class="content">${this.con}</div>
        </div>`;
            let container = document.querySelector('.mainBox') || document.body;
            container.appendChild(sectionBox);
            //把容器和创建的盒子挂载到实例上
            this.container = container;
            this.sectionBox = sectionBox
        }
        removeMark(){
            this.container.removeChild(this.sectionBox);
            this.callback(this);
        }
        static show(...arg){
            return new  Dialog(...arg)
        }
    }
    window.Dialog=Dialog;

}();
