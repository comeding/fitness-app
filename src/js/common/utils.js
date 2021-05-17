/**
 * 工具函数
 */
const utils={};
// 手机号验证
utils.testTall=function(res){
    let reg =/^[1][3|4|5|6|7|8|9][0-9]{9}$/;
    return reg.test(res);
}


/**
 * @toast 提示框
 * @status number 1/0  1:成功 0：失败
 * @msg  string  
 */
// 正确
// 创建节点
utils.toast = function(status, msg){


    let toast = document.createElement('div');
//设置节点的类名
toast.className = 'toast';
let html = `
    <p class="toast-icon">
        √
    </p>
    <p class="toast-text">${msg}</p>
`
    //将toast的内容 添加到toast
toast.innerHTML = html;
//将toast 添加到body中
document.querySelector('body').appendChild(toast);
//删除节点
setTimeout(function() {
    toast.remove()
}, 2000)
}


// 错误
// 创建节点
utils.toast1 = function(status, msg){


    let toast = document.createElement('div');
//设置节点的类名
toast.className = 'toast';
let html = `
    <p class="toast-icon">
        x
    </p>
    <p class="toast-text">${msg}</p>
`
    //将toast的内容 添加到toast
toast.innerHTML = html;
//将toast 添加到body中
document.querySelector('body').appendChild(toast);
//删除节点
setTimeout(function() {
    toast.remove()
}, 2000)
}


// 底部组件
utils.addFooter = function(page) {
    let footer = document.createElement('footer');
    footer.className = 'dpflex';

    //内容部分
    let html = `
        <a href="./home.html">
           <div class="${page==='home'?'icon-item active ':'icon-item'} ">
            <p><i class="iconfont iconhome "></i></p>
            <p class="icon-text">首页</p>
           </div>
        </a>
        <a href="./sports.html">
            <div class="${page==='sports'?'icon-item active ':'icon-item'}">
                <p><i class="iconfont iconsports "></i></p>
                <p class="icon-text">运动</p>
            </div>
        </a>
        <a href="./about.html">
            <div class="${page==='about'?'icon-item active ':'icon-item'}">
                <p><i class="iconfont iconmine "></i></p>
                <p class="icon-text">我的</p>
            </div>
        </a>
    `;

    footer.innerHTML = html;
    document.querySelector('body').appendChild(footer);


}






window.utils=utils;