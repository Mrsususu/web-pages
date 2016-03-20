
$(function(){

	AV.initialize("BM6JMdNSoaC0hU8Eou3kBKYx-gzGzoHsz","SmI8XawzrS0v2zmuBupynPoI");


	var windowHeight = $(window).height();

	$("#left").height(windowHeight + "px");
	$("#center").height(windowHeight + "px");

	/*================ global variate ================*/

    var MODALCODE = {
        duplicateNoteName: 1,
        removeNotebook: 2,
        removeNote: 3,
        previewEssay: 4
    };

    var modalCode = null;

    /*================ Controller ================*/

    // ====== 笔记本控制器，控制笔记本的行为 ======
    var NotebooksCtrl = {};

    NotebooksCtrl.init = function(){

    	NotebooksCtrl.$notebookArea = $('#notebooks');

    	// 初始化，把云端数据更新到笔记本页面
    	NotebooksCtrl.loadNotebooks(function(){
    		// 处理下载下来的笔记本
    		// 使其有更新第一个元素selected以及点击后点击元素selected的功能
    		NotebooksCtrl.set$Notebooks();
    		NotebooksCtrl.set$selectedNotebook();

    	});

    	//点击添加笔记本。失去焦点时，如果没有输入则隐藏输入框，有输入则保存
    	var $menuAddNotebook = $('.menuAddNotebook')
    	$('#left span.add').click(function(){
    		$menuAddNotebook.show().focus();
    	});

    	$menuAddNotebook.blur(menuAddNotebookBlur);

    	$menuAddNotebook.keyup(function (event){
    		if(event.keyCode == 13){
    			$menuAddNotebook.blur();
    		}
    	});

    	function menuAddNotebookBlur(event){ 
    		var $target = $(event.target);
    		if($target.val()){
    			NotebooksCtrl.addNotebook($target.val());
				$target.val('').hide();
    		}else{
    			$target.hide();
    		}
    	}

    	//点击删除笔记本，先弹出弹窗，然后再后续操作（弹窗内容此处设定）
    	$('#left span.delete').click(function(){
    		var message = {
    			title: '确定删除笔记本？',
    			content: '点击确定删除笔记本, 点击右上角的X取消删除'
    		}; 
    		modalCode = MODALCODE.removeNotebook;
    		ModalCtrl.show(message);

    	});
    	
    };

    // 在menu处输入标题，添加笔记本
    NotebooksCtrl.addNotebook = function(title){
    	var newNotebook = {
                title: title,
                numberOfNote: 0,
                alive: true
            };

        NotebookModel.add(newNotebook, addNotebookCallBack); //与NotebookModel交互。提交新增笔记本资料，返回了云端该新增笔记本数据

        function addNotebookCallBack(error, notebook){
        	if(error){
        		console.error('error');
        	}else{
        		//开始将笔记加入
        		console.log('Add notebook success...');
        		if(notebook.id){
        			NotebookView.render(NotebooksCtrl.$notebookArea, notebook);
        			NotebooksCtrl.set$Notebooks();
        			NotebooksCtrl.$notebooks.first().click();
        		}
        	}

        }
        

    };

    // 删除此时selected的笔记本
    NotebooksCtrl.removeNotebook = function(){
    	console.log('Remove notebook start...');
    	$notebooksDeleted = NotebooksCtrl.set$selectedNotebook();

    	//调用数据提交(NotebookModel交互)
    	$notebooksDeleted.each(function (index, item){
    		NotebookModel.remove($(item), removeNotebookCallBack);
    	});
    	
    	function removeNotebookCallBack(error, notebookObj){
    		if(error){
				console.error('error');
    		}else{
	    		// 直接将DOM点移除，注意selected会改变，所以需要重新调用
	    		$notebooksDeleted.remove();
	    		ModalCtrl.hide();
	    		NotebooksCtrl.set$Notebooks();
	    		NotebooksCtrl.set$selectedNotebook();    			
    		}

    	}

    };

    // 初始化时，从云端下载所有笔记本
    NotebooksCtrl.loadNotebooks = function(callback){
    	console.log('Load notebooks start...');

    	NotebookModel.loadAll(loadNotebooksCallback); //与NotebookModel交互。返回云端所有笔记本数据。

    	function loadNotebooksCallback(error, notebooks){
    		console.log('Load notebooks finish...');
    		if(error){
    			console.log('error');
    		}else{
    			NotebookView.render(NotebooksCtrl.$notebookArea, notebooks);
    		}
    		callback();
    	}
    };

    // 将所有的notebook元素选出来, 作为$notebooks, 并且为这些元素绑定点击事件
    NotebooksCtrl.set$Notebooks = function(){
    	NotebooksCtrl.$notebooks = NotebooksCtrl.$notebookArea.children();
    	if(NotebooksCtrl.$notebooks.length > 0){
    		NotebooksCtrl.$notebooks.unbind();
    		NotebooksCtrl.$notebooks.bind('click', NotebooksCtrl.clickNotebookEvent);
    	}
    }    

    // 将具有selected类的元素选出来，作为$selectedNotebook,如果没有则选择第一个(对第一个进行点击操作)
    NotebooksCtrl.set$selectedNotebook = function(){
    	NotebooksCtrl.$selectedNotebook = NotebooksCtrl.$notebookArea.children('li.selected');
    	if(NotebooksCtrl.$selectedNotebook.length == 0){
    		NotebooksCtrl.$notebooks.first().click();
    		NotebooksCtrl.$selectedNotebook = NotebooksCtrl.$notebookArea.children('li.selected');
    	}
    	return NotebooksCtrl.$selectedNotebook;
    	
    }

    // 单击notebook事件,选中当前notebook 
    NotebooksCtrl.clickNotebookEvent = function(event){
    	console.log('Click Notebook...');
    	event.preventDefault();
    	$target = $(this);
    	NotebooksCtrl.$notebooks.removeClass('selected');
    	$target.addClass('selected');

    }


    // ====== 目录控制器 ======
    var CatalogurCtrl = {};

    CatalogurCtrl.init = function(){

    	
    }

    // ====== model Controller 控制弹窗行为 ======
    
    var ModalCtrl = {};

    ModalCtrl.message = {};

    ModalCtrl.init = function(){
    	ModalCtrl.$modal = $('.modal-frame');
    	ModalCtrl.$title = $('.modal-title');
    	ModalCtrl.$content = $('.modal-content');
    	ModalCtrl.$close = $('.modal-close');
    	ModalCtrl.$confirm = $('.modal-btn');
    	
    };

    ModalCtrl.show = function(message){ //此处 this == ModalCtrl;
    	this.message = message;
	    switch (modalCode) {
            // case MODALCODE.duplicateNoteName:
            //     break;
            case MODALCODE.removeNotebook:
                this.$confirm.click(NotebooksCtrl.removeNotebook);
                break;
            // case MODALCODE.removeNote:
            //     this.$confirmBtn.click(EssayCtrl.removeEssay);
            //     break;
            // case MODALCODE.previewEssay:
            //     this.$modal.addClass('modal-preview');
            //     break;
        }
        this.$modal.show();
    	this.$title.html(this.message.title);
    	this.$content.html(this.message.content);

    	this.$close.click(function(){
    		ModalCtrl.$modal.hide();
    	});

    };

    ModalCtrl.hide = function(){
    	ModalCtrl.$modal.hide();
    }

    

    window.NotebooksCtrl = NotebooksCtrl;
    window.CatalogurCtrl = CatalogurCtrl;
    window.ModalCtrl = ModalCtrl;

    // ******************* 执行区域 ******************* \\
    NotebooksCtrl.init();
    CatalogurCtrl.init(); 
    ModalCtrl.init();

     

})

