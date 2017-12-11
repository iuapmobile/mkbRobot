summerready = function() {
	JudgeEnvironment();
	//显示当前运行环境，不涉及业务逻辑
	pwdShow();
	//切换密码明文
	show();
	//注册用户名
	cancelInput();

	total();
};
//判断环境 如果是测试环境 ，显示版本为预发布版本   正式环境 不操作
function JudgeEnvironment() {
	switch(environment) {
	case 1:
		//内网测试环境:1
		$(".env").html("内网测试环境");
		break;
	case 2:
		//92环境:2
		$(".env").html("92环境");
		break;
	case 3:
		//123环境:3
		$(".env").html("123环境");
		break;
	case 4:
		//预发布环境:4
		$(".env").html("预发布环境");
		break;
	case 5:
		//B环境：5
		$(".env").html("B环境");
		break;
	case 6:
		//正式环境：6
		$(".env").html("");
		break;
	}
}

//js 实时监听input中值变化：改变登陆按钮的颜色样式即可;
function show() {
	$("#user").on("input propertychange focus", total);
	$("#pwd").on("input propertychange focus", total);
}

function total() {
	$(this).parents(".input-row").addClass("border").siblings().removeClass("border");
	if ($('#user').val() && $('#pwd').val()) {
		$("#submit").css("background-color", "#fff");
	} else {
		$("#submit").css("background-color", "#bbcdcb");
	}
	if ($("#user").val()) {
		$("#cancel").removeClass("none");
	} else {
		$("#cancel").addClass("none");
	}
}

//登陆
function login() {
	var phone = $summer.byId('user').value;
	var passw = $summer.byId('pwd').value;
	if (phone == '') {
		jqAlert("账户不能为空");
		return false;
	}
	if (passw == '') {
		jqAlert("密码不能为空");
		return false;
	}
	//清除人员搜索记录TODO：后台调整，分租户，分用户
	//	localStorage.setItem("searcharr", "");
	//var pass = passw;//SHA1(passw);//123
	var pass = SHA1(passw);
	//ali
	var param = {
		"tenantId" : "",
		"username" : phone,
		"password" : pass
	};
	var common_url = api_url;
	//"http://123.103.9.205:8090";
	var url = common_url + "mlogin";
	ajaxRequest("mlogin", "post", "application/x-www-form-urlencoded", param, function(data) {
		if (data.flag == "success") {
			var userinfo = {//token
				token : data.token,
				u_logints : data.u_logints,
				u_usercode : data.u_usercode,
				tenantid : data.tenantid,
				username : data.userName,
				useravator : data.userAvator,
				phone : phone, //账户
				pwd : passw //密码
			};
			// emm注册的信息
			var emminfo = {
				"username" : phone,
				"password" : passw,
				"companyId" : data.tenantid
			}
			if (data.status != 1) {
				$("#pwd").val("");
				//临时暂存，
				summer.setStorage("tempuserinfo", userinfo);
				summer.openWin({
					id : 'editPwdstart',
					url : 'html/login/editPwdstart.html',
					pageParam : {
						userinfo : JSON.stringify(userinfo)
					}
				});
				return false;
			}
			// 存储local
			summer.setStorage("userinfo", userinfo);

			//登录EMM
			//loginEmm(emminfo);

			// 打开首页
			summer.openWin({
				id : "root",
				url : "index.html",
				'addBackListener' : 'true',
				statusBarStyle : "light",
				isKeep : false,
				animation : {
					duration : 0
				}
			});
		} else {
			jqAlert(data.msg);
		}

	}, function(res) {
		jqAlert("登录失败，请重新登录");
	});
}

function loginEmm(data) {
	emm.writeConfig({
		"host" : "59.110.148.45", //设置EMM的IP地址
		"port" : "80" //设置EMM的端口
	});
	emm.registerDevice({
		"username" : data.username,
		"password" : data.password,
		"companyId" : data.companyId
	}, function(ret) {
		alert($summer.jsonToStr(ret));
	}, function(ret) {
		alert($summer.jsonToStr(ret));
	})
}

/*
 * flag表示是否显示
 */
function pwdShow() {
	var flag = false;
	$('#eye').on('touchend', function() {
		if (!flag) {
			$("#img").attr('src', '../../image/openeye.png');
			$('#pwd').attr('type', 'text');
		} else {
			$("#img").attr('src', '../../image/closeeye.png');
			$('#pwd').attr('type', 'password');
		}
		flag = !flag;
	});
}

//取消输入
function cancelInput() {
	$("#cancel").on("touchend", function() {
		$("#user").val("");
		total();
	})
}

/*
 功能:找回密码
 实现方式：以openWin方式打开新页面
 */
function findpassword() {
	// localStorage.zhead=2;//gct:这句代码有用吗?
	$("#pwd").val("");
	//gct:这句代码有用吗?
	summer.openWin({
		id : "forgetPsd_findPsd",
		url : "html/login/forgetPsd_findPsd.html",
		pageParam : {
			param_userPhone : $('#user').val()
		}
	});
}

//打开体验功能方法
function opentiyanfun() {
	$(".um-marks").removeClass("none");
}

//关闭体验功能方法
function jueseclose() {
	$("#user").val("");
	$("#pwd").val("");
	$(".um-marks").addClass("none");
}

//体验登录
function experiencelogin(n) {
	if (n == 0) {
		$('#user').val("13001122332");
		$('#pwd').val("1234qwer");
	} else {
		$('#user').val("13001122331");
		$('#pwd').val("1234qwer");
	}
	// localStorage.juesetiyan = 1;  ？
	login();
}
