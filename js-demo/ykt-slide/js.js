
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

/*
function getElementsByClassName(element, names){
	if(document.getElementsByClassName){
		return element.getElementsByClassName(names);
	} else {
		var elements = element.getElementsByTagName('*');
		var resule = [];
		var flag, classNameStr, element;

		names = names.split(' ');

		for(var i = 0; i < elements.length; i++){
			element = elements[i];
			classNameStr = ' ' + element.className + ' ';
			flag = true;
			if(var j = 0; j < names.length ; j++){
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
*/
function getElementsByClassName(element, names) {  //获取class元素
    if (element.getElementsByClassName){
        return element.getElementsByClassName(names);
    } else {
        var elements = element.getElementsByTagName('*');
        var result=[];
        var element,
            classNameStr,
            flag,
            name;

        names = names.split(' ');
        for( var i = 0; element = elements[i]; i++) {
            classNameStr = ' ' + element.className + ' ';
            flag = true;
            for( var j = 0; name = names[j]; j++) {
                if(classNameStr.indexOf(' ' + name + ' ') == -1){
                    flag == false;
                    break;
                }
            }
            if(flag) {
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
			/*if(callback)
				callback();*/
		}		
	}
	if(!!intervalId){ 
	//将intervalId类型转换为Boolean，undefined的布尔型为false。
	//此处作用为，一旦前面已经执行过了setInterval，则清除这个setInterval。如果前面没有执行过setInterval，则该循环不会进入。
		intervalId = clearInterval(intervalId);
	}
	intervalId = setInterval(step, STEP);
}

function process(ele, drtn, intrvl, callback) {
	var intervalId;
	var width = ele.clientWidth;
	var prcss = getElementsByClassName(ele, 'prcss')[0];
	var offset = Math.floor(width * intrvl / drtn);
	var tmpCurrent = CURRENT;
	var step = function(){
		/* 还要考虑一种情况，就是一旦在prcss进度条前进过程中，CURRENT发生突变，则当前prcss进度条需要清空 */
		if( tmpCurrent != CURRENT ){
			intervalId = clearInterval(intervalId);
			prcss.style.width = '0px';
			return;  /*注意此环境下要立刻return*/
		}
		var des = prcss.style.width + offset;
		if(des < width){
			prcss.style.width = getNum(prcss.style.width) + offset + 'px';
		} else {
			intervalId = clearInterval(intervalId);
			prcss.style.width = '0px';
			PREV = CURRENT;
			CURRENT = NEXT;
			NEXT++;
			NEXT = NEXT % NUMBER;
			if(callback){
				callback();
			}
		}
	}
    if (!!intervalId){
    	intervalId = clearInterval(intervalId);
    }
    intervalId = setInterval(step, intrvl);
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
	var goOn = function(drtn, intrvl){
		var currentNav = navs[CURRENT];
		var prcsswrap = getElementsByClassName(currentNav, 'prcsswrap')[0];
		process(prcsswrap, drtn, intrvl, function(){
			slide(drtn, intrvl, function(){
				goOn(drtn, intrvl);
			});
		});
	}

//点击响应
	$('navswrap').addEventListener('click', function(){
		var getElement = function(eve, fliter){
			var element = eve.target;
			while(element){
				if(fliter(element))
					return element;
				element = element.parentNode;
			}
		};

		return function (event) {
			var des = getElement(event, function (ele){
				return (ele.className.indexOf('navwrap') != -1);
			});
			var index = parseInt(des.dataset.index);
			PREV = CURRENT;
			CURRENT = index;
			NEXT = (CURRENT + 1) % NUMBER;
			slide(DURATION, INTERVAL, function(){
				goOn(DURATION, INTERVAL);
			});	
		}	
	});
//自动播放部分	
	goOn(DURATION, INTERVAL);
};

