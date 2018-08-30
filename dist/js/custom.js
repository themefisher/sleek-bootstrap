/* ====== Index ======

1. SCROLLBAR CONTENT
2. TOOLTIPS AND POPOVER
3. JVECTORMAP DASHBOARD
4. JVECTORMAP ANALYTICS
5. JVECTORMAP WIDGET
6. CALENDAR
7. QUILL TEXT EDITOR
8. CODE EDITOR
9. MARKDOWN EDITOR
10. MULTIPLE SELECT
11. COUNTDOWN
12. LOADING BUTTON
  12.1. BIND NORMAL BUTTONS
  12.2. BIND PROGRESS BUTTONS AND SIMULATE LOADING PROGRESS
13. TOASTER
14. PROGRESS BAR
15. DATATABLES

====== End ======*/

$(document).ready(function() {
  "use strict";

  /*======== 1. SCROLLBAR CONTENT ========*/
  if ($(window).width() >= 768) {
    //For some page content card
    $(document).ready(function() {
      $(".slim-scroll")
        .slimScroll({
          opacity: 0,
          height: "100%",
          color: "#999",
          size: "5px",
          wheelStep: 10
        })
        .mouseover(function() {
          $(this)
            .next(".slimScrollBar")
            .css("opacity", 0.4);
        });
    });
  }

  /*======== 2. TOOLTIPS AND POPOVER ========*/
  $('[data-toggle="tooltip"]').tooltip({
    container: "body",
    template:
      '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  });
  $('[data-toggle="popover"]').popover();

  /*======== 3. JVECTORMAP DASHBOARD ========*/
  var mapData = {
    US: 1298,
    FR: 540,
    DE: 350,
    BW: 450,
    NA: 250,
    ZW: 300,
    AU: 760,
    GB: 120,
    ZA: 450
  };

  if (document.getElementById("world")) {
    $("#world").vectorMap({
      map: "world_mill",
      backgroundColor: "transparent",
      zoomOnScroll: false,
      regionStyle: {
        initial: {
          fill: "#e4e4e4",
          "fill-opacity": 0.9,
          stroke: "none",
          "stroke-width": 0,
          "stroke-opacity": 0
        }
      },
      markerStyle: {
        initial: {
          stroke: "transparent"
        },
        hover: {
          stroke: "rgba(112, 112, 112, 0.30)"
        }
      },

      markers: [
        {
          latLng: [54.673629, -62.347026],
          name: "America",
          style: {
            fill: "limegreen"
          }
        },
        {
          latLng: [62.466943, 11.797592],
          name: "Europe",
          style: {
            fill: "orange"
          }
        },
        {
          latLng: [23.956725, -8.768815],
          name: "Africa",
          style: {
            fill: "red"
          }
        },
        {
          latLng: [-21.943369, 123.102198],
          name: "Australia",
          style: {
            fill: "royalblue"
          }
        }
      ]
    });
  }

  /*======== 4. JVECTORMAP ANALYTICS ========*/
  var mapData2 = {
    IN: 19000,
    US: 13000,
    TR: 9500,
    DO: 7500,
    PL: 4600,
    UK: 4000
  };

  if (document.getElementById("analytic-world")) {
    $("#analytic-world").vectorMap({
      map: "world_mill",
      backgroundColor: "transparent",
      zoomOnScroll: false,
      regionStyle: {
        initial: {
          fill: "#e4e4e4",
          "fill-opacity": 0.9,
          stroke: "none",
          "stroke-width": 0,
          "stroke-opacity": 0
        }
      },

      series: {
        regions: [
          {
            values: mapData2,
            scale: ["#6a9ef9", "#b6d0ff"],
            normalizeFunction: "polynomial"
          }
        ]
      }
    });
  }

  /*======== 5. JVECTORMAP WIDGET ========*/
  if (document.getElementById("demoworld")) {
    $("#demoworld").vectorMap({
      map: "world_mill",
      backgroundColor: "transparent",
      regionStyle: {
        initial: {
          fill: "#9c9c9c"
        }
      }
    });
  }

  /*======== 6. CALENDAR ========*/
  var todayDate = moment().startOf("day");
  var YM = todayDate.format("YYYY-MM");
  var YESTERDAY = todayDate
    .clone()
    .subtract(1, "day")
    .format("YYYY-MM-DD");
  var TODAY = todayDate.format("YYYY-MM-DD");
  var TOMORROW = todayDate
    .clone()
    .add(1, "day")
    .format("YYYY-MM-DD");

  $("#calendar").fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay"
    },
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    navLinks: true,
    eventSources: [
      {
        events: [
          {
            title: "All Day Event",
            start: YM + "-01",
            end: YM + "-02"
          }
        ],
        color: "#4c84ff", // an option!
        textColor: "#ffffff" // an option!
      },
      {
        events: [
          {
            title: "Long Event",
            start: YM + "-07",
            end: YM + "-10"
          }
        ],
        color: "#f5f6fa", // an option!
        textColor: "#1b223c" // an option!
      },
      {
        events: [
          {
            title: "Confference",
            start: YM + "-14T16:00:00"
          }
        ],
        color: "#29cc97", // an option!
        textColor: "#ffffff" // an option!
      },
      {
        events: [
          {
            title: "Meeting",
            start: TODAY + "T10:30:00",
            end: TODAY + "T12:30:00"
          },
          {
            title: "Lunch",
            start: TODAY + "T12:00:00"
          },
          {
            title: "Meeting",
            start: TODAY + "T14:30:00"
          },
          {
            title: "Happy Hour",
            start: TODAY + "T17:30:00"
          },
          {
            title: "Dinner",
            start: TODAY + "T20:00:00"
          }
        ],
        color: "#f5f6fa", // an option!
        textColor: "#1b223c" // an option!
      },
      {
        events: [
          {
            title: "Click for Google",
            url: "http://google.com/",
            start: YM + "-28"
          }
        ],
        color: "#fe5461", // an option!
        textColor: "#ffffff" // an option!
      }
    ]
  });

  /*======== 7. QUILL TEXT EDITOR ========*/
  // ----------------------
  var quillHook = document.getElementById("editor");
  if (quillHook !== null) {
    var quill = new Quill(quillHook, {
      modules: {
        formula: false,
        syntax: false,
        toolbar: "#toolbar"
      },
      placeholder: "Enter Text ...",
      theme: "snow"
    });
  }

  /*======== 8. CODE EDITOR ========*/
  //------------------
  if (document.getElementById("code-editor")) {
    var htmlCode =
      '<html style="color: green"> ' +
      "<!-- this is a comment -->" +
      "<head>" +
      "<title>HTML Example</title>" +
      "</head>" +
      "<body>" +
      "The indentation tries to be <em>somewhat &quot;do what" +
      "I mean&quot;</em>... but might not match your style." +
      "</body>" +
      "</html>";

    var myCodeMirror = CodeMirror(document.getElementById("code-editor"), {
      value: htmlCode,
      mode: "xml",
      extraKeys: { "Ctrl-Space": "autocomplete" },
      lineNumbers: true,
      indentWithTabs: true,
      lineWrapping: true
    });
  }

  /*======== 9. MARKDOWN EDITOR ========*/
  $("#markdown-editor").markdown({
    onShow: function(e) {
      var markdown = document.querySelector(".md-editor");
      var header = markdown.querySelector(".md-header");

      var buttonGroups = header.querySelectorAll(".btn-group");
      buttonGroups.forEach(function(group) {
        group.className = "btn-group ml-2";
      });

      var buttonAll = header.querySelectorAll(
        '.btn-group .btn:not([title="Preview"])'
      );

      buttonAll.forEach(function(button) {
        button.className = "btn btn-sm btn-outline-secondary";
      });

      var buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdBold"] span'
      );
      buttonSpan.className = "fa fa-bold";

      buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdItalic"] span'
      );
      buttonSpan.className = "fa fa-italic";

      buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdHeading"] span'
      );
      buttonSpan.className = "fa fa-header";

      buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdUrl"] span'
      );
      buttonSpan.className = "fa fa-link";

      buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdImage"] span'
      );
      buttonSpan.className = "fa fa-image";

      buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdList"] span'
      );
      buttonSpan.className = "fa fa-list";

      buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdListO"] span'
      );
      buttonSpan.className = "fa fa-list-ol";

      buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdCode"] span'
      );
      buttonSpan.className = "fa fa-code";

      buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdQuote"] span'
      );
      buttonSpan.className = "fa fa-quote-right";

      buttonSpan = header.querySelector(
        '[data-handler="bootstrap-markdown-cmdPreview"] span'
      );
      buttonSpan.className = "fa fa-search";

      var buttonFullscreen = markdown.querySelector(
        ".md-controls .md-control.md-control-fullscreen span"
      );
      buttonFullscreen.className = "fa fa-expand";

      buttonFullscreen = markdown.querySelector(
        ".md-fullscreen-controls .exit-fullscreen span"
      );
      buttonFullscreen.className = "fa fa-compress";
    },
    onPreview: function(e) {
      //Required marked.js plugin
      return marked(e.getContent());
    }
  });

  /*======== 10. MULTIPLE SELECT ========*/
  $(".js-example-basic-multiple").select2();

  /*======== 11. COUNTDOWN ========*/
  $(".simple_timer").syotimer({
    year: 2019,
    month: 9,
    day: 9,
    hour: 20,
    minute: 30
  });

  /*======== 12. LOADING BUTTON ========*/
  /* 12.1. BIND NORMAL BUTTONS */
  Ladda.bind(".ladda-button", {
    timeout: 5000
  });

  /* 12.2. BIND PROGRESS BUTTONS AND SIMULATE LOADING PROGRESS */
  Ladda.bind(".progress-demo button", {
    callback: function(instance) {
      var progress = 0;
      var interval = setInterval(function() {
        progress = Math.min(progress + Math.random() * 0.1, 1);
        instance.setProgress(progress);

        if (progress === 1) {
          instance.stop();
          clearInterval(interval);
        }
      }, 200);
    }
  });

  /*======== 13. TOASTER ========*/
  if (document.getElementById("home")) {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-right",
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
    toastr.success("Welcome to sleek", "Howdy!");
  }

  /*======== 14. PROGRESS BAR ========*/
  NProgress.done();

  /*======== 15. DATATABLES ========*/
  var dTable = document.getElementById("example");
  if (dTable !== null) {
    $(dTable).DataTable({
      responsive: {
        details: {
          type: "column",
          target: -1
        }
      }
    });
  }
  var dataTable1 = document.getElementById("d-table1");
  if (dataTable1 !== null) {
    $(dataTable1).DataTable({
      ajax: "assets/js/datatable.json",
      dom: 'T<"clear">lfrtip'
    });
  }
  var dataTable2 = document.getElementById("d-table2");
  if (dataTable2 !== null) {
    $(dataTable2).DataTable({
      ajax: "assets/js/datatable.json",
      dom: 'T<"clear">lfrtip',
      buttons: ["copy", "csv", "excel", "pdf", "print"]
    });
  }
});
