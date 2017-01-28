const loadData = function() {
    var path = '豆瓣数据\\yearCount.txt'
    var file = fs.readFileSync(path, {encoding:"utf8"})
    var text = JSON.parse(file)
    return text
}

const parseData = function() {
    var text = loadData()
    var keys = Object.keys(text)
    var years = []
    var counts = []
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        years.push(key)
        var num = text[key]
        counts.push(num)
    }
    var data = {
        "years": years,
        "counts": counts,
    }
    return data
}

const makeOption = function() {
    var data = parseData()
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

const showChart = function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var option = makeOption()
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

showChart()
