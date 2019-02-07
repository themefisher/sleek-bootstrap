$(document).ready(function () {

  if ($(window).width() > 750) {

    $('#body').each(function () {
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
                <option value="sidebar-fixed">Fixed</option>
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
          <div style="display: flex; justify-content: center; padding-top: 30px">
            <div id="reset-options" style="width: auto; cursor: pointer" class="theme-btn theme-active-switcher-btn">Reset Settings</div>
          </div>
			</div>
		</div>`);
      $('#body').prepend(themeOption);
    });
  }

  //Option Switcher


  // Store object for local storage data
  var currentOptions = {
    headerType: "header-fixed",
    headerBackground: "header-light",
    navigationType: "sidebar-fixed",
    navigationBackground: "sidebar-dark",
    direction: "ltr"
  }

  /**
   * Get local storage value
   */
  function getOptions() {
    return JSON.parse(localStorage.getItem("optionsObject"))
  }

  /**
   * Set local storage property value
   */
  function setOptions(propertyName, propertyValue) {

    //Store in local storage
    var optionsCopy = Object.assign({}, currentOptions);
    optionsCopy[propertyName] = propertyValue

    //Store in local storage
    localStorage.setItem("optionsObject", JSON.stringify(optionsCopy));
  }

  if (getOptions() != null) {
    currentOptions = getOptions()
  } else {
    localStorage.setItem("optionsObject", JSON.stringify(currentOptions));
  }

  /**
   * Clear local storage
   */
  function clearOptions() {
    localStorage.removeItem("optionsObject");
  }

  // Set localstorage value to variable
  if (getOptions() != null) {
    currentOptions = getOptions()
  } else {
    localStorage.setItem("optionsObject", JSON.stringify(currentOptions));
  }



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
  header_static.click(function () {
    'use strict';
    jQuery(this).addClass('theme-active-switcher-btn');
    header_fixed.removeClass('theme-active-switcher-btn');
    body.removeClass('header-fixed')
    body.addClass('header-static')

    //Store in local storage
    setOptions("headerType", "header-static")
  });

  //Click for current options
  if (currentOptions.headerType === "header-static") {
    header_static.trigger("click")
  }

  header_fixed.click(function () {
    'use strict';
    jQuery(this).addClass('theme-active-switcher-btn');
    header_static.removeClass('theme-active-switcher-btn');
    body.removeClass('header-static')
    body.addClass('header-fixed')
    //Store in local storage
    setOptions("headerType", "header-fixed")
  });

  //Click for current options
  if (currentOptions.headerType === "header-fixed") {
    header_fixed.trigger("click")
  }




  // SIDEBAR OPTION

  if ($(window).width() > 750) {
    $('#sidebar-option-select').change(function () {
      'use strict';
      var optionSelected = $(this).find("option:selected");
      var valueSelected = optionSelected.val();

      if (valueSelected === "sidebar-fixed") {
        body.removeClass('sidebar-fixed-offcanvas sidebar-static sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified sidebar-minified-out').addClass('sidebar-fixed')
        window.isMinified = false; // Because It is not minified (aka it is opened)
        window.isCollapsed = false;

        //Store in local storage
        setOptions("navigationType", "sidebar-fixed")
      }



      if (valueSelected === "sidebar-fixed-offcanvas") {
        body.removeClass('sidebar-static sidebar-static-offcanvas sidebar-collapse-out sidebar-minified sidebar-minified-out sidebar-fixed').addClass('sidebar-fixed-offcanvas sidebar-collapse')
        window.isCollapsed = true;
        window.isMinified = false;

        //Store in local storage
        setOptions("navigationType", "sidebar-fixed-offcanvas")
      }

      if (valueSelected === "sidebar-static") {
        body.removeClass('sidebar-fixed-offcanvas sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified-out sidebar-fixed').addClass('sidebar-static sidebar-minified')
        window.isMinified = true;
        window.isCollapsed = false;

        //Store in local storage
        setOptions("navigationType", "sidebar-static")
      }

      if (valueSelected === "sidebar-static-offcanvas") {
        body.removeClass('sidebar-fixed-offcanvas sidebar-static sidebar-collapse-out sidebar-minified sidebar-minified-out sidebar-fixed').addClass('sidebar-static-offcanvas sidebar-collapse');
        window.isCollapsed = true;
        window.isMinified = false;

        //Store in local storage
        setOptions("navigationType", "sidebar-static-offcanvas")
      }
    });


    // Trigger Change for current options
    if (currentOptions.navigationType === "sidebar-fixed") {
      $('#sidebar-option-select').val('sidebar-fixed').change();
    }
    if (currentOptions.navigationType === "sidebar-fixed-offcanvas") {
      $('#sidebar-option-select').val('sidebar-fixed-offcanvas').change();
    }
    if (currentOptions.navigationType === "sidebar-static") {
      $('#sidebar-option-select').val('sidebar-static').change();
    }
    if (currentOptions.navigationType === "sidebar-static-offcanvas") {
      $('#sidebar-option-select').val('sidebar-static-offcanvas').change();
    }
  }



  // Header Background
  var header_dark = jQuery('.header-dark-to');
  var header_light = jQuery('.header-light-to');

  header_dark.click(function () {
    'use strict';
    jQuery(this).addClass('theme-active-switcher-btn');
    header_light.removeClass('theme-active-switcher-btn');
    body.removeClass('header-light').addClass('header-dark');

    //Store in local storage
    setOptions("headerBackground", "header-dark")
  });

  //Click for current options
  if (currentOptions.headerBackground === "header-dark") {
    header_dark.trigger("click");
  }

  header_light.click(function () {
    'use strict';
    jQuery(this).addClass('theme-active-switcher-btn');
    header_dark.removeClass('theme-active-switcher-btn');
    body.removeClass('header-dark').addClass('header-light');

    //Store in local storage
    setOptions("headerBackground", "header-light")
  });

  //Click for current options
  if (currentOptions.headerBackground === "header-light") {
    header_light.trigger("click")
  }

  // Sidebar Background
  var sidebar_dark = jQuery('.sidebar-dark-to');
  var sidebar_light = jQuery('.sidebar-light-to');

  sidebar_dark.click(function () {
    'use strict';
    jQuery(this).addClass('theme-active-switcher-btn');
    sidebar_light.removeClass('theme-active-switcher-btn');
    body.removeClass('sidebar-light').addClass('sidebar-dark');

    //Store in local storage
    setOptions("navigationBackground", "sidebar-dark")
  });

  //Click for current options
  if (currentOptions.navigationBackground === "sidebar-dark") {
    sidebar_dark.trigger("click")
  }

  sidebar_light.click(function () {
    'use strict';
    jQuery(this).addClass('theme-active-switcher-btn');
    sidebar_dark.removeClass('theme-active-switcher-btn');
    body.removeClass('sidebar-dark').addClass('sidebar-light');

    //Store in local storage
    setOptions("navigationBackground", "sidebar-light")
  });

  //Click for current options
  if (currentOptions.navigationBackground === "sidebar-light") {
    sidebar_light.trigger("click")
  }


  // Direction
  var ltr = jQuery('.ltr-to');
  var rtl = jQuery('.rtl-to');

  ltr.click(function () {
    'use strict';
    jQuery(this).addClass('theme-active-switcher-btn');
    rtl.removeClass('theme-active-switcher-btn');
    $('html').attr('dir', 'ltr')
    $("#sleek-css").attr("href", "assets/css/sleek.css");
    window.dir = 'ltr'

    //Store in local storage
    setOptions("direction", "ltr")
  });

  //Click for current options
  if (currentOptions.direction === "ltr") {
    ltr.trigger("click")
  }

  rtl.click(function () {
    'use strict';
    jQuery(this).addClass('theme-active-switcher-btn');
    ltr.removeClass('theme-active-switcher-btn');
    $('html').attr('dir', 'rtl')
    $("#sleek-css").attr("href", "assets/css/sleek.rtl.css");
    window.dir = 'rtl'

    //Store in local storage
    setOptions("direction", "rtl")
  });

  //Click for current options
  if (currentOptions.direction === "rtl") {
    rtl.trigger("click")
  }

  $('#reset-options').click(function () {
    clearOptions();
    location.reload();
  })

});
