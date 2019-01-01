if($(window).width() > 750) {

	$('#body').each(function() {
		'use strict';
    var themeOption = $(`<div class="theme-option">
			<div class="theme-option-switcher">
				<div class="theme-option-switcher-btn theme-icon-option">
					<i class="mdi mdi-settings mdi-spin"></i>
				</div>
					<div class="theme-option-swticher-header">
						<div class="theme-option-switcher-heading">Theme Option</div>
					</div>
          <div class="theme-option-swticher-body">

						<span class="theme-subtitle">Header</span>
						<div class="no-col-space">
							<a href="javascript:void(0);" class="theme-btn header-fixed-to theme-active-switcher-btn">Fixed</a>
							<a href="javascript:void(0);" class="theme-btn header-static-to">Static</a>
            </div>

						<span class="theme-subtitle">Navigation</span>
						<div class="no-col-space">
							<select class="theme-select" id="sidebar-option-select">
                <option value="sidebar-fixed" selected>Fixed</option>
                <option value="sidebar-fixed-offcanvas">Fixed Offcanvas</option>
                <option value="sidebar-static">Static</option>
                <option value="sidebar-static-offcanvas">Static Offcanvas</option>
              </select>
						</div>

						<span class="theme-subtitle">Header Background</span>
						<div class="no-col-space">
							<a href="javascript:void(0);" class="theme-btn theme-active-switcher-btn header-light-to">Light</a>
							<a href="javascript:void(0);" class="theme-btn header-dark-to">Dark</a>
            </div>

            <span class="theme-subtitle">Navigation Background</span>
						<div class="no-col-space">
							<a href="javascript:void(0);" class="theme-btn theme-active-switcher-btn sidebar-dark-to">Dark</a>
							<a href="javascript:void(0);" class="theme-btn sidebar-light-to">Light</a>
            </div>

            <span class="theme-subtitle">Direction</span>
						<div class="no-col-space">
							<a href="javascript:void(0);" class="theme-btn theme-active-switcher-btn ltr-to">LTR</a>
							<a href="javascript:void(0);" class="theme-btn rtl-to">RTL</a>
            </div>

					</div>
			</div>
		</div>`);
    $('#body').prepend(themeOption);
	});
}
//option Switcher
var panel = jQuery('.theme-option-switcher');

$('.theme-option-switcher-btn').on('click', function () {
  'use strict';
  $(this).toggleClass('theme-cross');
  jQuery('.theme-option-switcher').toggleClass('theme-option-visible');
});

  //VARIABLE
	var body = jQuery('#body');
	var header_static = jQuery('.header-static-to');
	var header_fixed = jQuery('.header-fixed-to');



	//NAVBAR OPTION
	header_static.click(function(){
		'use strict';
		jQuery(this).addClass('theme-active-switcher-btn');
		header_fixed.removeClass('theme-active-switcher-btn');
    body.removeClass('header-fixed')
    body.addClass('header-static')
	});

	header_fixed.click(function(){
		'use strict';
		jQuery(this).addClass('theme-active-switcher-btn');
		header_static.removeClass('theme-active-switcher-btn');
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
        body.removeClass('sidebar-fixed-offcanvas sidebar-static sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified sidebar-minified-out').addClass('sidebar-fixed')
        window.isMinified = false; // Because It is not minified (aka it is opened)
        window.isCollapsed = false;
      }

      if(valueSelected === "sidebar-fixed-offcanvas"){
        body.removeClass('sidebar-static sidebar-static-offcanvas sidebar-collapse-out sidebar-minified sidebar-minified-out sidebar-fixed').addClass('sidebar-fixed-offcanvas sidebar-collapse')
        window.isCollapsed = true;
        window.isMinified = false;
      }

      if (valueSelected === "sidebar-static") {
        body.removeClass('sidebar-fixed-offcanvas sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified-out sidebar-fixed').addClass('sidebar-static sidebar-minified')
        window.isMinified = true;
        window.isCollapsed = false;
      }

      if (valueSelected === "sidebar-static-offcanvas") {
        body.removeClass('sidebar-fixed-offcanvas sidebar-static sidebar-collapse-out sidebar-minified sidebar-minified-out sidebar-fixed').addClass('sidebar-static-offcanvas sidebar-collapse');
        window.isCollapsed = true;
        window.isMinified = false;
      }
	 });
 }



// Header Background
var header_dark = jQuery('.header-dark-to');
var header_light = jQuery('.header-light-to');
header_dark.click(function(){
	'use strict';
	jQuery(this).addClass('theme-active-switcher-btn');
	header_light.removeClass('theme-active-switcher-btn');
	body.removeClass('header-light').addClass('header-dark');
});

header_light.click(function(){
	'use strict';
	jQuery(this).addClass('theme-active-switcher-btn');
	header_dark.removeClass('theme-active-switcher-btn');
	body.removeClass('header-dark').addClass('header-light');
});

// Sidebar Background
var sidebar_dark = jQuery('.sidebar-dark-to');
var sidebar_light = jQuery('.sidebar-light-to');

sidebar_dark.click(function(){
	'use strict';
	jQuery(this).addClass('theme-active-switcher-btn');
	sidebar_light.removeClass('theme-active-switcher-btn');
	body.removeClass('sidebar-light').addClass('sidebar-dark');
});

sidebar_light.click(function(){
	'use strict';
	jQuery(this).addClass('theme-active-switcher-btn');
	sidebar_dark.removeClass('theme-active-switcher-btn');
	body.removeClass('sidebar-dark').addClass('sidebar-light');
});


// Direction
var ltr = jQuery('.ltr-to');
var rtl = jQuery('.rtl-to');

ltr.click(function(){
	'use strict';
	jQuery(this).addClass('theme-active-switcher-btn');
  rtl.removeClass('theme-active-switcher-btn');
  $('html').attr('dir', 'ltr')
  $("#sleek-css").attr("href", "assets/css/sleek.css");
  window.dir = 'ltr'
});

rtl.click(function(){
	'use strict';
	jQuery(this).addClass('theme-active-switcher-btn');
  ltr.removeClass('theme-active-switcher-btn');
  $('html').attr('dir', 'rtl')
  $("#sleek-css").attr("href", "assets/css/sleek.rtl.css");
  window.dir = 'rtl'
});
