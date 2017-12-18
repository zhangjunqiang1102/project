let r = (function ($) {
    let $userName=$('#userName'),
        $spanName=$('#spanName'),
        $userPhone=$('#userPhone'),
        $spanPhone=$('#spanPhone'),
        $userPass=$('#userPass'),
        $spanPass=$('#spanPass'),
        $userPassConfirm=$('#userPassConfirm'),
        $spanPassConfirm=$('#spanPassConfirm'),
        $userBio=$('#userBio'),
        $spanBio=$('#spanBio'),
        $man=$('#man'),
        $woman=$('#woman'),
        $submit=$('#submit');

let $plan=$.Callbacks(),
    isFlag=true;

let checkU=()=>{
  let reg=/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10})?$/;
  let value=$userName.val().trim();
  if(value.length===0){
      $spanName.html('用户名不能为空').addClass('error');
      return false
  }
    if(!reg.test(value)){
      $spanName.html('亲，请输入真实姓名（需要是中文汉字）！').addClass('error');
      return false;
    }
    $spanName.html('').removeClass('error');
  return true;
};

let checkP=()=>{
  let reg=/^1\d{10}&/,
      value=$userPhone.val().trim();
  if(value.length===0){
      $spanPhone.html('格式不对').addClass('error');
      return false;
  }
  if(!reg.test(value)){
      $spanPhone.html('格式不对').addClass('error');
      return false;

  }
  let code=0;
  $.ajax({
      url:'/checkPhone',
      dataType:'json',
      cache:false,
      data:{phone:value},
      async:false,
      success:result=>{
          code=result.code;
      }
  });
if(code==1){
    $spanPhone.html('已经注册过了了').addClass('error');
    return false;
}
    $spanPhone.html('').addClass('error');
return true

};


    return {
        init: function () {
            $userName.on('blur',checkU);
            $spanPhone.on('blur',checkP);

            $submit.tap(function () {
                if(checkU()&&checkP()){
                    $.ajax({
                        url:'/register',
                        type:'post',
                        dataType:'json',
                        data:{
                            name:$userName.val().trim(),
                            password:$userPass.val().trim(),
                            phone:$userPhone.val().trim(),
                            bio:$userBio.val().trim(),
                            sex:$man[0].checked?0:1
                        },
                        success:result=>{
                            let {code,data}=result;
                            if(code===0){
                                return
                            }
                            Dialog.show('很遗憾，亲，注册失败了哦，请重新刷新试试',{
                                callBack:()=>{
                                    location.href=location.href;
                                }
                            })
                        }
                    })
                }
            })
        }
    }
})();
r.init(Zepto);