$(function(){

	/* 
	 * 从leancloud上加载内容
	 * Notebook: 是笔记本对象，有两个属性 title和numberOfNote
	 * 
	 */
	var Notebook = AV.Object.extend("Notebook");

	var NotebookModel = {};

	// 定义notebook对象, objectId是leancloud生成，作为笔记本的类名
	NotebookModel.notebook = {
        title: '',
        numberOfNote: 0,
        alive: false
    };

    NotebookModel.notebooks = [];

    // 下载云端所有当前笔记本数据
    NotebookModel.loadAll = function(callback){

    	var query = new AV.Query(Notebook);
    	query.equalTo('alive', true);
    	var notebookCollection = query.collection();

    	notebookCollection.fetch( //获取全部对象
    	{
    		success: function(collection){
    			collection.models.forEach(function (item){
    				var notebook = util.cloneNotebook(item);
    				NotebookModel.notebooks.unshift(notebook);
    			});

    			callback(false, NotebookModel.notebooks);
    		},
    		error: function(collection, error){
    			callback(error, null);
    		}

    	});

    };

    // 向云端添加当前笔记本内容
    NotebookModel.add = function(notebook, callback){
    	var notebookObj = new Notebook();
    	NotebookModel.checkNotebook(notebook);

    	notebookObj.save(notebook, //添加对象
            {
                success: function (notebook) {
                    var retNotebook = util.cloneNotebook(notebook);

                    NotebookModel.notebooks.push(retNotebook);
                    callback(null, retNotebook);
                },
                error: function (notebook, error) {
                    console.log(error);
                    callback(error, notebook);
                }
            });

    };

    // 检验传入的notebook对象的值，以免异常值的传入
    NotebookModel.checkNotebook = function(notebook){
    	notebook.title = notebook.title ||　"untitled";
    	notebook.alive = notebook.alive ||　true;
    	notebook.numberOfNote = notebook.numberOfNote || 0;
    };

    // 向云端删除当前笔记本内容
    NotebookModel.remove = function($notebook, callback){
    	console.log('remove called');
    	var query = new AV.Query(Notebook);
    	var id = $notebook.data('id'); // 注意，前面在<li>标签中data-id放置id，所以这边用.data('id')获取

    	query.get(id,  //搜索对象
    		{
    			success: function(notebookObj){
    				notebookObj.set('alive', false);
    				notebookObj.save();
    				callback(null, notebookObj);
    			},
    			error: function(notebookObj, error){
    				callback(error, notebookObj);
    			}
    		});
    }

	window.NotebookModel = NotebookModel;




})