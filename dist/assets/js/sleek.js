/* ====== Index ======

1. BACKDROP
2. SIDEBAR MENU
3. SIDEBAR TOGGLE FOR MOBILE
4. SIDEBAR TOGGLE FOR VARIOUS SIDEBAR LAYOUT
5. TODO LIST
6. RIGHT SIDEBAR

====== End ======*/

$(document).ready(function() {
  "use strict";

  /*======== 1. BACKDROP ========*/
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

  /*======== 2. SIDEBAR MENU ========*/
  $(".sidebar .nav > .has-sub > a").click(function(){
    $(this).parent().siblings().removeClass('expand')
    $(this).parent().toggleClass('expand')
  })

  $(".sidebar .nav > .has-sub .has-sub > a").click(function(){
    $(this).parent().toggleClass('expand')
  })


  /*======== 3. SIDEBAR TOGGLE FOR MOBILE ========*/
  if ($(window).width() < 768) {
    $(document).on("click", ".sidebar-toggle", function(e) {
      e.preventDefault();
      var min = "sidebar-minified",
        min_out = "sidebar-minified-out",
        body = "#body";
      $(body).hasClass(min)
        ? $(body)
            .removeClass(min)
            .addClass(min_out)
        : $(body)
            .addClass(min)
            .removeClass(min_out)
    });
  }

  /*======== 4. SIDEBAR TOGGLE FOR VARIOUS SIDEBAR LAYOUT ========*/
  var body = $("#body");
  if ($(window).width() >= 768) {
    window.isMinified = false;
    window.isCollapsed = false;

    $("#sidebar-toggler").on("click", function () {
      if (
        body.hasClass("sidebar-fixed-offcanvas") ||
        body.hasClass("sidebar-static-offcanvas")
      ) {
        $(this)
          .addClass("sidebar-offcanvas-toggle")
          .removeClass("sidebar-toggle");
        if (window.isCollapsed === false) {
          body.addClass("sidebar-collapse");
          window.isCollapsed = true;
          window.isMinified = false;
        } else {
          body.removeClass("sidebar-collapse");
          body.addClass("sidebar-collapse-out");
          setTimeout(function () {
            body.removeClass("sidebar-collapse-out");
          }, 300);
          window.isCollapsed = false;
        }
      }

      if (
        body.hasClass("sidebar-fixed") ||
        body.hasClass("sidebar-static")
      ) {
        $(this)
          .addClass("sidebar-toggle")
          .removeClass("sidebar-offcanvas-toggle");
        if (window.isMinified === false) {
          body
            .removeClass("sidebar-collapse sidebar-minified-out")
            .addClass("sidebar-minified");
          window.isMinified = true;
          window.isCollapsed = false;
        } else {
          body.removeClass("sidebar-minified");
          body.addClass("sidebar-minified-out");
          window.isMinified = false;
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
      window.isMinified = true;
    }
  }

  /*======== 5. TODO LIST ========*/
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
        '<span>' +
        item.value +
        '</span>' +
        '<span class="badge badge-primary">Today</span>' +
        '</div>' +
        list.innerHTML;
      item.value = "";
      //Close input field
      todoInput.classList.toggle("d-block");
      todoCheckAll();
    });

    todoCheckAll();
  }

  /*======== 6. RIGHT SIDEBAR ========*/
  if ($(window).width() < 1025) {
    body.addClass('right-sidebar-toggoler-out');

    var btnRightSidebarToggler = $('.btn-right-sidebar-toggler');

    btnRightSidebarToggler.on('click', function () {

      if (!body.hasClass('right-sidebar-toggoler-out')) {
        body.addClass('right-sidebar-toggoler-out').removeClass('right-sidebar-toggoler-in');
      } else {
        body.addClass('right-sidebar-toggoler-in').removeClass('right-sidebar-toggoler-out')
      }

    });

  }

  var navRightSidebarLink = $('.nav-right-sidebar .nav-link');

  navRightSidebarLink.on('click', function () {

    if(!body.hasClass('right-sidebar-in')){
      body.addClass('right-sidebar-in').removeClass('right-sidebar-out');

    } else if ($(this).hasClass('show')){
      body.addClass('right-sidebar-out').removeClass('right-sidebar-in');
    }
  });


  var cardClosebutton = $('.card-right-sidebar .close');
  cardClosebutton.on('click', function () {
    body.removeClass('right-sidebar-in').addClass('right-sidebar-out');
  })
});
