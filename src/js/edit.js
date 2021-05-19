require('../css/edit.less');


document.ready(function() {
    console.log(weui);
    let sexDom = document.querySelector('#sex');
    let sexVal = document.querySelector('#sex-val');
    let saveBtn = document.querySelector('.save-btn');

    let brithdayDom = document.querySelector('#brithday');
    let brithdayValDom = document.querySelector('#brithday-val');

     //省市联动
     let proDom = document.querySelector('#pro');
     let proValDom = document.querySelector('#pro-val');
     let cityDom = document.querySelector('#city');
     let cityValDom = document.querySelector('#city-val');


    //存储的给后端的数据
    let data = {
        gender: '',
        birthday: '',
        pro: {},
        city: {},
    }

    let backDom = document.querySelector('.back');
    //返回上一页
    backDom.addEventListener('click', function(ev) {
        history.back();
    })


    //调用picker--性别
    sexDom.addEventListener('click', function(ev) {
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onConfirm: function(result) {
                //渲染页面
                sexVal.textContent = result[0].label;
                //存数据
                data.gender = result[0].label;
            },
            title: '选择性别'
        });
    })

    //调用picker 多列 ---生日
    brithdayDom.addEventListener('click', function(ev) {
        weui.datePicker({
            start: 1980,
            end: new Date().getFullYear(),

            onConfirm: function(result) {
                console.log(result);
                //渲染
                brithdayValDom.textContent = result[0].label + result[1].label + result[2].label;
                //数据
                data.birthday = result[0].value + '-' + result[1].value + '-' + result[2].value;
            },
            title: '选择生日'
        });
    })






    //保存数据
    saveBtn.addEventListener('click', function(ev) {
        console.log(data);
    })



        
    //省市 地址 二级联动
    proDom.addEventListener('click', function(ev) {

        //请求省级数据
        $http.get('/address/province', function(res) {
            console.log(res.data);

            let arr = res.data.map(function(item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            console.log(arr);

            //生成picker 数据
            weui.picker(arr, {
                onConfirm: function(res) {
                    //保存数据
                    data.pro = res[0];
                    console.log(res);
                    //渲染页面
                    proValDom.textContent = res[0].label
                },
                title: '选择省份'
            });

        })
    })








})