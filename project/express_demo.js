// express_demo.js 文件

// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()

var todoList = []
const fs = require('fs')

// 配置静态文件目录
app.use(express.static('static'))

var sendHtml = function(path, response) {
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function(err, data){
        console.log(`读取的html文件 ${path} 内容是\n`, data)
        response.send(data)
    })
}
// 用 get 定义一个给用户访问的网址
// request 是浏览器发送的请求
// response 是我们要发给浏览器的响应
app.get('/', function(request, response) {
    // var r = `
    // `
    // fs 是 file system 文件系统的缩写
    // fs 是 node 中处理文件和目录的库
    // var fs = require('fs')
    // var options = {
    //     encoding: 'utf-8'
    // }
    // fs.readFile('index.html', options, function(err, data){
    //     console.log('读取的html文件内容是', data)
    //     response.send(data)
    // })
    var path = 'chartDisplay.html'
    sendHtml(path, response)
})

var makeTemplate = function(years, counts) {
    var y = JSON.stringify(years)
    var c = JSON.stringify(counts)
    var t = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>年份统计</title>
          <script src="http://cdn.bootcss.com/echarts/3.4.0/echarts.min.js"></script>
        </head>
        <body>
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div id="main" style="width: 600px;height:400px;"></div>
            <script type="text/javascript">
                 // 基于准备好的dom，初始化echarts实例
                 var myChart = echarts.init(document.getElementById('main'));

                 // 指定图表的配置项和数据
                 var option = {
                     title: {
                         text: '豆瓣电影top250年代分布'
                     },
                     tooltip: {},
                     legend: {
                         data:['电影部数']
                     },
                     xAxis: {
                         data: ${y}
                     },
                     yAxis: {},
                     series: [{
                         name: '电影部数',
                         type: 'bar',
                         data: ${c}
                     }]
                 };

                  myChart.setOption(option);
             </script>
        </body>
      </html>
    `
    return t
}


app.get('/chart', function(request, response) {
    var path = '豆瓣数据\\yearCount.txt'
    var file = fs.readFileSync(path, {encoding:"utf8"})
    var text = JSON.parse(file)
    var keys = Object.keys(text)
    var years = []
    var counts = []
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        years.push(key)
        var num = text[key]
        counts.push(num)
    }
    var t = makeTemplate(years, counts)
    response.send(t)
})

// 读取本地统计数据，返回给前端
app.get('/data', function(request, response) {
    var path = '豆瓣数据\\yearCount.txt'
    var file = fs.readFileSync(path, {encoding:"utf8"})
    var text = JSON.parse(file)
    var keys = Object.keys(text)
    var years = []
    var counts = []
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        years.push(key)
        var num = text[key]
        counts.push(num)
    }
    var r = {
        "years": years,
        "counts": counts,
    }
    r = JSON.stringify(r)
    response.send(r)
})

// listen 函数的第一个参数是我们要监听的端口
// 这个端口是要浏览器输入的
// 默认的端口是 80
// 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
// 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
