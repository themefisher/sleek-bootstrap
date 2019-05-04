/* ====== Index ======

1. JVECTORMAP DASHBOARD
2. JVECTORMAP ANALYTICS
3. JVECTORMAP WIDGET

====== End ======*/

/*======== 1. JVECTORMAP DASHBOARD ========*/
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

var worldMap = $("#world")

if (worldMap.length != 0) {
  worldMap.vectorMap({
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

/*======== 2. JVECTORMAP ANALYTICS ========*/
var mapData2 = {
  IN: 19000,
  US: 13000,
  TR: 9500,
  DO: 7500,
  PL: 4600,
  UK: 4000
};

var analyticWorldMap = $("#analytic-world")

if (analyticWorldMap.length != 0) {
  analyticWorldMap.vectorMap({
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

/*======== 3. JVECTORMAP WIDGET ========*/
var demoWorldMap = $("#demoworld")
if (demoWorldMap.length != 0) {
  demoWorldMap.vectorMap({
    map: "world_mill",
    backgroundColor: "transparent",
    regionStyle: {
      initial: {
        fill: "#9c9c9c"
      }
    }
  });
}
