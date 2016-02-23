//	本段代码抓取了imooc页面的具体课程信息，就是对html源码的一个信息提取
//	【注意1】each和forEach的区别，p26和p57对比
//	【注意2】find()中class的选取（一旦class有空格，则不能同时识别两个），p38

var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

var options = url;

// cheerio可以理解成一个 Node.js 版的 jquery
// 在cmd端安装cheerio，即npm install cheerio（注意要在npm的node_modules文件目录下安装）
function filterChapters(html) {
	var $ = cheerio.load(html); // 获取html

	var chapters = $('.chapter'); //由一个个章节组成的数组

	// [{
	// 	chapterTitle:'',
	// 	videos:[{
	// 		title:''
	// 	},{},{}...]		
	// },{},{}...]

	var courseData = []; // 最后整理完放入的数组，即【全局数组】

	chapters.each(function(item){ // 【注意】，chapters此时为一个【jQuery对象】，each是对其每一个遍历
		var chapter = $(this); // 提取每个章节
		var chapterTitle = chapter.find('strong').text(); // 提取章节标题
		var videos = chapter.find('.video').children('li'); 

		var chapterData = {
			chapterTitle: chapterTitle,
			videos: [] //本数组中为2级章节标题
		}; // chapterData为courseData的一个元素，即为1级章节标题

		videos.each(function(item){
			//【注意】原来此处的class名为.J-media-item studyvideo，其实是两个class。
			// 如果采用.find('.J-media-item studyvideo')，会导致无法取到这个元素。
			// 使得后续语句 var video.attr('href').split('video/')[1]会报错‘Cannot read property 'split' of undefined。’
			var video = $(this).find('.J-media-item'); // 拿到里面的a标签 
			var videoTitle = video.text();
			var id = video.attr('href').split('video/')[1]; // id值为href(/video/6687)中的一部分，用split分割符取到

			chapterData.videos.push({
				title: videoTitle,
				id: id
			}); // 把2级章节标题push入对应的1级章节的videos数组中
		});

		courseData.push(chapterData); // 把1级章节标题push入【全局数组】中
	});

	return courseData;
}

function printCourseInfo(courseData){
	courseData.forEach(function(item){ // 【注意】，courseData此时为一个【数组】，forEach是对数组每个元素的遍历
		var chapterTitle = item.chapterTitle;

		console.log(chapterTitle + '\n');
		item.videos.forEach(function(item){
			console.log('	[' + item.id + '] '+ item.title + '\n');		
		});
	});
}

http.get(options, function(res){
	var html = '';

	res.on('data', function(data){ //后面的一个data只是一个参数而已，此处获得的就是页面html的源码
		html += data;
	})

	res.on('end', function(){  //此处就不再是打印出源码，而是对源码做一个信息的过滤
		var courseData = filterChapters(html); 
		// 再将其打印出来
		printCourseInfo(courseData);
	});

}).on('error', function(){
	console.log('获取课程数据出错');
})