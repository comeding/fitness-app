require('../css/sports-detail.less')

document.ready(function(){


    let url ='http://139.9.177.51:8099';
// 获取dom
let box =document.querySelector('.box');
let btn =document.querySelector('.btn');
let imgBox =document.querySelector('.img-box');
//通过课程id请求课程详细信息

// 获取id
let str = location.search;
let obj = utils.stringToObj(str);

$http.get('/sports/courseDetail?id='+obj.id,function(res){
   
    // 渲染页面
    imgBox.src=url+res.data.imgurl;


    // 将视频地址储存本地
    let  videoList = res.data.fragments;
    localStorage.setItem('videoList',JSON.stringify(videoList))


})


 //跳转页面到下一页
 btn.addEventListener('click', function(ev){
    location.href = "./player.html";
})


})


