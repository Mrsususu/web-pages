
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

function serialize (data) {  // 设置参数序列化
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
                callback(xhr.responseText); //反馈的就是API返回的值
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
    var oSpan = ologin.getElementsByTagName('span');
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

    oSpan[1].onclick = function() {  //弹窗的x点击后关闭登录框
        oPopuplog[0].style.display = 'none';
    };

    oButton[0].onclick = function() { //点击submit提交表单
        var userName1 = hex_md5(oInput[1].value);
        var password1 = hex_md5(oInput[2].value);
        get('http://study.163.com/webDev/login.htm', {userName:userName1,password:password1}, function(a){
            if( a === '1'){  //用户名验证通过
                oPopuplog[0].style.display = 'none'; //登陆框消失
                setCookie('loginSuc', '1', 36500);
                get('http://study.163.com/webDev/attention.htm', '', function(b){ //调用关注API
                    if( b === '1'){ //关注已成功
                        setCookie('followSuc', '1', 36500);
                        oAttentioin.className = 'active';
                        oAttentioin.value = '已关注';
                        oAttentioin.disabled = false;
                        oCancel[0].style.display = 'block'; 
                    }
                });
            } else {
                alert('帐号密码错误，请重新输入');
            }
        });
    }

    oAttentioin.onclick = function() { //点击“关注”，判断登录的 cookie 是否已设置
        if (!getCookie('loginSuc')){ // 登陆cookie未设置，表明未登陆，则跳出登录框
            oPopuplog[0].style.display = 'block';
        } else {  // 登陆cookie已设置，表明已登陆，则修改样式为已关注active的样式
            oAttentioin.className = 'active';
            oAttentioin.value = '已关注';
            oAttentioin.disabled = false; //disabled 属性规定应该禁用 input 元素，此时“已关注”按钮不能再做其他操作
            oCancel[0].style.display = 'block'; //取消键显示
        }
    };

    oCancel[0].onclick = function() { //取消关注
        removeCookie('followSuc');
        removeCookie('loginSuc');
        oAttentioin.className = 'attention';
        oAttentioin.value = '关注';
        oAttentioin.disabled = true;
        this.style.display = 'none';
    };
}
login();

function palyvideo() {  //弹出视频层
    var oList1 = $('j-list1');
    var oTrigger = getElementsByClassName(oList1,'trigger');
    var oPopupvideo = getElementsByClassName(oList1,'popupvideo');
    var oClose = getElementsByClassName(oList1,'close');
    var myVideo = oList1.getElementsByTagName('video');
    oTrigger[0].onclick = function() {
        oPopupvideo[0].style.display = 'block';
    }
    oClose[0].onclick = function() {
        oPopupvideo[0].style.display = 'none';
        myVideo[0].pause();  //关闭视频/暂停当前视频
    }
}
palyvideo();//需求七