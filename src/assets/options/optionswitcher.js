if($(window).width() > 750) {

	$('#body').each(function() {
		'use strict';
	    var link=    $(`<div class="option">
							<div class="option-switcher ">
	    					<div class="option-switcher-btn icon-option"><i class="fa fa-gear"></i></div>

								<div class="option-swticher-header">
									<div class="option-switcher-heading">Theme Option</div>
								</div>
								<div class="option-swticher-body">

									<span class="subtitle">Header</span>
									<div class="no-col-space header-opns">
										<a href="javascript:void(0);" class="btn-u header-fixed-to active-switcher-btn">Fixed</a>
										<a href="javascript:void(0);" class="btn-u header-static-to ">Static</a>
									</div>

									<span class="subtitle">Navigation</span>
									<div class="no-col-space header-opns mb-4">
										<select class="custom-select" id="sidebar-option-select">
											<option value="sidebar-fixed" selected>Fixed</option>
											<option value="sidebar-fixed-offcanvas">Fixed Offcanvas</option>
											<option value="sidebar-static">Static</option>
											<option value="sidebar-static-offcanvas">Static Offcanvas</option>
										</select>
									</div>


									<span class="subtitle">Header Background</span>

									<div class="no-col-space header-opns">
										<a href="javascript:void(0);" class="btn-u header-light-to active-switcher-btn">Light</a>
										<a href="javascript:void(0);" class="btn-u header-dark-to ">Dark</a>
									</div>

									<span class="subtitle">Navigation Background</span>
									<div class="no-col-space header-opns">
										<a href="javascript:void(0);" class="btn-u sidebar-dark-to active-switcher-btn">Dark</a>
										<a href="javascript:void(0);" class="btn-u sidebar-light-to ">Light</a>
									</div>

								</div>
							</div>
						</div>`);
	  $('#body').prepend(link);
	});
}
//option Switcher
var panel = jQuery('.option-switcher');

$('.option-switcher-btn').on('click', function() {
	'use strict';
	$(this).toggleClass('cross');
	jQuery('.option-switcher').toggleClass('option-visible');
});


jQuery('.color-options li').click(function () {
	'use strict';
	var color = jQuery(this).attr('data-color');
	var data_logo = jQuery(this).attr('data-logo');
	setColor(color, data_logo);
	jQuery('.color-options li').removeClass('theme-active');
	jQuery(this).addClass('theme-active');
});

var setColor = function (color) {
	'use strict';
	jQuery('#option_color').attr('href', 'css/' + color + '.css');
}


	//VARIABLE
	var page_container = jQuery('#body');
	var header_static = jQuery('.header-static-to');
	var header_fixed = jQuery('.header-fixed-to');



	//NAVBAR OPTION
	header_static.click(function(){
		'use strict';
		jQuery(this).addClass('active-switcher-btn');
		header_fixed.removeClass('active-switcher-btn');
		page_container.removeClass('header-fixed')
	});

	header_fixed.click(function(){
		'use strict';
		jQuery(this).addClass('active-switcher-btn');
		header_static.removeClass('active-switcher-btn');
		page_container.addClass('header-fixed')
	});





	// SIDEBAR OPTION

if ($(window).width() > 750) {
	$('#sidebar-option-select').change(function () {
		'use strict';
	     var optionSelected = $(this).find("option:selected");
	     var valueSelected  = optionSelected.val();

			 if(valueSelected === "sidebar-static"){
					 page_container.removeClass('sidebar-fixed sidebar-static-offcanvas sidebar-collapse sidebar-fixed-offcanvas').addClass('sidebar-static');
			 }

			 if(valueSelected === "sidebar-static-offcanvas"){
			 		page_container.removeClass('sidebar-fixed sidebar-static sidebar-fixed-offcanvas sidebar-minified').addClass('sidebar-static-offcanvas ');
			 }

			 if(valueSelected === "sidebar-fixed"){
			 		page_container.removeClass('sidebar-static-offcanvas sidebar-static sidebar-fixed-offcanvas sidebar-collapse').addClass('sidebar-fixed')
			 }

			 if(valueSelected === "sidebar-fixed-offcanvas"){
			 		page_container.removeClass('sidebar-static-offcanvas sidebar-static sidebar-fixed sidebar-minified').addClass('sidebar-fixed-offcanvas')
			 }
	 });
 }



// Header Background
var header_dark = jQuery('.header-dark-to');
var header_light = jQuery('.header-light-to');
header_dark.click(function(){
	'use strict';
	jQuery(this).addClass('active-switcher-btn');
	header_light.removeClass('active-switcher-btn');
	page_container.removeClass('header-light').addClass('header-dark');
});

header_light.click(function(){
	'use strict';
	jQuery(this).addClass('active-switcher-btn');
	header_dark.removeClass('active-switcher-btn');
	page_container.removeClass('header-dark').addClass('header-light');
});

// Sidebar Background
var sidebar_dark = jQuery('.sidebar-dark-to');
var sidebar_light = jQuery('.sidebar-light-to');

sidebar_dark.click(function(){
	'use strict';
	jQuery(this).addClass('active-switcher-btn');
	sidebar_light.removeClass('active-switcher-btn');
	page_container.removeClass('sidebar-light').addClass('sidebar-dark');
});

sidebar_light.click(function(){
	'use strict';
	jQuery(this).addClass('active-switcher-btn');
	sidebar_dark.removeClass('active-switcher-btn');
	page_container.removeClass('sidebar-dark').addClass('sidebar-light');
});
