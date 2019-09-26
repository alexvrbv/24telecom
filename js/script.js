"use strict";

$(document).ready(function(){
    phoneMaskInit();
    matchHeightInit();
    formsInit();
});

//Phone mask
function phoneMaskInit() {
    $("[name='phone']").mask("+7(999) 999-9999");
}

//Match height
function matchHeightInit() {
    //$('.advantage').matchHeight();
    //$('.profile__inner').matchHeight({byRow: false});
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