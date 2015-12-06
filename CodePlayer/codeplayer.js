
var windowHeight = $(window).height();
var menuBarHeight = $("#menuBar").height();
var codeContainerHeight = windowHeight - menuBarHeight - 1;/*1为menuBar的border*/

$(".codeContainer").height(codeContainerHeight + "px");