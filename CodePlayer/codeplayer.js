/*用到的新方法：toggleClass(),toggle(),filter(),contents(),val()*/
/*val() 方法返回或设置被选元素的值。大多用于input，为input中的value的值*/ /*注意比较jquery中html()、text()、val()的区别*/
/*filter()为在匹配结果集中查找符合第二个选择器的元素*/
/*contentWindow属性是指指定的frame或者iframe所在的window对象*/
/*eval()函数可计算某个字符串，并执行其中的的 JavaScript 代码。但是不建议使用，因为安全风险很大（例子：http://www.tuicool.com/articles/BBVnQbq）*/

var windowHeight = $(window).height();
var menuBarHeight = $("#menuBar").height();
var codeContainerHeight = windowHeight - menuBarHeight - 1;/*1为menuBar的border*/

$(".codeContainer").height(codeContainerHeight + "px");

$(".toggles").click(function (){
	$(this).toggleClass("selected"); /*有该类名则去掉，没有则添加*/
	var activeDiv = $(this).html(); /*注意在前面id的命名上，因为后面会用到这个id的值*/
	$("#" + activeDiv + "Container").toggle(); /*该处点击会使得被点击的元素改变display状态，block的变为none，none的变为block*/

	var showingDivs = $(".codeContainer").filter(function() {
		return($(this).css("display")!="none");
	}).length;
	var width = 100 / showingDivs;
	$(".codeContainer").width(width + "%");

});  /*点击选择项后执行操作*/

$("#runButton").click( function() {
	$("iframe").contents().find("html").html("<style>"+$("#cssCode").val()+"</style>"+$("#htmlCode").val());
	document.getElementById("resultFrame").contentWindow.eval($("#jsCode").val());/*contentWindow为属性*/
});