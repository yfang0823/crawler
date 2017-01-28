var ajax = function(method, path, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    r.setRequestHeader('Content-Type', 'application/json')
    // 注册响应函数
    r.onreadystatechange = function() {
        if(r.readyState === 4) {
            reseponseCallback(r)
        }
    }
    // 发送请求
    r.send(data)
}

const makeOption = function(data) {
    var years = data.years
    var counts = data.counts
    var option = {
        title: {
            text: '豆瓣电影top250年代数据统计'
        },
        tooltip: {},
        legend: {
            data:['电影部数']
        },
        xAxis: {
            data: years
        },
        yAxis: {},
        series: [{
            name: '电影部数',
            type: 'bar',
            data: counts
        }]
    };
    return option
}

const showChart = function(option) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

const loadData = function() {
    var path = '/data'
    ajax('get', path, '', function(r){
        var data = JSON.parse(r.response)
        var option = makeOption(data)
        showChart(option)
    })
}

loadData()
