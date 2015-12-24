
function $ (id) {
    return document.getElementById(id);
}


function popup() {   //检查cookie,隐藏通知栏，并设置cookie,
    var oPopup = $('j-display');
    var oBtn = oPopup.getElementsByTagName('p')[1];
    if ( getCookie('Off')) {
        oPopup.style.display = 'none';
    }
    else{
    oBtn.onclick = function () {
        oPopup.style.display = 'none';
        setCookie('Off', true, 36500 );
        };
    }
}
popup();

function setCookie (key, value, t) {  //设置cookie
    var oDate = new Date();
    oDate.setDate( oDate.getDate() + t);
    document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

function getCookie (key) {  //获取cookie
    var arr1 = document.cookie.split('; ');
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if(arr2[0] === key ){
            return decodeURI(arr2[1]);
        }
    }
}

function removeCookie (key) {  //删除cookie
    setCookie( key, '', -1 );
}

function logein() {
    var ologin = $('j-login');
    var oAttentioin = $('j-input');

}


