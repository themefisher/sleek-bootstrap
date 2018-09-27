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
  // var generateSlimScroll = function(e) {
  //   if (!$(e).attr("data-init")) {
  //     var a = $(e).attr("data-height"),
  //       t = {
  //         height: (a = a || $(e).height())
  //       };
  //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //       navigator.userAgent
  //     )
  //       ? ($(e).css("height", a), $(e).css("overflow-x", "scroll"))
  //       : $(e).slimScroll(t),
  //       $(e).attr("data-init", !0),
  //       $(".slimScrollBar").hide();
  //   }
  // };
  // $("[data-scrollbar=true]").each(function() {
  //   generateSlimScroll($(this));
  // });

  $('.sidebar-scrollbar').slimScroll({
  	height: '100%'
  });

  /*======== 2. BACKDROP ========*/
  if ($(window).width() < 768) {
    var shadowClass = $(".mobile-sticky-body-overlay");
    $(".sidebar-toggle").on("click", function(e) {
      e.preventDefault();
      if (!shadowClass.hasClass("active")) {
        shadowClass.addClass("active");
        $("body").css("overflow", "hidden");
      } else {
        shadowClass.removeClass("active");
        $("body").css("overflow", "auto");
      }
    });

    $(".mobile-sticky-body-overlay").on("click", function(e) {
      $(this).removeClass("active");
      $("#page-container").removeClass("sidebar-minified");
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
        t = "#page-container";
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
  var page_container = $("#page-container");
  if ($(window).width() >= 768) {
    var flag = false;
    var flagOffCanvas = false;

    $("#sidebar-toggler").on("click", function() {
      if (
        page_container.hasClass("sidebar-fixed-offcanvas") ||
        page_container.hasClass("sidebar-static-offcanvas")
      ) {
        $(this)
          .addClass("sidebar-offcanvas-toggle")
          .removeClass("sidebar-toggle");
        if (flagOffCanvas === false) {
          page_container.addClass("sidebar-collapse");
          flagOffCanvas = true;
          flag = false;
        } else {
          page_container.removeClass("sidebar-collapse");
          page_container.addClass("sidebar-collapse-out");
          setTimeout(function() {
            page_container.removeClass("sidebar-collapse-out");
          }, 1000);
          flagOffCanvas = false;
        }
      }

      if (
        page_container.hasClass("sidebar-fixed") ||
        page_container.hasClass("sidebar-static")
      ) {
        $(this)
          .addClass("sidebar-toggle")
          .removeClass("sidebar-offcanvas-toggle");
        if (flag === false) {
          page_container
            .removeClass("sidebar-collapse sidebar-minified-out")
            .addClass("sidebar-minified");
          flag = true;
          flagOffCanvas = false;
        } else {
          page_container.removeClass("sidebar-minified");
          page_container.addClass("sidebar-minified-out");
          flag = false;
        }
      }
    });
  }

  if ($(window).width() >= 768 && $(window).width() < 992) {
    if (
      page_container.hasClass("sidebar-fixed") ||
      page_container.hasClass("sidebar-static")
    ) {
      page_container
        .removeClass("sidebar-collapse sidebar-minified-out")
        .addClass("sidebar-minified");
      flag = true;
    }
  }

  /*======== 6. TODO LIST ========*/

  function todoCheckAll() {
    var fas = document.querySelectorAll(".todo-single-item .fa");
    fas.forEach(function(fa) {
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
        '<i class="fa"></i>' +
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
});
