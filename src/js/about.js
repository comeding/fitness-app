require('../css/about.less')


document.ready(function(){
    utils.addFooter('about');

    let logOut =document.querySelector('.log-out');
    // 退出登录
    logOut.addEventListener('click',function(event){
          // 删除uers
          localStorage.removeItem('user');
          // 跳转到登录页
          location.href='../login.html'
    })
  


})