var data_demo_err = {
	"responseHeader" : {
		"status" : 0,
		"QTime" : 75,
		"param" : {
			"qid" : "*1*",
			"indent" : "on",
			"wt" : "json"
		}
	},
	"response" : {
		"botResponse" : {
			"text" : "对不起，无法正常访问服务器，我也无能为力:(。请检查网络或者联系运维人员，谢谢！",
			"code" : 100000
		},
		"numFound" : 0,
		"start" : 0,
		"docs" : []
	}
};


var woxiang = {
	"responseHeader" : {
		"status" : 0,
		"QTime" : 75,
		"params" : {
			"q" : "*:*",
			"indent" : "on",
			"wt" : "json"
		}
	},
	"response" : {
		"numFound" : 6,
		"start" : 0,
		"docs" : [{
			"createTime" : "2015-05-12 10:27:02.0",
			"author" : "边传猛",
			"updateTime" : "2015-10-12 10:34:19.0",
			"id" : 1,
			"title" : "了解一下友云采？",
			"descript" : "成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制",
			"descriptImg" : "https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1131968136,69861094&fm=85&s=33578A7E1E76C5DC54972FA80200B00A",
			"url" : "http://udn.yyuap.com/doc/ae/1507337.html",
			"_version_" : 1567172666768490496
		}, {
			"createTime" : "2017-05-12 10:27:02.0",
			"updateTime" : "2017-05-12 10:34:19.0",
			"id" : 2,
			"title" : "了解一下友人才?",
			"descript" : "成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制成熟的消息收发确认机制",
			"url" : "http://udn.yyuap.com/forum.php?mod=viewthread&tid=30791",
			"_version_" : 1567172666820919296
		},  {
			"createTime" : "2017-05-12 11:38:27.0",
			"updateTime" : "2017-05-12 11:38:27.0",
			"id" : 6,
			"title" : "了解一下友报账?",
			"descript" : "1.1.     作业 调度： 如何并行 执行 ？1.2.     表输出：如何 自动创建表 ？1.3.     作业 调度 ：如何 设置转换无效 ？",
			"url" : "http://udn.yyuap.com/doc/ae/919180.html",
			"_version_" : 1567172666832453632
		}],
		botResponse:{
			"code":"1000000",
			"text":"你想了解一下用友的一些云产品吧？"
		}
	}
};
SelfProcesserData = {
	  "我想"　: woxiang
}
debugger;
var SelfProcesser = {};
SelfProcesser.process = function(text){
	if(text.indexOf("我想")==0){
		return SelfProcesserData["我想"]
	}
}