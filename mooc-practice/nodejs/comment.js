// 本段代码实现了用http.request完成评论的提交，也就是客户端直接刷评论
/
var http = require('http');
var querystring = require('querystring');

// 信息来自Network-XHR-document-Headers-From Data中
var postData = querystring.stringify({
	'content': '老师讲解得很好！',
	'cid': 8837 //就是课程的id
});

// 开始构建http中request中的参数,headers中为Request Headers中的内容
var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length, //【！！此处需要修改，因为服务器端会对这个做校验，如果不一致，这个请求可能会被拒绝】
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=29a514eb-421c-4a30-ab86-1b3b24a9fcde; 
		imooc_isnew_ct=1450179530; 
		IMCDNS=0; loginstate=1; 
		apsid=IwZGU3ZWM2MThkOGExNmU0MDk1NGE4MGU0YzEyOGYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTg5MTU2MAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAA2NDgwNzYzMTNAcXEuY29tAAAAAAAAAAAAAAAAAAAAADUwYTVhOGMxZjJhND
		JmMmE1Zjg3YjY5ZDIyNzczYzQyi1jEVotYxFY%3DYz; last_login_username=648076313%40qq.com; 
		PHPSESSID=ftibgv3tvqdv2d7nqcrtb3uft5; jwplayer.qualityLabel=é«æ¸; jwplayer.volume=40; 
		Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1455708245,1456125210; 
		Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1456214138; cvde=56cab5181d5e1-130; 
		imooc_isnew=2',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'RA-Sid':
		'RA-Ver:3.0.7',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36
		X-Requested-With:XMLHttpRequest'
	}
	// headers:对于后台服务器来说，收到Request headers这些数据，做解析之后，判断你是登录的，
	// 且你是mooc网的真实用户，那你的评论就是合法的，就可以把它存起来。
	

// 个人理解：这边的request，是【客户端向服务器发送请求】，也就是模拟我们按了“提交评论”键之后，客户端做的操作
// res应该就是服务器对于请求的应答，就是应答给客户端
// 从本地发请求，而不是从页面，因而ajax不会做页面的同步
var req = http.request(options, function(res){
	console.log('Status: ' + res.statusCode);
	console.log('headers: ' + JSON.stringify(res.headers));

	// 接收数据的时候，node是以流的形式发送上来的，所以会触发一个ondata事件。
	// 所以可以为res的data事件注册一个回调函数，用来接收数据。
	res.on('data', function(chunk){
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	})

	res.on('end', function(){
		console.log('评论完毕');
	})
})

// 对于请求挂了或者有异常，则抛出error事件
req.on('error', function(e){
	console.log('Error: ' + e.message)
})

// 把要提交的数据写入到请求体，也就是客户端向服务器发送数据
req.write(postData);

// 手动调用end来表明已经完成了这个请求，即便是没有数据写入到请求体，也需要调用req.end
req.end();