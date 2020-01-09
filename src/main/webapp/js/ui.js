// 搜索
$.fn.uiSearch = function(){
	var ui = $(this);
	$('.ui-search-selected',ui).on('click',function(){
		$('.ui-search-select-list').show();
		return false;
	});
	$('.ui-search-select-list a',ui).on('click',function(){
		$('.ui-search-selected',ui).text($(this).text());
		$('.ui-search-select-list',ui).hide();
		return false;
	});
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
	});
	$('.ui-search-select-list').hide();
};

//  选项卡切换

$.fn.uiTab  = function(tabs,cons,focus_prefix){

	var ui = $(this);
	var tabs = $(tabs,ui);
	var cons = $(cons,ui);
	var focus_prefix = focus_prefix || '';


	tabs.on('click',function(){
		var index = $(this).index();
		
		tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+"item_focus");
		cons.hide().eq(index).show();
		return false;
	});


};

$.fn.uiSlider  =function(){
	var wrap =  $('.ui-slider-wrap',this);
	var size = $('.item',wrap).size()-1;
	

	var goPrev = $('.ui-slider-arrow .left',this);
	var goNext = $('.ui-slider-arrow .right',this);

	var items = $('.item',wrap);
	var tips  = $('.ui-slider-process .item',this);
	var width =  items.eq(0).width();

	var currentIndex = 0;
	var autoMove = true;

	//	1.基本事件
	wrap
	.on('resetFocus',function(evt,isAutoMove){

		// if(autoMove === true &&)

		tips.removeClass('item_focus').eq(currentIndex).addClass('item_focus');
		wrap.animate({left:currentIndex*width*-1});
	})
	.on('nextFocus',function(){

		currentIndex = currentIndex+1 > size ? 0 : currentIndex+1;
		$(this).triggerHandler('resetFocus');

		// 4. 链式调用
		return $(this);

	})
	.on('prevFocus',function(){
		currentIndex = currentIndex-1 < 0 ? size : currentIndex-1;
		$(this).triggerHandler('resetFocus');

	})
	.on('autoMove',function(){
		// 2. 自动处理
		if(autoMove == true){
			setTimeout(function(){
				// 3. 闭包 && 链式调用
				wrap.triggerHandler('nextFocus').triggerHandler('autoMove');
			},5000);
		}
	}).triggerHandler('autoMove');
	goPrev.on('click',function(){
		wrap.triggerHandler('prevFocus');
		return false;
	});
	goNext.on('click',function(){
		wrap.triggerHandler('nextFocus');
		return false;
	});

	//	5.任务 BUG 排除（定时器BUG	）

}
//
$(function () {
	$('.ui-search').uiSearch();
	$('.ui-slider').uiSlider();
})