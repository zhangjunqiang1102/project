~function($){
    let $plan=$.Callbacks(),
        $mainBox=$('.mainBox'),
        $wrapper=$mainBox.find('.wrapper'),
        $headerBox=$('.headerBox'),
        $footerBox=$('.footerBox'),
        audioBox=$('#audioBox')[0],
        $musicBtn=$headerBox.find('a'),
        $duration = $footerBox.find('.duration'),
          $run = $footerBox.find('.run'),
          $already = $footerBox.find('.already');

    //=>渲染页面的时候就把MAIN-BOX的高度动态进行计算
    ~function () {
        let winH = document.documentElement.clientHeight,
            font = $(document.documentElement).css('fontSize');
        font = parseFloat(font);
        $mainBox.css('height', winH - $headerBox[0].offsetHeight - $footerBox[0].offsetHeight - .8 * font);
    }();

    //把获取的歌词进行相关的格式化
    let formatData = result=> {
        let {lyric}=result,
            ary = [];

        //->第一步：先把一些特殊符号替换掉
        lyric = lyric.replace(/&#(\d+);/g, (...arg)=> {
            let [bigRes,groupRes]=arg,
                value = bigRes;
            groupRes = parseFloat(groupRes);
            switch (groupRes) {
                case 32:
                    value = ' ';
                    break;
                case 40:
                    value = '(';
                    break;
                case 41:
                    value = ')';
                    break;
                case 45:
                    value = '-';
                    break;
            }
            return value;
        });

        //->第二步：在最新的字符串中捕获到我们需要的时间和歌词
        lyric.replace(/\[(\d+)&#58;(\d+)&#46;\d+\]([^&#;]+)(&#10;)?/g, (...arg)=> {
            let [,minutes,seconds,value]=arg;
            ary.push({
                minutes: minutes,
                seconds: seconds,
                value: value
            });
        });

        return ary;
    };
    //=>数据绑定
    $plan.add(result=> {
        let str = ``;
        result.forEach((item, index)=> {
            let {minutes, seconds, value}=item;
            str += `<p data-minutes="${minutes}" data-seconds="${seconds}">${value}</p>`;
        });
        $wrapper.append(str);
    });

    //=>数据绑定
    $plan.add(result=> {
        let str = ``;
        result.forEach((item, index)=> {
            let {minutes, seconds, value}=item;
            str += `<p data-minutes="${minutes}" data-seconds="${seconds}">${value}</p>`;
        });
        $wrapper.append(str);
    });
//
    //=
    $plan.add(result=>{
       let str=``;
       result.forEach((item,index)=>{
           let {minutes,seconds,value}=item;
           str+=`  <p data-minutes="${minutes}" data-seconds="${seconds}" =${value}></p>`
       });
    $wrapper.append(str)
    });

//>音乐暂停或者开始播放
    $plan.add(result=>{
        audioBox.oncanplay=()=>{
        //  canplay:当前音频可以播放触发事件（资源可能没有加载完成，随加载随播放）
            $musicBtn.css('display','block').addClass('run');
        };
            audioBox.play();
       //->点击按钮控制暂停播放
        $musicBtn.tap(()=>{
            if(audioBox.paused){
                audioBox.play();
                $musicBtn.addClass('run');
                return;
            }
            audioBox.pause();
            $musicBtn.removeClass('run');
        })
    });

    //=>歌词对应和进度更新
    $plan.add(result=>{
       let autoTimer=setInterval(()=>{
           let duration=audioBox.duration,
               curTime=audioBox.currentTime;

       //    歌词对应
           lyricCorrespondence(duration,curTime);

           pro(duration, curTime);


           if(curTime>=duration){
               clearInterval(autoTimer);
               audioBox.pause();
               $musicBtn.removeClass('run');
           }
       },1000);
    });



        let lyricCorrespondence = (duration, curTime)=> {
            let minutes = Math.floor(curTime / 60),
                seconds = Math.ceil(curTime - minutes * 60);
            minutes < 10 ? minutes = '0' + minutes : null;
            seconds < 10 ? seconds = '0' + seconds : null;

            let $pList = $wrapper.find('p'),
                $curP = $pList.filter(`[data-minutes="${minutes}"]`).filter(`[data-seconds="${seconds}"]`);
            if ($curP.length > 0) {
                $curP.addClass('select')
                    .siblings().removeClass('select');

                //->控制WRAPPER向上移动
                let index = $curP.index();
                if (index >= 4) {
                    let y = ($wrapper.attr('data-y') || 0) - .84;
                    $wrapper.attr("data-y", y)
                        .css('transform', `translateY(${y}rem)`);
                }
            }
        };



//    控制进程

    let pro=(duration,curTime)=>{
        let durText=computed(duration),
            curText=computed(curTime);
        $already.html(curText);
        $duration.html(durText);
        $run.css('width', curTime / duration * 100 + '%');
    };


    let computed=(time)=>{
        let minutes = Math.floor(time / 60),
            seconds = Math.ceil(time - minutes * 60);
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;
        return minutes + ':' + seconds;
    };

    $.ajax({
       url:'json/lyric.json',
       type:'get',
       dataType:'json',
       success:result=>{
           result=formatData(result);
           $plan.fire(result)
       }
   })
}(Zepto);