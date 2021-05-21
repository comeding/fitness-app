require('../css/sports.less');


document.ready(function() {

    utils.addFooter('sports');
    let baseUrl = ' http://139.9.177.51:8099'

    let user = JSON.parse(localStorage.getItem('user'));

    let newImgDom = document.querySelector('#new-img');
    let newTitleDom = document.querySelector('#new-title');
    let newTextDom = document.querySelector('#new-text');
    let listDom = document.querySelector('.list');
    let newItemDom = document.querySelector('.new-item');

    //请求用户的课程列表
    $http.get('/sports/courseList?id=' + user.userId, function(res) {
        //处理数据渲染页面
        let dataArr = res.data;
        //获取最新课程
        let newData = dataArr.find(function(item) {
                return item.latest === 1
            })
         
        let newhtml = `
               <a href="./sports-detail.html?id=${newData.courseId}">
                <div class="new">
                    <div class="new-img">
                        <img src="${baseUrl+newData.imgurl}" id="new-img" alt="">
                    </div>
                    <div class="new-text">
                        <div class="new-text-title" id="new-title">
                            ${newData.name}
                        </div>
                        <div class="new-text-info" id="new-text">
                            ${newData.desc}
                        </div>
                    </div>
                </div>
               </a>
            `;
        newItemDom.innerHTML = newhtml;


        //渲染 课程列表

        

        let html = '';
        dataArr.forEach(function(item) {
            html += `
              <a href="./sports-detail.html?id=${item.courseId}">
                <div class="list-item">
                    <div class="img-box">
                        <img src="${baseUrl+item.imgurl}" alt="">
                    </div>
                    <div class="text-box">
                        <div class="course-title ">
                            ${item.name}
                        </div>
                        <div class="course-text ">
                            ${item.desc}
                        </div>
                    </div>
                </div>
              </a>
            `
        })

        listDom.innerHTML = html;

    })



})