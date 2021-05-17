require('../css/login.less')

document.ready(function(){
// 点击注册跳转
let uer =document.querySelector('.uer');
let btn =document.querySelector('p span');
let uers =document.querySelector('#uer');
let pwd =document.querySelector('#pwd');



//   自动填充账号信息
      /*   let user =JSON.parse(localStorage.getItem('user'));
        uers.value=user.account; */
    



// 请求接口
btn.addEventListener('click',function(){
    
    let data={
        account:uers.value,
        password:pwd.value
    }
    $http.post('/users/login',data,function(res){

    //  console.log(res);
   
       
        let user = res.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        setTimeout(function(){
            location.href='../home.html'
        },2000)

    })

        // 判定账号密码是否为空
        if(!(uers.value&&pwd.value)){
            utils.toast1(1,'登录失败');
           
          return;
      }
     
          utils.toast(1,'登录成功')
          // location.href='../home.html'
   
      

})
})


