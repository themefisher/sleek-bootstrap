if($(window).width() > 750) {

	$('#body').each(function() {
		'use strict';
    var themeOption = $(`<div class="tho-option">
			<div class="tho-option-switcher">
				<div class="tho-option-switcher-btn tho-icon-option">
					<i class="tho-setting-icon"></i>
				</div>
					<div class="tho-option-swticher-header">
						<div class="tho-option-switcher-heading">Theme Option</div>
					</div>
          <div class="tho-option-swticher-body">

						<span class="tho-subtitle">Header</span>
						<div class="no-col-space">
							<a href="javascript:void(0);" class="tho-btn header-fixed-to tho-active-switcher-btn">Fixed</a>
							<a href="javascript:void(0);" class="tho-btn header-static-to">Static</a>
            </div>

						<span class="tho-subtitle">Navigation</span>
						<div class="no-col-space">
							<select class="tho-select" id="sidebar-option-select">
                <option value="sidebar-fixed" selected>Fixed</option>
                <option value="sidebar-fixed-offcanvas">Fixed Offcanvas</option>
                <option value="sidebar-static">Static</option>
                <option value="sidebar-static-offcanvas">Static Offcanvas</option>
              </select>
						</div>

						<span class="tho-subtitle">Header Background</span>
						<div class="no-col-space">
							<a href="javascript:void(0);" class="tho-btn tho-active-switcher-btn ">Light</a>
							<a href="javascript:void(0);" class="tho-btn header-dark-to">Dark</a>
            </div>

            <span class="tho-subtitle">Navigation Background</span>
						<div class="no-col-space">
							<a href="javascript:void(0);" class="tho-btn tho-active-switcher-btn sidebar-dark-to">Dark</a>
							<a href="javascript:void(0);" class="tho-btn sidebar-light-to">Light</a>
            </div>

					</div>
			</div>
		</div>`);
    $('#body').prepend(themeOption);
	});
}
//option Switcher
var panel = jQuery('.tho-option-switcher');

$('.tho-option-switcher-btn').on('click', function () {
  'use strict';
  $(this).toggleClass('tho-cross');
  jQuery('.tho-option-switcher').toggleClass('tho-option-visible');
});

  //VARIABLE
	var body = jQuery('#body');
	var header_static = jQuery('.header-static-to');
	var header_fixed = jQuery('.header-fixed-to');



	//NAVBAR OPTION
	header_static.click(function(){
		'use strict';
		jQuery(this).addClass('tho-active-switcher-btn');
		header_fixed.removeClass('tho-active-switcher-btn');
    body.removeClass('header-fixed')
    body.addClass('header-static')
	});

	header_fixed.click(function(){
		'use strict';
		jQuery(this).addClass('tho-active-switcher-btn');
		header_static.removeClass('tho-active-switcher-btn');
    body.removeClass('header-static')
    body.addClass('header-fixed')
	});





	// SIDEBAR OPTION

if ($(window).width() > 750) {
	$('#sidebar-option-select').change(function () {
		'use strict';
      var optionSelected = $(this).find("option:selected");
      var valueSelected  = optionSelected.val();

      if(valueSelected === "sidebar-fixed"){
        body.removeClass().addClass('header-fixed header-light sidebar-dark sidebar-fixed sidebar-minified-out')
      }

      if(valueSelected === "sidebar-fixed-offcanvas"){
        body.removeClass().addClass('header-fixed header-light sidebar-dark sidebar-fixed-offcanvas sidebar-collapse')
      }

      if (valueSelected === "sidebar-static") {
        body.removeClass().addClass('header-fixed header-light sidebar-dark header-fixed header-light sidebar-static sidebar-minified')
      }

      if (valueSelected === "sidebar-static-offcanvas") {
        body.removeClass().addClass('header-fixed header-light sidebar-dark sidebar-static-offcanvas sidebar-collapse');
      }
	 });
 }



// Header Background
var header_dark = jQuery('.header-dark-to');
var header_light = jQuery('.header-light-to');
header_dark.click(function(){
	'use strict';
	jQuery(this).addClass('tho-active-switcher-btn');
	header_light.removeClass('tho-active-switcher-btn');
	body.removeClass('header-light').addClass('header-dark');
});

header_light.click(function(){
	'use strict';
	jQuery(this).addClass('tho-active-switcher-btn');
	header_dark.removeClass('tho-active-switcher-btn');
	body.removeClass('header-dark').addClass('header-light');
});

// Sidebar Background
var sidebar_dark = jQuery('.sidebar-dark-to');
var sidebar_light = jQuery('.sidebar-light-to');

sidebar_dark.click(function(){
	'use strict';
	jQuery(this).addClass('tho-active-switcher-btn');
	sidebar_light.removeClass('tho-active-switcher-btn');
	body.removeClass('sidebar-light').addClass('sidebar-dark');
});

sidebar_light.click(function(){
	'use strict';
	jQuery(this).addClass('tho-active-switcher-btn');
	sidebar_dark.removeClass('tho-active-switcher-btn');
	body.removeClass('sidebar-dark').addClass('sidebar-light');
});
