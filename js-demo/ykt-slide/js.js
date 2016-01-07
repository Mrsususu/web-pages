
function $(id){
	return document.getElementById(id);
}

function getNum(str){
	if(!str) {
		return 0;
	} else {
		return parseInt(str.split('px')[0]);
	}		
}

function getElementsByClassName(element, names){
	if(document.getElementsByClassName){
		return element.getElementsByClassName(names);
	} else {
		var elements = element.getElementsByTagName('*');
		var resule = [];
		var flag;

		var names = names.split(' ');

		for(var i = 1; i < elements.length; i++){
			var element = elements[i];
			var classNameStr = ' ' + element.className + ' ';
			flag = true;
			if(var j = 1; j < names.length; j++){
				if(classNameStr.indexOf(' ' + names[j] + ' ') == -1){
					flag = false;
					break;
				}
			}
			if(flag){
				result.push(element);
			}
		}
		return result;
	}
}



var SPEED = 500;//图片切换速度：一张图长度为500步
var STEP = 10;//图片切换步长：每次距离为10步
var NUMBER = 6;//图片数量
var DURATION = 5000;//单张图片停留时间
var INTERVAL = 50;//进度条变化时间间隔
var PREV = 0;//上一张图片索引
var CURRENT = 0;//当前图片索引
var NEXT = CURRENT + 1;//下一张图片的索引

function animation(ele, from, to, callback){
	var intervalId;
	var distance = Math.abs(to - from);
	var symbol = (to - from)/distance;
	var stepLength = Math.floor((distance*STEP)/SPEED);
	var cover = 0;

	var step = function(){
		var des = cover + stepLength;
		if(des < distance){
			cover += stepLength;
			ele.style.left = getNum(ele.style.left) + stepLength*symbol + 'px';
		} else {
			intervalId = clearInterval(intervalId); //如果正常取消，则clearInterval的返回值为undefined
			ele.style.left = to + 'px';
			if(callback)
				callback();
		}		
	}
	if(!!intervalId){ 
	//将intervalId类型转换为Boolean，undefined的布尔型为false。
	//此处作用为，一旦前面已经执行过了setInterval，则清除这个setInterval。如果前面没有执行过setInterval，则该循环不会进入。
		intervalId = clearInterval(intervalId);
	}
	intervalId = setInterval(step, STEP);
}

window.onload = function(){
	var imgwrap = $('imgwrap');
	var imgs = imgwrap.children;
	var navswrap = $('navswrap');
	var navs = navswrap.children;
//图片轮播
	var slide = function(drtn, intrvl, callback){
		var from = -PREV*1224;
		var to = -CURRENT*1224;
		animation(imgwrap, from, to, callback);
	}
//切换（进度条动画+图片位移动画）
	
//点击响应


}