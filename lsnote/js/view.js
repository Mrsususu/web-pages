$(function(){

	var NotebookView = {};

/*
*	如果为云端传来的数据，notebookData已经转换为jQuery对象，其格式为
*	{
*	    title: '',
*	    numberOfNote: 0,
*	    alive: false
*	}
*/
	NotebookView.render = function($notebook, notebookData){	
		var notebookTemplate = Handlebars.compile($('#notebook-template').html()); //使用Handlebars.compile方法将模板编译为函数，生成的执行函数接受context作为参数
		if($.isArray(notebookData)){
			// 如果是数组，则渲染所有元素
			var content = {
				notebooks: notebookData
			}
			
			if(notebookData){
				$notebook.html(notebookTemplate(content));
			}else{
				$notebook.html(notebookTemplate([]));
			}

		}else{
			// 不是数组，则在结尾添加一个节点
			console.log('Add new node');
			var newLi = $('#notebookNode-template').html();
			notebookTemplate = Handlebars.compile(newLi);
			if(notebookData.id){
				newLi = notebookTemplate(notebookData); //注意，此处获得的为DOM对象
				$(newLi).prependTo($notebook);
			}
			
		}


	};

	window.NotebookView = NotebookView;



})