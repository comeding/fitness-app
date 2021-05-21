require('../css/register.less')

document.ready(function(){
    // 获取dom
    let btn = document.querySelector('.btn span');
    let number = document.querySelector('.number');
    let code = document.querySelector('.code');
    let pwds = document.querySelector('.pwds');
    let pwdss = document.querySelector('.pwdss');
    let span =document.querySelector('.span');

    // 验证码生成
    let captcha1 = new CaptchaMini({
        lineWidth: 1,   //线条宽度
        lineNum: 6,   //线条数量  
    });
    let str=''
    captcha1.draw(document.querySelector('#captcha1'), function(res){
        str = res.toLowerCase();
        console.log(str);
    });


   // 注册接口
  
   btn.addEventListener('click',function(){
   
    span.textContent='';

    // 判定信息填写为空
    if(!(code.value&&number.value&&pwds.value)){
        // span.textContent='请将信息填写完整';
        utils.toast1(1,'注册失败，请将信息填写完整')

        return;
    }
    // 验证码
   
    if(str!=code.value.toLowerCase()){
        // span.textContent='验证码输入错误'
        utils.toast1(1,'验证码输入错误')
        return;
    }
    // 判定手机号
    if(!utils.testTall(number.value)){
        utils.toast1(1,'手机号输入错误')
        return;
    }

    // 判定密码相同
    if(pwds.value!=pwdss.value){
        // span.textContent='两次密码输入不相同！'
        utils.toast1(1,'两次密码输入不相同！');
        return;

    }
    

    // 请求接口
    let data={
        
            account:number.value,
            password:pwds.value
        
    }
    
    $http.post('/users/add',data,function(res){
        // span.textContent='注册成功，前往登录界面';
        // 自动登录功能
        if(res.status===0){
            utils.toast(1,'登录成功');
            // 请求登录接口，跳转
            $http.post('/users/login',data,function(res1){
                console.log(res1);
                localStorage.setItem('user',JSON.stringify(res1.data.user));
                setTimeout(function(){
                    location.href='./home.html'
                },2000)
            })
        }else{
        utils.toast1(1,res.msg);

        }





        // utils.toast(1,'登录成功')
       /*  setTimeout(function(){
        
        

            location.href='../home.html'
        },2000) */

    })

})




})
