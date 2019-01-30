/* ====== Index ======

1. JEKYLL INSTANT SEARCH
2. SCROLLBAR CONTENT
3. TOOLTIPS AND POPOVER
4. MULTIPLE SELECT
4. LOADING BUTTON
5. TOASTER
6. PROGRESS BAR

====== End ======*/

$(document).ready(function() {
  "use strict";

  /*======== 1. JEKYLL INSTANT SEARCH ========*/

  var searchInput = $('#search-input');
  if(searchInput.length != 0){
    SimpleJekyllSearch.init({
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('search-results'),
      dataSource: '/assets/data/search.json',
      searchResultTemplate: '<li><div class="link"><a href="{link}">{label}</a></div><div class="location">{location}</div><\/li>',
      noResultsText: '<li>No results found</li>',
      limit: 10,
      fuzzy: true,
    });
  }


  /*======== 2. SCROLLBAR CONTENT ========*/

  var dataScrollHeight = $("[data-scroll-height]");
  function scrollWithBigMedia(media) {
    if (media.matches) {
      /* The viewport is greater than, or equal to media screen size */
      dataScrollHeight.each(function () {
        var scrollHeight = $(this).attr("data-scroll-height");
        $(this).css({ height: scrollHeight + "px", overflow: "hidden" });
      });

      //For content that needs scroll
      $(".slim-scroll")
        .slimScroll({
          opacity: 0,
          height: "100%",
          color: "#999",
          size: "5px",
          wheelStep: 10
        })
        .mouseover(function () {
          $(this)
            .next(".slimScrollBar")
            .css("opacity", 0.4);
        });
    } else {
      /* The viewport is less than media screen size */
      dataScrollHeight.css({ height: "auto", overflow: "auto" });
    }
  }

  if (dataScrollHeight.length != 0) {
    var media = window.matchMedia("(min-width: 992px)");
    scrollWithBigMedia(media); // Call listener function at run time
    media.addListener(scrollWithBigMedia); // Attach listener function on state changes
  }

  /*======== 3. TOOLTIPS AND POPOVER ========*/
  var tooltip = $('[data-toggle="tooltip"]')
  if(tooltip.length != 0){
    tooltip.tooltip({
      container: "body",
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });
  }

  var popover = $('[data-toggle="popover"]')

  if(popover.length != 0){
    popover.popover();
  }


  /*======== 4. MULTIPLE SELECT ========*/
  var multipleSelect = $(".js-example-basic-multiple");
  if(multipleSelect.length != 0){
    multipleSelect.select2();
  }

  /*======== 4. LOADING BUTTON ========*/

  var laddaButton = $('.ladda-button');

  if(laddaButton.length != 0){
    Ladda.bind(".ladda-button", {
      timeout: 5000
    });

    Ladda.bind(".progress-demo button", {
      callback: function (instance) {
        var progress = 0;
        var interval = setInterval(function () {
          progress = Math.min(progress + Math.random() * 0.1, 1);
          instance.setProgress(progress);

          if (progress === 1) {
            instance.stop();
            clearInterval(interval);
          }
        }, 200);
      }
    });
  }

  /*======== 5. TOASTER ========*/

  var toaster = $('#toaster')

  function callToaster(positionClass) {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: positionClass,
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut"
    };
    toastr.success("Welcome to Sleek Dashboard", "Howdy!");
  }

  if(toaster.length != 0){
    
    if (document.dir != "rtl") {
      callToaster("toast-top-right");
    } else {
      callToaster("toast-top-left");
    }

  }

  /*======== 6. PROGRESS BAR ========*/
  NProgress.done();
});
