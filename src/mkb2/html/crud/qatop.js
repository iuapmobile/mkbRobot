$(function() {
	debugger
	console.log(UM.MKBURL);

	$("#btnSave").on("click", function(){
		debugger;
		$.ajax({
			url: KBCONFIG.MKBURL + '/mkb/QATop',
			data : {
				apiKey : window.__yyuap_apiKey
			},
			type:'post',
			dataType:'json',
			success:function(data){
				alert("获取成功，返回数据:\n" + JSON.stringify(data));
			},
			error:function(data){
				alert("获取失败，返回数据:\n" + JSON.stringify(data));
			}

		});
	})
});