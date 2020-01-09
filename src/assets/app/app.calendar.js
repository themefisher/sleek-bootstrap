/* ====== Index ======

1. CALENDAR JS

====== End ======*/

  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid' ],
      defaultView: 'dayGridMonth',

      eventRender: function(info) {
        var ntoday = moment().format('YYYYMMDD');
        var eventStart = moment( info.event.start ).format('YYYYMMDD');
        info.el.setAttribute("title", info.event.extendedProps.description);
        info.el.setAttribute("data-toggle", "tooltip");
        if (eventStart < ntoday){
          info.el.classList.add("fc-past-event");
        } else if (eventStart == ntoday){
          info.el.classList.add("fc-current-event");
        } else {
          info.el.classList.add("fc-future-event");
        }
      },

      events: [
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2020-01-01'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2020-01-03'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2020-01-05'
        },
        {
          title: 'Long Event',
          description: 'description for Long Event',
          start: '2020-01-07',
          end: '2020-01-10'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          description: 'description for Repeating Event',
          start: '2020-01-09T16:00:00'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          description: 'description for Repeating Event',
          start: '2020-01-16T16:00:00',
          end: '2020-01-16T16:00:00'
        },
        {
          title: 'Conference',
          description: 'description for Conference',
          start: '2020-01-11',
          end: '2020-01-13'
        },
        {
          title: 'Meeting',
          description: 'description for Meeting',
          start: '2020-01-12T10:30:00',
          end: '2020-01-12T12:30:00'
        },
        {
          title: 'Lunch',
          description: 'description for Lunch',
          start: '2020-01-12T12:00:00',
          end: '2020-01-12T12:00:00'
        },
        {
          title: 'Meeting',
          description: 'description for Meeting',
          start: '2020-01-12T14:30:00',
          end: '2020-01-12T14:30:00'
        },
        {
          title: 'Birthday Party',
          description: 'description for Birthday Party',
          start: '2020-01-13T24:00:00',
          end: '2020-01-13T24:00:00'
        },
        {
          title: 'Long Event',
          description: 'description for Long Event',
          start: '2020-01-20',
          end: '2020-01-23'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          description: 'description for Repeating Event',
          start: '2020-01-22T16:00:00'
        },
        {
          title: 'Conference',
          description: 'description for Conference',
          start: '2020-01-24',
          end: '2020-01-27'
        },
        {
          title: 'Meeting',
          description: 'description for Meeting',
          start: '2020-01-26T10:30:00',
          end: '2020-01-26T12:30:00'
        },
        {
          title: 'Lunch',
          description: 'description for Lunch',
          start: '2020-01-26T12:00:00',
          end: '2020-01-26T12:00:00'
        },
        {
          title: 'Meeting',
          description: 'description for Meeting',
          start: '2020-01-26T14:30:00',
          end: '2020-01-26T14:30:00'
        },
        {
          title: 'Click for Google',
          description: 'description for Click for Google',
          url: 'http://google.com/',
          start: '2020-01-28',
          end: '2020-01-28'
        },
        {
          title: 'Lunch',
          description: 'description for Lunch',
          start: '2020-01-30T12:00:00',
          end: '2020-01-31T12:00:00'
        },
        {
          title: 'Meeting',
          description: 'description for Meeting',
          start: '2020-01-31T14:30:00',
          end: '2020-01-31T14:30:00'
        }
      ]
    });

    calendar.render();

  });


  function myFunction() {
    var person = prompt("Please add your new event", "New event");
    if (person != null) {
      document.getElementById("demo").innerHTML =
      "This " + person + "! New event";
    }
  };