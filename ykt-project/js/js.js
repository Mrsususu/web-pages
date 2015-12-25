
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
popup(); //需求一

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

function serialize (data) {  // 设置参数
    if (!data) return '';
    var pairs = [];
    for (var name in data){
        if (!data.hasOwnProperty(name)) continue;
        if (typeof data[name] === 'function') continue;
        var value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');
}
 
function get(url,options,callback) {  //get方法
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                callback(xhr.responseText);
            } else {
                alert ( 'request failed : ' + xhr.status);
            }
        }
    };
    xhr.open('get', url + '?' + serialize(options), true);
    xhr.send(null);
}

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


function login() {
    var ologin = $('j-login');
    var oAttentioin = $('j-input');
    var oPopuplog = getElementsByClassName(ologin,'popuplog');
    var oClose = getElementsByClassName(ologin,'close');
    var oInput = ologin.getElementsByTagName('input');
    var oLabel = ologin.getElementsByTagName('label');
    var oButton = getElementsByClassName(ologin,'submit');
    var oCancel = getElementsByClassName(ologin,'cancel');

    function focus(i) {  //弹窗输入时，提示文字隐藏
        oInput[i+1].onfocus = function() {
            oLabel[i].style.display = 'none';
        }
        oInput[i+1].onblur = function() {
            if( this.value ===''){
                oLabel[i].style.display = 'block';
            }
        }
    }
    focus(0);
    focus(1);

    oAttentioin.onclick = function() {
        if (!getCookie('loginSuc')){
            oPopuplog[0].style.display = 'block';
            setCookie( 'followSuc', true, 36500 );
        }
    }
}

login();