/**
 * Created by Administrator on 2017/2/14.
 */
var INITQUESTION=false;//初始化时是否有固定问题
var __buserid = (new Date()).valueOf();//实际开发是是用户的唯一标识
var __publicData=[];//存放每次请求回来的数据
var __userType;//用户类型,根据用户类型显示不同的反馈按钮
var __QuestionAnswer=[];//机器人学习时，像后端提交的问题和答案
var __questionNum=0;//提交问题的个数
 var offsetT,thisDom,keyshow=0;//处理键盘事件
  var __dailog="";//是否是对话场景 ai系统
 var __dailogid="";// 场景对话id  本系统
 var __visibleRange=[];//返回文档的可见范围
//欢迎语
function sayhello() {
    var $li = $('<li class="left-item"> <img src="'+__robotPhotoUrl+'" alt=""  onclick="goRobotDetail()"/> <div class="chat-item-text ">'+__robotHelloText+'</div> </li>');
    $('#chat-thread').append($li);
    var top = $('#convo').height()
    $('#content').animate({
        scrollTop: top
    }, 500);
}
//进入页面初始化
function init() {
	if(INITQUESTION){
    	initQuestion();
    }
    sayhello();
};
//创建初始问题
function initQuestion(){
	//请求初始问题列表
	  $.ajax({
		type : "get",
		dataType : "json",
		//url2 : "http://172.27.35.3:8080/solr/mycore1/select",
		url : KBCONFIG.MKBURL + "/mkb/s",
		data : {
			indent : "on",
			//q : !text ? "*:*" : text,
			wt : "json",
            deviceType: "mobile",
            bot: "true",
            apiKey:__robotApiKey,
			tenantid:"um8002",
            buserid: __buserid
		},
		success : function(data) {
		  //doT渲染问题
		},
		error : function(res) {
			var evalText = doT.template($("#initQuestion1").text());
				//console.log(evalText);
				$("#initQuestionList").html(evalText(initData_demo));
    			return;
			 layer.open({
		            content: res,
		            skin: 'msg',
		            time: 1 //1秒后自动关闭
		        });
		}
	});
}
//创建用户问题
function createUserTalk(text) {
   var headerPath = "../../img/icon.png"
    var $li = $('<li class="right-item"> <img src="' + headerPath + '" alt=""/> <div class="chat-item-text">' + text + '</div> </li>');
    $('#chat-thread').append($li);
    var top = $('#convo').height();
    $('#content').animate({
        scrollTop: top
    }, 100);
}
//调用数据请求接口
function getRobotResponse(text,visibleRange,descriptId) {
    var $li = $('<li class="left-item"> <img src="'+__robotPhotoUrl+'" alt="" /> <div class="chat-item-text">正在输入...</div> </li>')
    $('#chat-thread').append($li);
    var top = $('#convo').height();
    $('#content').animate({
        scrollTop: top
    }, 300);
    if(descriptId){
    	/* $li.addClass('multiSelect-response').find('.chat-item-text').remove();
    	 for(var i=0;i<__publicData.length;i++){
    	 	if(__publicData[i].id==descript){
    	 	 var	$descript=$('<div class="chat-item-text"><div class="multiSelect-header">'+__publicData[i].descript+'</div></div><div  class="evaluate tc"><p class="tc">以上回答您觉得是否有用?</p><p class="tc mt10"><span class="valuable " onclick="valuableFeedback()">有用</span><span class="useless  ml20" onclick="uselessFeedback()">无用</span> </p></div>');
	    	 	 $li.append($descript);
			    var top = $('#convo').height()
			    $('#content').animate({
			        scrollTop: top
			    }, 100);
			    return;
    	 	}
    	 }*/
    	for(var i=0;i<__publicData.length;i++){
    	 	if(__publicData[i].id==descriptId){
    	 	  var descriptData={
    	 	  	response: {botResponse:{text:__publicData[i].descript,id:descriptId}},
    	 	  	responseHeader:{param:{q:text,qid:descriptId}}
    	 	  };
    			commonRenderRobot2(descriptData, $("#multiSelectTmpl"), $li,text);
			    return;
    	 	}
    	 }
    }
	var reqData = {
		//indent : "on",
		q : !text ? "*:*" : text,
		//wt : "json",
		//deviceType: "mobile",
		//bot: "true",
		apiKey:__robotApiKey,
		isObserver: false,
		tag:__visibleRange,
		//dailog:__dailog,
		dailogid:__dailogid,
		//tenantid:"um8002",
		buserid: __buserid
	};
	$.ajaxSettings.traditional=true;
    $.ajax({
		type : "post",
		dataType : "json",
		url : KBCONFIG.MKBURL + "/mkb/s",
		data : reqData,
		success : function(data) {
		  //获取用户类型
		  __userType="customer";
		  
		  if(data.response.botResponse.ktype=="scene"){
			  var scene = data.response.botResponse.scene;
			  if(scene.status=="2"){
				  if(scene.scene == "8c3f8e60846f40c98a1fd96369093e8c"){
					  //找人
					  data.response.botResponse.text = "已经帮您找到<" + scene.data.name + ">这个人。";
				  }else if(scene.scene == "c4f9a37a2d4e4f25808c879d47d6aa87"){
					  //找服务
					  data.response.botResponse.text = "已经帮您找到<" + scene.data.name + ">这个服务。";
				  }else if(scene.scene == "0ced0a05389e4049b9b440609595d423"){
					  //打电话
					  data.response.botResponse.text = "正在给<" + scene.data.name + ">打电话。";
				  }else{
					  
				  }
			  }
		  }
		  
		  
		  //把数据存到一个数组里面
			__publicData=__publicData.concat(data.response.docs) ;
			__dailog=data.response.botResponse.dailog;
			__dailogid = data.response.botResponse.dailogid;
			commonRenderRobot(data, $("#multiSelectTmpl"), $li,text);

		},
		error : function(res) {
			 __userType="customer";
			var data = data_demo_err;

			commonRenderRobot(data, $("#multiSelectTmpl"), $li,text);
		}
	});
}
//通用的渲染方法
function commonRenderRobot(data, ele, $li,question) {
    $li.addClass('multiSelect-response').find('.chat-item-text').remove();

    var text = doT.template(ele.text());
    $li.append(text(data));
    //普通用户不显示跳转到机器人学习界面按钮
    if( __userType=="customer"){
    	$("._checkButton").css("display","none");
    }
    var top = $('#convo').height()
    $('#content').animate({
        scrollTop: top
    }, 100);
}
//点击链接中的渲染方法
function commonRenderRobot2(data, ele, $li,title) {
    $li.addClass('multiSelect-response').find('.chat-item-text').remove();
    var text = doT.template(ele.text());
    $li.append(text(data));
     $li.find('.chat-item-text').prepend('<div class="questionTitle">'+title+'</div> ');
     //普通用户不显示跳转到机器人学习界面按钮
    if( __userType=="customer"){
    	$("._checkButton").css("display","none");
    }
    var top = $('#convo').height()
    $('#content').animate({
        scrollTop: top
    }, 100);
}
//点击回答中的链接
function clickResponseUrl(obj,title,descriptId) {
  // console.log(url);
   console.log(title);
    var url = $(obj).attr("data-url");
   if(url==null || url=="" || url=="undefined"){
        getRobotResponse(title,__visibleRange,descriptId);
   }else{
	    if($summer.os=="pc"){
		      window.open(url);
      }else{
		      summer.openWin({
			        id:"indexNew",
			        url:"html/robot/index.html",
			        pageParam:{
				          title:title,
				          url:url,
				          id:descriptId
			        }
	        });
	     }
   }
}
$(function () {

    //切换输入和语音方式
    $('.change-input-type').on('click', function () {
        var flag = $(this).attr('data-flag');
        if (flag == 'speech') {
            $(this).attr('src', '../../img/keyborder.png').attr('data-flag', 'keyborder');
            $('.show-input').addClass('none');
            $('.show-speech').removeClass('none');
        } else if (flag == 'keyborder') {
            $(this).attr('src', '../../img/speech.png').attr('data-flag', 'speech');
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
    $("#clickSay").on('touchstart',function(){
    	$('.show-speech').css("background-color",'#edeeee');
    	$('#clickSay').html("松开结束");
    	console.log('按压开始了');
    });
     $("#clickSay").on('touchend',function(){
    	console.log('按压结束了');
    	$('.show-speech').css("background-color",'#fff');
    	$('#clickSay').html("按住说话");
    });
    //监控键盘enter
     document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
             if(e && e.keyCode==13){ // enter 键
                   var chatText =$('.chat-input').val();
				    sendOut(chatText);
            }
      };

	  var codeall=String(location.search);
    //初始化内容
    init();
	//判断url内有没有参数
	if(codeall==""){
		return;
	}else{
		var questionInit= getParameter("question",codeall);
		__visibleRange.push(getParameter("tag",codeall));
		if(questionInit==""){

			return;
		}else{
		 questionInit=decodeURI(questionInit);
		//alert(questionInit);
		 createUserTalk(questionInit);
	    getRobotResponse(questionInit,__visibleRange);
		}

	}

});
function addKey(args){

 	//var offsetT=$(this).offset().top;
 	//var contentScroll=$(thisDom).parents(".um-footer").siblings("#content").scrollTop();
 	if(args.status=="show"){
 		keyshow=1;
		var top = $('#convo').height()

 	 	setTimeout(function(){
					$('#content').animate({
						scrollTop: top
					}, 100);
				},100);
 	}else{
 		keyshow=0;
 	}
 }
summerready = function () {

//不用初始化
  /*  if ($summer.os == "ios") {
        //初始化语音
        summer.callService("SpeechService.init", {"appid": "58ec8b49"}, false);
    } else {
        summer.callService("SpeechService.init", {"appid": "58eb438d"}, false);
    } */

};
//解析url
function getParameter(param,query){

    var iLen = param.length;
    var iStart = query.indexOf(param);
    if (iStart == -1){return 0;}
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart);
    if (iEnd == -1){
    　return query.substring(iStart);
    }else{
      return query.substring(iStart, iEnd);
    }
  }
  function succussCallback(args){
	   var keyword = args.result;
			 createUserTalk(keyword);
			getRobotResponse(keyword,__visibleRange);

  };

//调用讯飞语音通话功能
function speechToString() {
    $('.show-speech').addClass('active');
    //检查网络
    console.log(summer.netAvailable());
    //pc端不用检查网络
   /* if (!summer.netAvailable()) {
        layer.open({
            content: '未检测到您的网络，请连接网络！',
            skin: 'msg',
            time: 1 //1秒后自动关闭
        });
        return false;
    }*/
    cordova.require("cordova-plugin-ifly-speech.Speech").open({},function(args){
				 var keyword = args.result;
				 if(keyword.indexOf("错误码:")!=-1){
					  layer.open({
						content: "小智没听清您说的话，请您再说一遍",
						skin: 'msg',
						time: 2//1秒后自动关闭
					});
					$('.show-speech').removeClass('active');

				 }else{

					createUserTalk(keyword);
						getRobotResponse(keyword,__visibleRange);
						 $('.show-speech').removeClass('active');

				 }



			},function(reason){
				if(reason==null){
					 layer.open({
						content: "小智没听清您说的话，请您再说一遍",
						skin: 'msg',
						time: 2//1秒后自动关闭
					});
					$('.show-speech').removeClass('active');

				}else{
					 layer.open({
						content: reason,
						skin: 'msg',
						time: 1 //1秒后自动关闭
					});
					$('.show-speech').removeClass('active');
				}
			});

}
//想后端发送数据函数
function sendOut(dataval) {
    var chatText = dataval;
    if (chatText == '') {
    	layer.open({
            content: '请输入您的问题',
            skin: 'msg',
            time: 1 //1秒后自动关闭
        });
        return;
    } else {
        createUserTalk(chatText);
        $('.chat-input').val('');
        getRobotResponse(chatText,__visibleRange);
    }
}

//查看更多显示
function showAll(event){
	$(event.currentTarget).addClass('none');
	$(event.currentTarget).siblings('.closeMore').removeClass('none');
	$(event.currentTarget).siblings('.fiveMore').slideDown();
}
//查看更多显示
function closeAll(event){
	$(event.currentTarget).siblings('.seeMore').removeClass('none');
	$(event.currentTarget).siblings('.fiveMore').slideUp();
	$(event.currentTarget).addClass('none');
}
/*有用无用反馈*/
function valuableFeedback(event){
	var curTarget=$(event.currentTarget);
	var questionId=$(event.currentTarget).parents(".evaluate").attr("data-tar");
	curTarget.toggleClass("active");
	if(curTarget.hasClass("active")){
		curTarget.siblings(".feedBack").removeClass("active");
		   $.ajax({
		        url:KBCONFIG.MKBURL + "/mkb/QAFeedback",
		        type:'post',
		        dataType:'json',
		        data:{
		        	"apiKey" : __robotApiKey,
		        	id:questionId,
		        	"score" : 1
		        },
		        success:function(data){
		            //alert("成功:\n"+JSON.stringify(data));
		           // curTarget.parents(".evaluate").html("感谢您的反馈！");

		        },
		        error:function(data){
		        	//alert("请求失败:\n"+JSON.stringify(data));
		        }

		    });
	}
}
function uselessFeedback(event){
	var curTarget=$(event.currentTarget);
	var questionId=$(event.currentTarget).parents(".evaluate").attr("data-tar");
	curTarget.toggleClass("active");
	if(curTarget.hasClass("active")){
		curTarget.siblings(".feedBack").removeClass("active");
		   $.ajax({
		        url:KBCONFIG.MKBURL + "/mkb/QAFeedback",
		        type:'post',
		        dataType:'json',
		        data:{
		        	"apiKey" : __robotApiKey,
		        	id:questionId,
		        	"score" : 0
		        },
		        success:function(data){
		           // alert("成功:\n"+JSON.stringify(data));
		           // curTarget.parents(".evaluate").html("感谢您的反馈！");

		        },
		        error:function(data){
		        	//alert("请求失败:\n"+JSON.stringify(data));
		        }

		    });
	}
}
//修改编辑页面
function reviseQuestion(event){
	/**/var answerQ=$(event.currentTarget).parents(".evaluate").siblings('.multiSelect-header-title').html();
	 var questionA=$(event.currentTarget).parents(".evaluate").attr("data-tar");
	 $(".onlyanswer").find('textarea').val(answerQ);
	  $(".allQuestion").find('input.AfirstOne').val(questionA);
	UM.page.changePage({
		target:"#exercise",
		isReverse: 0,
    	transition: "um"
	});

};
function addQuestion(){
	__questionNum++;
	var $question= $('<div class="  mb10 addItem questionList"><div class="">相似问法'+__questionNum+':</div><div class=""><input type="text" class="form-control tl" placeholder="请输入新的问法"></div></div>')
	$('.allQuestion').append($question);
	 var top = $('#_article').height()
	    $('#content2').animate({
	        scrollTop: top
	    }, 100);
}
function submitData(){
      var questionData=[];
	$(".allQuestion .questionList").each(function(){
		questionData.push($(this).find('input.form-control').val());
	});
	for(var i = 0 ;i<questionData.length;i++)
	 {
         if(questionData[i] == "" || typeof(questionData[i]) == "undefined")
         {
                  questionData.splice(i,1);
                  i= i-1;
         }

	 }
	var _answerData=$('.onlyanswer').find('textarea').val();
	var __allData={
		question:questionData,
		answer:_answerData
	};
	console.log(__allData);
	//alert("您提交的答案和问题是："+JSON.stringify(__allData));
	//_removeData();
	//UM.page.back();
	layer.open({
            content: '提交成功！',
            skin: 'msg',
            time: 1 //1秒后自动关闭
        });

}
function _removeData(){
	$("#content2").find('div.addItem').remove();
	$("input.AfirstOne").val('');
	$("input.QfirstOne").val('');
	__questionNum=0;
}
