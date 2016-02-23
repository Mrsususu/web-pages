//	本段代码抓取了imooc页面的所有html源码

var http = require('http');
var url = 'http://www.imooc.com/learn/348';

var options = url;

http.get(options, function(res){
	var html = '';

	res.on('data', function(data){ //后面的一个data只是一个参数而已，此处获得的就是页面html的源码
		html += data;
	})

	res.on('end', function(){
		console.log(html);
	});

}).on('error', function(){
	console.log('获取课程数据出错');
})