let indexI  = (function ($) {
    let $userList=$('.userList'),
        $userCon=$userList.find('ul'),
        $userTip=$userList.find('.tip'),
        $headerBox=$('.headerBox'),
        $input=$headerBox.find('input'),
        $searchBtn=$headerBox.find('.searchBtn');

    let $plan=$.Callbacks(),
        limit=10,//每页展示的数量
        page=1,//当前页码
        pageNum=0,//总页数
        total=0, //总数量
        isLoading=true;//=>用来记录当前是否在加载最新数据，true代表正在加载，false 加载完成

    let userInfo=localStorage.getItem('userInfo');
        userInfo=userInfo?JSON.parse(userInfo):{};
    //记录一些数据
    $plan.add(result=>{
        pageNum=result.pageNum;
        total=result.total;

         result['code']==0?($userCon.css('display','block'),$userTip.css('display','none')):($userCon.css('display','none'),$userTip.css('display','block'))
    });
    //数据绑定
    $plan.add(result=>{
    let {code,list}=result;
    if(code!=0) return;

    let str=``;
    list.forEach((item,index)=>{
        let {id,name,picture,sex,matchId,slogan,voteNum,isVote}=item;
        str+=` <li>
                <a href="detail.html?userId=${id}">
                    <img src="img/${sex==0?'man.png':'woman.png'}" alt="" class="picture">
                    <p class="title">
                        <span>${name}</span>
                        |
                        <span>${matchId}</span>
                    </p>
                    <p class="slogan">${slogan}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${voteNum}</span>
                  ${isVote==1?``: ` <a href="javascript:;" class="voteBtn" data-id="${id}">投${sex==0?`他`:`她`}一票</a>`}
                </div>
            </li>`;
    // $userCon.html();  原理是innerHTML，每一次操作都会把原有绑定的数据先当字符串拿出来，再和最新的拼接，最后整体存放进去
    });
       $userCon.append(str);

       isLoading=false;//数据绑定完成，让其变成false代表加载完成；
    });

    let voteFn = function (e) {
        let $target = $(e.target);
        if ($target.hasClass('voteBtn')) {
            //=>验证是否登录
            if (!userInfo.id) {
                Dialog.show('请您先登录再投票!');
                return;
            }
            $.ajax({
                url: '/vote',
                data: {
                    userId: userInfo.id,
                    participantId: $target.attr('data-id')
                },
                dataType: 'json',
                cache: false,
                success: result=> {
                    let {code}=result;
                    if (code != 0) {
                        Dialog.show('投票失败!');
                        return;
                    }
                    Dialog.show('感谢您的支持!');
                    let $pre = $target.prev('span');
                    $pre.html(parseFloat($pre.html()) + 1);
                    $target.remove();
                }
            });
        }
    };


    let queryD=function () {
        $.ajax({
            url:'/getMatchList',
            type:'get',
            dataType:'json',
            cache:false,
            data:{
                limit:limit,
                page:page,
                search:$input.val(),
                userId:userInfo.id||0
            },
            success:$plan.fire
        })
    };

    let searcherFn=function () {
            page=1;//重新展示page为1展示的内容
            isLoading=true;//此时不进行下拉刷新等操作
            $userCon.html('');//在展示新数之前，先把容器中的老数据清空，在展示新1的数据
            queryD();
    };
    return {
        init: function () {
                queryD();

                // 下拉刷新
            $(window).on('scroll',()=>{
                if(isLoading) return;//数据正在加载中，滚动条滚动的时候，不做任何处理（避免数据重复加载）
                if(page>=pageNum) return;//当前页码已经超过总页数，已经没有数据可加载了，此时我们不再加载新的数据
                let scrollT=document.documentElement.scrollTop,
                    winH=document.documentElement.clientHeight,
                    scrollH=document.documentElement.scrollHeight;
                if (scrollH+winH+100>=scrollH){
                //    快到低边界了，加载下一页
                //    为了避免
                    isLoading=true;
                    page++;
                    queryD();
                }
            });

            //点击刷新
           $searchBtn.tap(searcherFn);
           $input.on('input',searcherFn)
        }
    }
})(Zepto);
indexI.init();

// let indexRender = (function ($) {
//     let $userList=$('.userList'),
//         $userContainer=$userList.find('ul'),
//         $userTip=$userList.find('.tip'),
//         $headerBox=$('.headerBox'),
//         $input=$headerBox.find('input'),
//         $searchBtn=$headerBox.find('.searchBtn');
//
//     let $plan=$.Callbacks(),
//         limit=10,
//         page=1,
//         pageNum=0,
//         total=0,
//         isLoading=true;
//
//     $plan.add(result=>{
//         pageNum=result.pageNum;
//         total=result.total;
//
//         result['code']==0?
//             ($userContainer.css('display','block'),$userTip.css('display','none')):($userContainer.css('display','none'),$userTip.css('display','block'));
//
//     });
//
//     $plan.add(result=>{
//         let {code,list}=result;
//         if(code!=0) return;
//
//         let str=``;
//         list.forEach((item,index)=>{
//             let {id,name,picture,sex,matchId,slogan,voteNum,isVote}=item;
//             str+=`<li>
//                 <a href="detail.html?userId=${id}">
//                     <img src="img/${sex == 0 ? 'man.png' : 'woman.png'}" alt="" class="picture">
//                     <p class="title">
//                         <span>${name}</span>
//                         |
//                         <span>编号 #${matchId}</span>
//                     </p>
//                     <p class="slogan">${slogan}</p>
//                 </a>
//                 <div class="vote">
//                     <span class="voteNum">${voteNum}</span>
//                     ${isVote == 1 ? `` : `<a href="javascript:;" class="voteBtn">投${sex == 0 ? `他` : `她`}一票</a>`}
//                 </div>
//             </li>`;
//         });
//         $userContainer.append(str);
//
//         isLoading=false;
//      });
// let queryD=function () {
//     $.ajax({
//         url:'/getMatchList',
//         type:'get',
//         dataType:'json',
//         cache:false,
//         data:{
//             limit:limit,
//             page:page,
//             search:$input.val(),
//             userId:0
//         },
//         success:$plan.fire()
//     })
// };
// let searchFn=function () {
//              page=1;
//              isLoading=true;
//         $userContainer.html('');
//         queryD();
//
// };
//
//
//
//     return {
//         init: function () {
//              queryD();
//              $(window).on('scroll',()=>{
//                  if(isLoading) return;
//                  if(page>=pageNum) return;
//
//                  let {scrollTop:scrollT,clientHeight:winH,scrollHeight:scrollH}=document.documentElement;
//                  if(scrollT+winH+100>=scrollH){
//                      isLoading=true;
//                      page++;
//                      queryD();
//                  }
//              });
//             $searchBtn.tap(searchFn);
//              $input.on('input',searchFn)
//         }
//     }
// })(Zepto);
// indexRender.init();