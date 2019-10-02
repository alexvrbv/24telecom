"use strict";

$(document).ready(function(){
    mainSliderInit();
    tipsInit();
	indicatorsRotateInit();
	mainTruckProportionsInit();
	phoneMaskInit();
    matchHeightInit();
    formsInit();
});

//Sliders
function mainSliderInit() {
	$('.main-slider').on('init', function(event, slick){
		animateNumberInit('.slick-current .animate-number');
	});    
	$('.main-slider').slick({
        dots: true,
        infinite: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.main__slick-prev'),
        nextArrow: $('.main__slick-next'),
		dotsClass: 'main-slider__nav',
	});
	$('.main-slider').on('beforeChange', function(event, slick){
		$('.animate-number').text(0);
	});
	$('.main-slider').on('afterChange', function(event, slick){
		animateNumberInit('.slick-current .animate-number');
	});
}

//Animate number
function animateNumberInit(className) {
	$(className).each(function() {
		var num = $(this).data('num');
		var speed = $(this).data('speed');
		$(this).animateNumber({
			number: num
		},{
			easing: 'swing',
			duration: speed
		});
	});
}

//Tips
function tipsInit() {
	$('.hasTooltip').each(function() { // Notice the .each() loop, discussed below
		$(this).qtip({
			content: {
				text: $(this).next('div').next('div'),
				/*button: 'Закрыть'*/
			},
			position: {
				my: 'bottom left',
				at: 'top left',
				target: $(this).next('div'),
				adjust: {
					y: -10
				},
				container: $('.truck'),
				viewport: $('.main')
			},
			show: {
				event: 'mouseenter click focus',
				//delay: 5,
				solo: true			
			},
			hide: {
				//fixed: true,
				event: 'unfocus',
				inactive: 3000
			},
			style: {
				classes: 'truck__area-tip',
				tip: {
            		corner: false
				}
			},
			events: {
				show: function(event, api) {
					$('.truck').addClass('show-tip-'+$(this)['0']['id']);
					$('.truck__area-point[aria-describedby='+$(this)['0']['id']+']').parent().removeClass('not-active-area').addClass('active-area');
					$('.truck__area-line').addClass('hidden');
					$('.truck__area-point[aria-describedby='+$(this)['0']['id']+']').parent().find('.truck__area-line').addClass('animate');
					$('.main__mask').addClass('active-'+$(this)['0']['id']);
				},
				hide: function(event, api) {
					$('.truck').removeClass('show-tip-'+$(this)['0']['id']);
					$('.truck__area-point[aria-describedby='+$(this)['0']['id']+']').parent().removeClass('active-area').addClass('not-active-area');
					$('.not-active-area .truck__area-line').removeClass('hidden');
					$('.truck__area-point[aria-describedby='+$(this)['0']['id']+']').parent().find('.truck__area-line').removeClass('animate');
					$('.main__mask').removeClass('active-'+$(this)['0']['id']);
				}				
			}
		});
    });	
}

//IndicatorsRotate
function indicatorsRotateInit() {
	var transform_styles = ['-webkit-transform',
							'-ms-transform',
							'transform'];
	window.randomize = function() {
		var rotation = Math.floor(Math.random() * 360);
		for(i in transform_styles) {
		$('.circle .fill').css(transform_styles[i],
								'rotate(' + rotation + 'deg)');
		}
	}
}

//Main truck proportions
function mainTruckProportionsInit() {
    $(window).on('load resize', function(){
		var truckHeight = ($('.main__truck').width()) / 1.40648855;
		$('.main__truck').css('height', truckHeight);
	});
}

//Phone mask
function phoneMaskInit() {
    $("[name='phone']").mask("+7(999) 999-9999");
}

//Match height
function matchHeightInit() {
    $('.solutions__part').matchHeight();
    $('.how__part').matchHeight();
    $('.rate').matchHeight();
}

//Forms
function formsInit(){
	$('.js-form').submit(function(e){
        $(this).validate();
		if ($(this).valid()) {
			$(this).ajaxSubmit({
				type: 'POST',
				url: '/local/templates/3pl/order.php',
				beforeSubmit: function(){
                    $.magnificPopup.close();
				},
				success: function(response){
					console.log(response);
					if (response == 'Ok'){
						$.magnificPopup.open({
							items: {
								src: '#successPopup',
							},
							type: 'inline',
							mainClass: 'form-popup',
						});
					} else {
						$.magnificPopup.open({
							items: {
								src: '#errorPopup',
							},
							type: 'inline',
							mainClass: 'form-popup',
						});					
					}
				},
				error: function(){
					$.magnificPopup.open({
						items: {
							src: '#errorPopup',
						},
						type: 'inline',
						mainClass: 'form-popup',
					});
				}
			});
			return false;
		} else {
			e.preventDefault();
		}
	});
}