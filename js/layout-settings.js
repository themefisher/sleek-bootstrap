
(function(){
  'use strict';
  $(document).ready(function () {

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

    //Layout settings visible
    $('.right-sidebar-in').on('click', function () {
      jQuery('.right-sidebar-container-2').addClass('right-sidebar-2-visible');
    });

    //THEME OPTION CLOSE BUTTON
    $('.btn-close-right-sidebar-2').on('click', function(){
      jQuery('.right-sidebar-container-2').removeClass('right-sidebar-2-visible');
    })

    //VARIABLE
    var body = jQuery('#body');
    var header_static = jQuery('.header-static-to');
    var header_fixed = jQuery('.header-fixed-to');



    //NAVBAR OPTION
    header_static.click(function () {
      'use strict';
      jQuery(this).addClass('btn-right-sidebar-2-active');
      header_fixed.removeClass('btn-right-sidebar-2-active');
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
      jQuery(this).addClass('btn-right-sidebar-2-active');
      header_static.removeClass('btn-right-sidebar-2-active');
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

        if (valueSelected === "sidebar-fixed-minified") {
          body.removeClass('sidebar-fixed-offcanvas sidebar-static sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified sidebar-minified-out').addClass('sidebar-fixed sidebar-minified')
          window.isMinified = true; // Because It is  minified
          window.isCollapsed = false;

          //Store in local storage
          setOptions("navigationType", "sidebar-fixed-minified")
        }



        if (valueSelected === "sidebar-fixed-offcanvas") {
          body.removeClass('sidebar-static sidebar-static-offcanvas sidebar-collapse-out sidebar-minified sidebar-minified-out sidebar-fixed').addClass('sidebar-fixed-offcanvas sidebar-collapse')
          window.isCollapsed = true;
          window.isMinified = false;

          //Store in local storage
          setOptions("navigationType", "sidebar-fixed-offcanvas")
        }

        if (valueSelected === "sidebar-static") {
          body.removeClass('sidebar-fixed-offcanvas sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified-out sidebar-fixed').addClass('sidebar-static')
          window.isMinified = false;
          window.isCollapsed = false;

          //Store in local storage
          setOptions("navigationType", "sidebar-static")
        }

        if (valueSelected === "sidebar-static-minified") {
          body.removeClass('sidebar-fixed-offcanvas sidebar-static-offcanvas sidebar-collapse sidebar-collapse-out sidebar-minified-out sidebar-fixed').addClass('sidebar-static sidebar-minified')
          window.isMinified = true;
          window.isCollapsed = false;

          //Store in local storage
          setOptions("navigationType", "sidebar-static-minified")
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
      if (currentOptions.navigationType === "sidebar-fixed-minified") {
        $('#sidebar-option-select').val('sidebar-fixed-minified').change();
      }
      if (currentOptions.navigationType === "sidebar-fixed-offcanvas") {
        $('#sidebar-option-select').val('sidebar-fixed-offcanvas').change();
      }
      if (currentOptions.navigationType === "sidebar-static") {
        $('#sidebar-option-select').val('sidebar-static').change();
      }
      if (currentOptions.navigationType === "sidebar-static-minified") {
        $('#sidebar-option-select').val('sidebar-static-minified').change();
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
      jQuery(this).addClass('btn-right-sidebar-2-active');
      header_light.removeClass('btn-right-sidebar-2-active');
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
      jQuery(this).addClass('btn-right-sidebar-2-active');
      header_dark.removeClass('btn-right-sidebar-2-active');
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
      jQuery(this).addClass('btn-right-sidebar-2-active');
      sidebar_light.removeClass('btn-right-sidebar-2-active');
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
      jQuery(this).addClass('btn-right-sidebar-2-active');
      sidebar_dark.removeClass('btn-right-sidebar-2-active');
      body.removeClass('sidebar-dark').addClass('sidebar-light');

      //Store in local storage
      setOptions("navigationBackground", "sidebar-light")
    });

    //Click for current options
    if (currentOptions.navigationBackground === "sidebar-light") {
      sidebar_light.trigger("click")
    }

    // Spacing Layout
    var default_spacing = jQuery('.default-spacing-to');
    var compact_spacing = jQuery('.compact-spacing-to');

    default_spacing.click(function () {
      'use strict';
      jQuery(this).addClass('btn-right-sidebar-2-active');
      compact_spacing.removeClass('btn-right-sidebar-2-active');
      body.removeClass('compact-spacing');

      //Store in local storage
      setOptions("navigationSpacing", default_spacing)
    });

    //Click for current options
    if (currentOptions.navigationSpacing === default_spacing) {
      default_spacing.trigger("click")
    }

    compact_spacing.click(function () {
      'use strict';
      jQuery(this).addClass('btn-right-sidebar-2-active');
      default_spacing.removeClass('btn-right-sidebar-2-active');
      body.addClass('compact-spacing');

      //Store in local storage
      setOptions("navigationSpacing", "compact-spacing")
    });

    //Click for current options
    if (currentOptions.navigationSpacing === "compact-spacing") {
      compact_spacing.trigger("click")
    }

    // Direction
    var ltr = jQuery('.ltr-to');
    var rtl = jQuery('.rtl-to');

    ltr.click(function () {
      'use strict';
      jQuery(this).addClass('btn-right-sidebar-2-active');
      rtl.removeClass('btn-right-sidebar-2-active');
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
      jQuery(this).addClass('btn-right-sidebar-2-active');
      ltr.removeClass('btn-right-sidebar-2-active');
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

})()
