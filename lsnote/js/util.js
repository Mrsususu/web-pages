$(function(){

	var util = {};

	// 将从learnCloud得到的notebook对象拷贝成我们需要的对象
	util.cloneNotebook = function(fromObj, toObj){
		toObj = toObj || {};
		toObj.id = fromObj.id;
        toObj.title = fromObj.attributes.title;
        toObj.numberOfNote = parseInt(fromObj.attributes.numberOfNote);
        toObj.alive = fromObj.attributes.alive;
		return toObj;

	}

	window.util = util;

})