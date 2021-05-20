require('../css/edit.less');


document.ready(function() {
   
    let sexDom = document.querySelector('#sex');
    let sexVal = document.querySelector('#sex-val');
    let saveBtn = document.querySelector('.save-btn');

    let brithdayDom = document.querySelector('#brithday');
    let brithdayValDom = document.querySelector('#brithday-val');

    let nicknameDom = document.querySelector('.nickname');
    let signDom = document.querySelector('.sign');

    //省市联动
    let proDom = document.querySelector('#pro');
    let proValDom = document.querySelector('#pro-val');
    let cityDom = document.querySelector('#city');
    let cityValDom = document.querySelector('#city-val');

    let user = JSON.parse(localStorage.getItem('user'));

    // 渲染页面
    getUserInfo();
    function getUserInfo(){
        nicknameDom.value =user.nickname;
        sexVal.value =user.gender;
        brithdayValDom.textContent =user.birthday.substr(0,10)
        proValDom.textContent =user.address.substr(0,3);
        cityValDom.textContent =user.address.substr(4);
        signDom.textContent =user.sign
    }

    //存储的给后端的数据
    let data = {
        userId: user.userId,
        nickname: '',
        sign: '',
        gender: '',
        birthday: '',
        pro: {},
        city: {},
        address: []

    };
    //存储市级列表
    let cityDataList = [];

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

    //省市 地址 二级联动
    proDom.addEventListener('click', function(ev) {

        //请求省级数据
        $http.get('/address/province', function(res) {
            

            let arr = res.data.map(function(item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
     

            //生成picker 数据
            weui.picker(arr, {
                onConfirm: function(res) {
                    //保存数据
                    data.pro = res[0];
                
                    //渲染页面
                    proValDom.textContent = res[0].label

                    //清空之前的市级选中数据
                    data.city = {}
                    cityValDom.textContent = '请选择城市'

                    cityList(data.pro);
                    

                },
                title: '选择省份'
            });

        })
    })

    //请求市级列表
    function cityList(pro) {
        //在省级回调中 请求的城市列表

        //根据省级id 请求城市列表

        //判断是否有省级id
        if (pro.value) {
            $http.get('/address/city/' + pro.value, function(res) {
                //重组数据
                cityDataList = res.data.map(function(item) {
                    return {
                        label: item.name,
                        value: item.addressId
                    }
                })


                
            })
            
        }

    }


    //点击城市 触发事件--生成picker
    cityDom.addEventListener('click', function(ev) {
        //生成数据
        

        //生成picker--市级
        weui.picker(cityDataList, {
            onConfirm: function(res) {
                //保存数据
                data.city = res[0];
           
                //渲染页面
                cityValDom.textContent = res[0].label
                cityList(data);

            },
            title: '选择城市'
        });
    })



    //上传修改完成之后的数据 
    //保存数据
    saveBtn.addEventListener('click', function(ev) {
        console.log(data);
        //拼接数据
        data.sign = signDom.value;
        data.nickname = nicknameDom.value;
        //生日时间戳
        data.birthday = new Date(data.birthday).getTime();
        // console.log(new Date(data.birthday).getTime());
        //拼接数据--城市信息
        data.address[0] = data.pro.label;
        data.address[1] = data.city.label;
        


        //发送请求--修改用户信息
        $http.post('/users/userEdit', data, function(res) {
            if (res.status == 0) {
                utils.toast(1, '修改信息成功');
            } else {
                utils.toast1(1, '修改失败');
            }


            $http.get('/users/accountinfo?userId=' + user.userId, function(res) {
              
                localStorage.setItem('user', JSON.stringify(res.data));})
        })
    })



        


})