
/* 
	【nodejs本质上是一个js的执行环境】
	【nodejs中每一个js文件都可以看作为一个独立的模块，在其里面不需要有命名空间，不用担心变量污染和方法定义时的隔离，整个文件的代码可以非常自然地组织起来。可以组合成更强大的模块。】
	【npm管理工具可以向项目里引入各种各样的模块，而且每个模块都是独立且完整的。】
	【nodejs中，文件和模块一一对应。可以通过文件路径或者模块名称来引用模块。】


	在web对应的服务器端口就能接收到响应的信息。即此处在浏览器输入：127.0.0.1:1337即可得到hello world的字样。
	该段代码的职责是创建web服务器，即处理http相关的任务。
	通过createServer用于创建服务器，同时用listen在指定端口监听请求，服务器就完成了，就可以收到任何来自端口的请求、
	function为调用了一个回调函数，传入两个参数req和res，即分别为请求体（用于获取和这次请求相关的信息，比如URL，post/get）和响应体（告诉服务器给这个请求响应的内容，不然请求九一直处于挂起的状态）。
	**每次需要启动服务器才能开始，即在cmd下调整到服务器的js代码目录处，然后运行node XX.js启动服务器。每次修改代码后，需要在cmd处用ctrl+c中断服务器，然后重新执行node XX.js启动服务器。
	*
*/

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
}).listen(1337, '127.0.0.1'); 
  console.log('Server running at http://127.0.0.1:1337/');