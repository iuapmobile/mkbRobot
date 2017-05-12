/**
 * Created by Administrator on 2017/2/14.
 */
function getChatHistory() {
    //用户聊天数据
    var chatData = {};
    var userinfo = summer.getStorage("userinfo");
    if(!userinfo) return;
    //人员id
    var staffID = userinfo.staffid;
    //租户id
    var tenantID = userinfo.tenantid;


    if (summer.getStorage(tenantID)) {
        if (summer.getStorage(tenantID)[staffID]) {
            return chatData = summer.getStorage(tenantID)[staffID];
        } else {
            return chatData;
        }
    } else {
        return chatData;
    }
}
//渲染聊天列表
function renderChatHistory() {
    var userChat = getChatHistory();
    console.log(userChat);
    if (userChat) {
        //用户头像如果有头像用头像地址，如果没有用姓名
        var _uinfo = summer.getStorage('userinfo')
        var headerPath = _uinfo.useravator ? _uinfo.useravator : {};
        if (typeof headerPath == 'object') {
            headerPath.content = _uinfo.username.slice(-2);
            headerPath.bgc = 'background-color:' + Common.getColor(_uinfo.username) + ";";
        }
        var chatHistoryData = {};
        chatHistoryData.headerPath = headerPath;
        chatHistoryData.data = userChat;
        var arrText = doT.template($("#chatHistoryTmpl").text());
        $("#chat-thread").html(arrText(chatHistoryData));
    }

}

//欢迎语
function sayhello() {
    var $li = $('<li class="left-item"> <img src="../../image/common/robotl.png" alt=""  onclick="goRobotDetail()"/> <div class="chat-item-text ">您好，我是HR小助手雪儿，有什么疑难问题都可以问我</div> </li>');
    $('#chat-thread').append($li);
    var top = $('#convo').height()
    $('#content').animate({
        scrollTop: top
    }, 500);
}
//转到机器人介绍界面
function goRobotDetail() {
    summer.openWin({
        id: 'robotDetail',
        url: 'html/app_robot/robotDetail.html',
        animation: {
            type: "movein",                //动画类型（详见动画类型常量）
            subType: "from_right",       //动画子类型（详见动画子类型常量）
            duration: 300
        }
    })
}
//进入页面初始化
function init() {


    renderChatHistory();
    sayhello();
};
//创建用户问题
function createUserTalk(text) {
	var _uinfo = summer.getStorage('userinfo');
    var headerPath = _uinfo.useravator ? _uinfo.useravator : {};
    if (typeof  headerPath == 'object') {
        headerPath.content = _uinfo.username.slice(-2);
        headerPath.bgc = Common.getColor(_uinfo.username);
        var $li = $('<li class="right-item"> <span class="img-name" style="background-color:' + headerPath.bgc + ';">' + headerPath.content + '</span><div class="chat-item-text">' + text + '</div> </li>');
    } else {
        var $li = $('<li class="right-item"> <img src="' + headerPath + '" alt=""/> <div class="chat-item-text">' + text + '</div> </li>');

    }
    $('#chat-thread').append($li);
    var top = $('#convo').height();
    $('#content').animate({
        scrollTop: top
    }, 100);
}
//本地存储用户问题
function storageUserTalk(text) {
    var userinfo = summer.getStorage("userinfo");
    //人员id
    var staffID = userinfo.staffid;
    //租户id
    var tenantID = userinfo.tenantid;

    var chatItem = {
        role: '1',//0是机器人，1是用户
        chat: {//文字类
            info: text
        }
    }
    if (summer.getStorage(tenantID)) {
        var tenantStorage = summer.getStorage(tenantID);
        if (tenantStorage[staffID]) {
            var chatData = tenantStorage[staffID];
            console.log(chatData);
            if (chatData.length == 50) {
                chatData.shift();
            }
            chatData.push(chatItem);
            tenantStorage[staffID] = chatData;
        } else {
            tenantStorage[staffID] = [chatItem]
        }
        summer.setStorage(tenantID, tenantStorage);
    } else {
        var tenantStorage = {};
        tenantStorage[staffID] = [chatItem];
        summer.setStorage(tenantID, tenantStorage);
    }


}

