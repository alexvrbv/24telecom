"use strict";

$(document).ready(function(){
    mainSliderInit();
	indicatorsRotateInit();
	mainTruckProportionsInit();
	phoneMaskInit();
    matchHeightInit();
    formsInit();
});

//Sliders
function mainSliderInit() {
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