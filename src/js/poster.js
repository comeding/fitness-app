require('../css/poster.less')

// 倒计时
let num = document.querySelector('button>span');
let btn = document.querySelector('button');
btn.addEventListener('click',function(){
    // 如果有用户，跳转到首页
    // 没有用户，跳转到登录页
    if(localStorage.getItem('user')){
        location.href='../home.html'
    }else{
        location.href='../login.html'
    }



    // location.href='../home.html'
})
// console.log(num.textContent);
// 开启计时器
let index = 5;
let timeId =setInterval(function(){
    index--;
    num.textContent=index;
    if(index<=0){
        clearInterval(timeId);
        if(localStorage.getItem('user')){
            location.href='../home.html'
        }else{
            location.href='../login.html'
        }
        // location.href='./home.html'
    }
},1000) 