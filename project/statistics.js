"use strict"

const fs = require('fs')

const log = function() {
    console.log.apply(console, arguments)
}

// 解析生成的数据，统计年份，类别信息
var parseResult = function() {
    const path = '豆瓣数据\\Movie.txt'
    var file = fs.readFileSync(path, {encoding:"utf8"})
    file = file.split('\n][').join(',')
    var text = JSON.parse(file)
    var count = {}
    for (var i = 0; i < text.length; i++) {
        var year = text[i].year
        if(count[year] == undefined) {
            count[year] = 1
        }else {
            count[year]++
        }
    }
    log('count', count)
    var p = '豆瓣数据\\yearCount.txt'
    var s = JSON.stringify(count, null, 2)
    fs.writeFileSync(p, s)
}

parseResult()
