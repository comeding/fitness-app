require('../css/home.less');
// 获取所有dom
let text=document.querySelector('.text');
let i =document.querySelector('i');
let span =document.querySelector('.badge i');
let btn =document.querySelector('.card button');
console.log(btn);

document.ready(function(){

var mySwiper = new Swiper ('.swiper-container', {
  // direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
  
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // 自动轮播3s
  autoplay:true,

})  
utils.addFooter('home')



// 获取首页数据

let user =JSON.parse(localStorage.getItem('user'));
console.log(user);
// 请求首页数据
function homedata(){
  $http.get('/headPageInfo?userId='+user.userId,function(res){
    // 拿到数据渲染
    text.textContent =res.data.rank;
    i.textContent =res.data.punchIn;
    span.textContent =res.data.insigniaNum;
    // 判定是否打卡
  if(res.data.isPunch=='true'){
    btn.style.display='none';
  }
  })
}
homedata();
// 打卡功能




btn.addEventListener('click',function(){
  // 打卡按钮事件触发
  $http.get('/clockIn?userId='+user.userId,function(res){
    if(res.status==0){
      utils.toast(1,'打卡成功')

      
      homedata();
    }
   
  })
  // 重新请求页面数据渲染
 
 



})






})