//调用数据请求接口
function getRobotResponse(text) {
    var $li = $('<li class="left-item"> <img src="../../image/common/robotl.png" alt="" onclick="goRobotDetail()"/> <div class="chat-item-text">正在输入...</div> </li>')
    $('#chat-thread').append($li);
    var top = $('#convo').height();
    $('#content').animate({
        scrollTop: top
    }, 300);
    ajaxRequest('/robot/ask', "get", "application/x-www-form-urlencoded", {
        info: text,
        msgtype: "text"
    }, function (data) {
        console.log(data);
        storageRobotResponse(data);
        renderRobotResponse(data, $li);
    })


}
//渲染机器人单条回答
function renderRobotResponse(data, $li) {
    if (data.code == 100000) {
        $li.find('.chat-item-text').html(formatText(data.text));
        var top = $('#convo').height()
        $('#content').animate({
            scrollTop: top
        }, 100);
    } else if (data.code == 110000) {
        commonRenderRobot(data, $("#multiSelectTmpl"), $li)

    } else if (data.code == 200000) {
        $li.addClass('img-response')
            .find('.chat-item-text').remove();
        $li.append($('<div class="chat-item-text" onclick="clickResponseUrl(\'' + data.url + '\')">' + data.text + '</div>'));
        var top = $('#convo').height()
        $('#content').animate({
            scrollTop: top
        }, 100);
    } else if (data.code == 302000) {
        commonRenderRobot(data, $("#newsTmpl"), $li);

    } else if (data.code == 308000) {
        commonRenderRobot(data, $("#menuTmpl"), $li);

    }
}
//通用的渲染方法
function commonRenderRobot(data, ele, $li) {
    $li.addClass('multiSelect-response')
        .find('.chat-item-text').remove();
    var text = doT.template(ele.text());
    $li.append(text(data));
    var top = $('#convo').height()
    $('#content').animate({
        scrollTop: top
    }, 100);
}
//本地保存机器人回答
function storageRobotResponse(data) {
    var userinfo = summer.getStorage("userinfo");
    //人员id
    var staffID = userinfo.staffid;
    //租户id
    var tenantID = userinfo.tenantid;
    var tenantStorage = summer.getStorage(tenantID);
    if (tenantStorage[staffID].length == 50) {
        tenantStorage[staffID].shift();
    }
    var robotChat = {
        role: '0',//0是机器人，1是用户
        chat: data
    }

    tenantStorage[staffID].push(robotChat);
    summer.setStorage(tenantID, tenantStorage);
}
//点击常用问题
function commonQuestion(text) {
    createUserTalk(text);
    storageUserTalk(text);
    getRobotResponse(text);
}
//点击回答中的链接
function clickResponseUrl(url) {
    var url = url.replace(/="" /g, '//');
    console.log(url);
    summer.openWin({
        id: 'responsePage',
        url: 'html/app_robot/responsePage.html',
        pageParam: {
            frameUrl: url
        }
    })
}
$(function () {
    //切换输入和语音方式
    $('.change-input-type').on('click', function () {
        var flag = $(this).attr('data-flag');
        if (flag == 'speech') {
            $(this).attr('src', '../../image/robot/keyborder.png').attr('data-flag', 'keyborder');
            $('.show-input').addClass('none');
            $('.show-speech').removeClass('none');
        } else if (flag == 'keyborder') {
            $(this).attr('src', '../../image/robot/speech.png').attr('data-flag', 'speech');
            $('.show-speech').addClass('none');
            $('.show-input').removeClass('none');
        }
    })

    $('.chat-input').on('focus', function () {
        $(this).css('color', '#343434');
    })
    //点击发送文字 
    $('.chat-send').on('click', function () {
        sendOut($('.chat-input').val());
    });

});
//hr反馈
function goFeedback() {
    summer.openWin({
        id: 'HRFeedback',
        url: 'html/app_robot/HRFeedback.html',
        animation: {
            type: "movein",                //动画类型（详见动画类型常量）
            subType: "from_right",       //动画子类型（详见动画子类型常量）
            duration: 300
        }
    })
}
summerready = function () {
    //初始化内容
    init();

	return;
    if ($summer.os == "ios") {
        //初始化语音
        summer.callService("SpeechService.init", {"appid": "54ff9af9"}, false);
    } else {
        summer.callService("SpeechService.init", {"appid": "58a105c0"}, false);
    }

};
//调用讯飞语音通话功能
function speechToString() {
    $('.show-speech').addClass('active');

    //检查网络
    if (!summer.netAvailable()) {
        jqAlert('未检测到您的网络，请连接网络！');
        return false;
    }

    summer.callService("SpeechService.openSpeechBackString", {
        "callback": "succussCallback()",
        "error": "errorCallback()"
    }, false);

}
function succussCallback(args) {

    var keyword = args.result;
    $('.show-speech').removeClass('active');

    createUserTalk(keyword);
    storageUserTalk(keyword);
    getRobotResponse(keyword);
}
function errorCallback(sender, args) {
    jqAlert(args)
}

//接受数据编码10000时，格式化内容
function formatText(str) {
    var urlPattern = new RegExp("(\\[([^\\]]+)\\]\\((http://[^\\)]+)\\))", "g");
    var appPattern = new RegExp("(\\[([^\\]]+)\\]\\((app://([^\\)]+))\\))", "g");
    var inputPattern = new RegExp("(\\[([^\\]]+)\\]\\(input\\))", "g");
    str = str.replaceAll('\\n', '<br/>');
    str = str.replace(/↵/g, "<br/>");
    str = str.replace(urlPattern, "<br/><a href='$3'>$2</a>");
    str = str.replace(appPattern, "<br/><a href='javacript:void(0);' onclick='openApp(\"$4\")'>$2</a>")
    str = str.replace(inputPattern, "<br/><a href='javacript:void(0);' onclick='sendOut(\"$2\")'>$2</a>")

    return str;
}

//多行文本的时候，更多显示或隐藏
function showmore(obj) {
    $(obj).siblings(".multiSelect-content-box").children(".newsindex_4").toggleClass("none");
    if ($(obj).siblings(".multiSelect-content-box").children(".newsindex_4").hasClass("none")) {
        $(obj).html("更多>>");
    } else {
        $(obj).html("隐藏<<");
    }
}

//想后端发送数据函数
function sendOut(dataval) {
    var chatText = dataval;
    if (chatText == '') {
        jqAlert('请输入您的问题！');
        return;
    } else {
        createUserTalk(chatText);
        storageUserTalk(chatText);
        $('.chat-input').val('').blur();
        // setTimeout(function () {
        getRobotResponse(chatText);
        // }, 500);

    }
}
/*字符串添加repalceAll方法*/
String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

function openApp(proveurl){
	//跳转到证书详情界面
	summer.openWin({
		id: 'appprove',
        url : 'html/app_prove/prove-module.html',
        pageParam : {
            
        }
    });
}