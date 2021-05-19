require('../css/about.less')


document.ready(function(){
    utils.addFooter('about');

    // 获取dom
    let img = document.querySelector('.head img');
    let head =document.querySelector('.head')
    let uer = document.querySelector('.box span');
    let msg = document.querySelector('.uer-name p');
    let times =document.querySelector('.left span');
    let calorie =document.querySelector('.right span');
    let uerName =document.querySelector('.uer-name');
    let logOut =document.querySelector('.log-out');
    let file =document.querySelector('.file')

      // 获取本地 localStorage
      let user = JSON.parse(localStorage.getItem('user'));
      
  
  // 请求最新的用户数据渲染页面
  getUserInfo();
   
    //请求个人中心 运动数据
    $http.get('/users/mysportsBadge?userId='+user.userId,function(res){
        // console.log(res);
        times.textContent =res.data.sports.times;
        calorie.textContent =res.data.sports.calorie;
    })
      // 头像点击事件
      head.addEventListener('click', function(event){
        // 触发input点击事件
        file.click();
         // 阻止冒泡
        event.stopPropagation();
    })
     // url拼接
     let url = 'http://139.9.177.51:8099';
     file.addEventListener('change',function(){
        // 请求接口
        $updateFile('/users/upload','imgurl',this.files[0],function(res){
            // 渲染页面
            img.src =url+res.data;
             // url拼接
            let Url =url+res.data;
            //更新后端数据-头像
            updateAvater(Url);
          
      
        }) 
    })
    

       // 个人信息设置跳转
    uerName.addEventListener('click',function(){
        location.href='../edit.html';
    })
    // 退出登录
    logOut.addEventListener('click',function(event){
          // 删除uers
          localStorage.removeItem('user');
          // 跳转到登录页
          location.href='../login.html'
    })
  
 //更新后端数据-头像
 function updateAvater(url) {
    //调用修改数据
    let data = {
        userId: user.userId,
        imgurl: url
    }
    $http.post('/users/userEdit', data, function(res) {
        if (res.status == 0) {
            utils.toast(1, '修改头像成功');
            getUserInfo()
        }
    })

}

// 接口请求最新的用户数据
function getUserInfo() {
    $http.get('/users/accountinfo?userId=' + user.userId, function(res) {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.data));

        if (res.data.imgurl) {
            img.src = res.data.imgurl;
        }
        uer.textContent = res.data.nickname;
        if (res.data.sign) {
            msg.textContent = res.data.sign;
        }


    })
}
})