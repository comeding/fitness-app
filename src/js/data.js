require('../css/data.less')

const echarts =require('echarts');
console.log(echarts);

//   柱状图
 // 基于准备好的dom，初始化echarts实例
 var myChart = echarts.init(document.getElementById('main'));

 // 指定图表的配置项和数据
 var option = {
     title: {
        text: '近七天运动时长'
     },
     tooltip: {},
     legend: {
         data:['时长']
     },
     xAxis: {
         data: ["11-5","11-6","11-7","11-8","11-9","11-10"]
     },
     yAxis: {},
     series: [{
         name: '时长',
         type: 'bar',
         data: [20, 40, 60, 80, 90, 100]
     }]
 };

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);


//  饼图
 // 基于准备好的dom，初始化echarts实例
 var myChartbing = echarts.init(document.getElementById('bing'));

 var optionbing = {
    title: {
        text: '运动分类',
        
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
                {value: 25, name: '跑步'},
                {value: 35, name: '骑行'},
                {value: 40, name: '训练'},
        
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

myChartbing.setOption(optionbing);




// 折线
var myChartbroken = echarts.init(document.getElementById('broken'));

var optionbroken ={
    xAxis: {
        type: 'category',
        data: ['11-5', '11-6', '11-7', '11-8', '11-9', '11-10', '11-11']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }]
}

myChartbroken.setOption(optionbroken);



// 跳转
let btn =document.querySelector('.btn');
    btn.addEventListener('click',function(ev){
        location.href ='./about.html'
    })