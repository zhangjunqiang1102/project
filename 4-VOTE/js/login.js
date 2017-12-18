let loginR = (function ($) {
    let $userName=$('#uerName'),
        $userPass=$('#uerPass'),
        $submit=$('#submit');

    let $plan=$.Callbacks();
    $plan.add(data=>{
       localStorage.setItem('userInfo',JSON.stringify(data));
       Dialog.show('登入成功！',function () {
          location.href='index.html'//可能回到其他页面；
       });
    });
    let submitF=function () {
      //  密码的处理
        let password=$userPass.val().trim();
        if(password==='######'){
            let userInfo=localStorage.getItem('userInfo');
            if(userInfo){
                userInfo=JSON.parse(userInfo);
                password=userInfo['password'];
            }
        }else {
            //自己输入的： 需要加密MD5 再把密码传递给服务器
            password=hex_md5(password);
        }

      $.ajax({
          url:'/login',
          type:'post',
          dataType:'json',
          data:{
              name:$userName.val().trim(),
              password:password
          },
          success:result=>{
              let {code,data}=result;
              if(code!=0){
                  Dialog.show('登入失败!');
                  return;
              }
              $plan.fire(data);
          }
      });
    };
    return {
        init: function () {
             //记录用户名密码
            let userInfo=localStorage.getItem('userInfo');
            if(userInfo){
             userInfo=JSON.parse(userInfo);
                $userName.val(userInfo['name']);
                $userPass.val('######')//不是从本地获取密码，1.本地存储的密码是经过加密的，放在文本中，太长
            //    2.当用户点击提交的时候，自己输入的经过MD5加密的，如果默认记录的，我们直接把上一次本地记录的，已经加密的传递给服务器即可（不需要重新MD5处理了）
            }
             $submit.tap(submitF);
        }
    }
})(Zepto);
loginR.init();