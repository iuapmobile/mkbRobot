/**
 *@author siyk
 *iscroll局部滚动列表
 *@id是iscroll的元素id
 *@downCallback底部上拉加载回调
 *@upCallback顶部下拉刷新回调
*/
function initScroller(id,downCallback,upCallback,myheight){
	$("head").append('<link rel="stylesheet" href="../../css/pullbar.css">');
	var $wrapper = $("#" + id);
	var bars1 = '<div class="pullBar upBar">'
		bars1 += '<img class="reverse" src="../../image/public/pull.png">'
		bars1 += '<h5 class="barDesc">上拉刷新...</h5>'
		bars1 += '<p class="barTime">更新时间：2017-2-14 15:05:03</p>'
		bars1 += '</div>'
	var bars2 = '<div class="pullBar downBar">'
		bars2 += '<img src="../../image/public/pull.png">'
		bars2 += '<h5 class="barDesc">上拉加载更多...</h5>'
		bars2 += '<p class="barTime">更新时间：2017-2-14 15:05:03</p>'
		bars2 += '</div>';
	var image = new Image();
	$wrapper.append(bars1);
	$wrapper.append(bars2);
	
	var $bars = $wrapper.find(".pullBar");
	var $upBar = $wrapper.find(".upBar");
	var $downBar = $wrapper.find(".downBar");
	var iScroller = new iScroll(id,{
		hScroll : false,
		vScroll : true,
		hScrollbar : false,
		vScrollbar : false,
		bounce : true,
		useTransform : false,
		onScrollStart:function(e){
			e.preventDefault();
			g_target = e.target;
			$(g_target).addClass("active");
			var timer = new Date();
			var timeStr = timer.format("yyyy-MM-dd hh:mm:ss");
			$bars.css("display","block");
			$bars.find("p.barTime").html(timeStr);
		},
		onScrollMove:function(e){
			if( e.target != g_target ){
				$(g_target).removeClass("active");
			}
			var maxScrollY = iScroller.maxScrollY;
			if( iScroller.maxScrollY > 0 ){
				maxScrollY = 0;
			}
			var distance = maxScrollY - iScroller.y;
			if( iScroller.y <= maxScrollY ){
				$downBar.css("bottom",distance - 56);
				if( iScroller.y <= maxScrollY - 56 ){
					$downBar.find("img").addClass("reverse");
					$downBar.find("h5.barDesc").html("松开加载更多...");
				}else if( iScroller.y > maxScrollY - 56 ){
					$downBar.find("img").removeClass("reverse");
					$downBar.find("h5.barDesc").html("上拉加载更多...");
				}
			}
			
			if( iScroller.y >= 0 ){
				$upBar.css("top",iScroller.y - 56);
				if( iScroller.y >= 56 ){
					$upBar.find("img").removeClass("reverse");
					$upBar.find("h5.barDesc").html("松开刷新...");
				}else if( iScroller.y < 56 ){
					$upBar.find("img").addClass("reverse");
					$upBar.find("h5.barDesc").html("下拉刷新...");
				}
			}
		},
		onBeforeScrollEnd:function(e){
			$(g_target).removeClass("active");
			$downBar.animate({bottom:-56},200,function(){
				$(this).css({"bottom":-56,"display":"none"});
			});
			if( $downBar.find("img").hasClass("reverse")){
				$downBar.find("img").removeClass("reverse");
				$downBar.find("h5.barDesc").html("上拉加载更多...");
				downCallback();
			}
			$upBar.animate({top:-56},200,function(){
				$(this).css({"top":-56,"display":"none"});
			});
			if( !$upBar.find("img").hasClass("reverse")){
				$upBar.find("img").addClass("reverse");
				$upBar.find("h5.barDesc").html("下拉刷新...");
				upCallback();
			}
		}
	});
	myheight = myheight?myheight:$(".um-header").height();
	var H = $summer.winHeight() - myheight;
	$("#" + id).height(H);
	iScroller.refresh();
	$(window).resize(function(){
		var H = $summer.winHeight() - myheight;
		$("#" + id).height(H);
		iScroller.refresh();
	});
	
	return iScroller;
}