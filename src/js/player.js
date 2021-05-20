require('../css/player.less')

document.ready(function(){
    let url ='http://139.9.177.51:8099'
    // 获取dom
    let videoPlayerDom = document.querySelector('#video-player');
    let nowNum =document.querySelector('.now-num');
    let allNum =document.querySelector('.all-num');

    let back =document.querySelector('#back');
    let next =document.querySelector('#next');
    let progress =document.querySelector('.progress')
    // videoList 获取本地视频
let videoList =JSON.parse(localStorage.getItem('videoList'));
// console.log(videoList );
    let index =2;
    // 播放
    function play(){
        // 渲染页面进度
        // nowNum.textContent =index+1;
        nowNum.textContent =index+1
        allNum.textContent =videoList.length;
       
        // 播放视频的路径
        videoPlayerDom.src =url+videoList[index].videoUrl

    }
    play();


    // 上一页
    back.addEventListener('click',function(){
        
        if(index>0){
            index--;
            play();
        }
    })

    // 下一页

    next.addEventListener('click',function(){
            
            if(index<videoList.length-1){
                index++;
                play();
            }
        })

        // 自动播放下一页
        videoPlayerDom.addEventListener('ended', function() {
            index++;
            if (index < videoList.length) {
                play();
            }
        })




        // 底部进度条

        setInterval(function(){
            // 屏幕宽度
            let width = document.body.offsetWidth;

            //进度条宽度= 当前时间/视频总时间*盒子总宽度
            // 当前时间
            let current=videoPlayerDom.currentTime;
            let total =videoPlayerDom.duration;
            let num = width * (current /total);
            progress.style.width = num + 'px'
        },30)

})
