/* ====== Index ======

1. SCROLLBAR SIDEBAR
2. BACKDROP
3. SIDEBAR MENU
4. SIDEBAR TOGGLE FOR MOBILE
5. SIDEBAR TOGGLE FOR VARIOUS SIDEBAR LAYOUT
6. TODO LIST

====== End ======*/

$(document).ready(function() {
  "use strict";

  /*======== 1. SCROLLBAR SIDEBAR ========*/
  $(".sidebar-scrollbar")
    .slimScroll({
      opacity: 0,
      height: "100%",
      color: "#808080",
      size: "5px",
      wheelStep: 10
    })
    .mouseover(function () {
      $(this)
        .next(".slimScrollBar")
        .css("opacity", 0.5);
    });

  /*======== 2. BACKDROP ========*/
  if ($(window).width() < 768) {
    var shadowClass = $(".mobile-sticky-body-overlay");
    $(".sidebar-toggle").on("click", function() {
      shadowClass.addClass("active");
      $("body").css("overflow", "hidden");
    });

    $(".mobile-sticky-body-overlay").on("click", function(e) {
      $(this).removeClass("active");
      $("#body").removeClass("sidebar-minified").addClass("sidebar-minified-out");
      $("body").css("overflow", "auto");
    });
  }

  /*======== 3. SIDEBAR MENU ========*/
  $(".sidebar .nav > .has-sub > a").click(function(){
    $(this).parent().siblings().removeClass('expand')
    $(this).parent().toggleClass('expand')
  })

  $(".sidebar .nav > .has-sub .has-sub > a").click(function(){
    $(this).parent().toggleClass('expand')
  })


  /*======== 4. SIDEBAR TOGGLE FOR MOBILE ========*/
  if ($(window).width() < 768) {
    $(document).on("click", ".sidebar-toggle", function(e) {
      e.preventDefault();
      var a = "sidebar-minified",
        mo = "sidebar-minified-out",
        t = "#body";
      $(t).hasClass(a)
        ? $(t)
            .removeClass(a)
            .addClass(mo)
        : ($(t)
            .addClass(a)
            .removeClass(mo),
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ) &&
            ($('#sidebar [data-scrollbar="true"]').css("margin-top", "0"),
            $('#sidebar [data-scrollbar="true"]').css("overflow-x", "scroll"))),
        $(window).trigger("resize");
    });
  }

  /*======== 5. SIDEBAR TOGGLE FOR VARIOUS SIDEBAR LAYOUT ========*/
  var body = $("#body");
  if ($(window).width() >= 768) {
    var flag = false;
    var flagOffCanvas = false;

    $("#sidebar-toggler").on("click", function () {
      if (
        body.hasClass("sidebar-fixed-offcanvas") ||
        body.hasClass("sidebar-static-offcanvas")
      ) {
        $(this)
          .addClass("sidebar-offcanvas-toggle")
          .removeClass("sidebar-toggle");
        if (flagOffCanvas === false) {
          body.addClass("sidebar-collapse");
          flagOffCanvas = true;
          flag = false;
        } else {
          body.removeClass("sidebar-collapse");
          body.addClass("sidebar-collapse-out");
          setTimeout(function () {
            body.removeClass("sidebar-collapse-out");
          }, 300);
          flagOffCanvas = false;
        }
      }

      if (
        body.hasClass("sidebar-fixed") ||
        body.hasClass("sidebar-static")
      ) {
        $(this)
          .addClass("sidebar-toggle")
          .removeClass("sidebar-offcanvas-toggle");
        if (flag === false) {
          body
            .removeClass("sidebar-collapse sidebar-minified-out")
            .addClass("sidebar-minified");
          flag = true;
          flagOffCanvas = false;
        } else {
          body.removeClass("sidebar-minified");
          body.addClass("sidebar-minified-out");
          flag = false;
        }
      }
    });
  }

  if ($(window).width() >= 768 && $(window).width() < 992) {
    if (
      body.hasClass("sidebar-fixed") ||
      body.hasClass("sidebar-static")
    ) {
      body
        .removeClass("sidebar-collapse sidebar-minified-out")
        .addClass("sidebar-minified");
      flag = true;
    }
  }

  /*======== 6. TODO LIST ========*/

  function todoCheckAll() {
    var mdis = document.querySelectorAll(".todo-single-item .mdi");
    mdis.forEach(function(fa) {
      fa.addEventListener("click", function(e) {
        e.stopPropagation();
        e.target.parentElement.classList.toggle("finished");
      });
    });
  }

  if (document.querySelector("#todo")) {
    var list = document.querySelector("#todo-list"),
      todoInput = document.querySelector("#todo-input"),
      todoInputForm = todoInput.querySelector("form"),
      item = todoInputForm.querySelector("input");

    document.querySelector("#add-task").addEventListener("click", function(e) {
      e.preventDefault();
      todoInput.classList.toggle("d-block");
      item.focus();
    });

    todoInputForm.addEventListener("submit", function(e) {
      e.preventDefault();
      if (item.value.length <= 0) {
        return;
      }
      list.innerHTML =
        '<div class="todo-single-item d-flex flex-row justify-content-between">' +
        '<i class="mdi"></i>' +
        '<span class="">' +
        item.value +
        '</span>"' +
        '<span class="badge badge-primary">Today</span>' +
        "</div>" +
        list.innerHTML;
      item.value = "";
      //Close input field
      todoInput.classList.toggle("d-block");
      todoCheckAll();
    });

    todoCheckAll();
  }


  // Right Sidebar 
  if ($(window).width() < 1025) {
    body.addClass('right-sidebar-toggoler-out');

    var btnRightSidebarToggler = $('.btn-right-sidebar-toggler');
    var materialIcons = btnRightSidebarToggler.find('.material-icons');

    btnRightSidebarToggler.on('click', function () {

      if (!body.hasClass('right-sidebar-toggoler-out')) {
        body.addClass('right-sidebar-toggoler-out').removeClass('right-sidebar-toggoler-in');
      } else {
        body.addClass('right-sidebar-toggoler-in').removeClass('right-sidebar-toggoler-out')
      }      
      
    });

  }

  /* Right Sidebar  */
  var navRightSidebarLink = $('.nav-right-sidebar .nav-link');

  navRightSidebarLink.on('click', function () {
    
    if(!body.hasClass('right-sidebar-in')){
      body.addClass('right-sidebar-in').removeClass('right-sidebar-out');
      
    } else if ($(this).hasClass('show')){
      body.addClass('right-sidebar-out').removeClass('right-sidebar-in');      
    }
  });

  /* Remove Right Sidebar With Card */
  var cardClosebutton = $('.card-right-sidebar .close');
  cardClosebutton.on('click', function () {
    body.removeClass('right-sidebar-in').addClass('right-sidebar-out');
  })
});
