    var EI;
    var SPG;
    var ES;
    var GB;
    var SPGicon;
    var geojson;

  function toggleLayer(id)
        {
            if ($('#'+id).is(':checked')) {
            map.setLayoutProperty(id, 'visibility', 'visible');
            }
            else
            {
            map.setLayoutProperty(id, 'visibility', 'none');
            }
        }
 // When the checkbox changes, update the visibility of the layer.
 //           input.addEventListener('change', function(e) {
 //               map.setLayoutProperty(layerID, 'visibility',
 //                   e.target.checked ? 'visible' : 'none');
 //           });

// open/close legend
/*   $(function () {
      $('.glyphicon').unbind('click');
      $('.glyphicon').click(function (e) {
      $(this).toggleClass('glyphicon glyphicon-plus glyphicon glyphicon-minus');
      $('.content-one').slideToggle('slow'); return false;
  });
    });
*/    

  mapboxgl.accessToken = 'pk.eyJ1IjoiY3J2YW5wb2xsYXJkIiwiYSI6ImNqMHdvdnd5MTAwMWEycXBocm4zbXVjZm8ifQ.3zjbFccILu6mL7cOTtp40A';

  // This adds the map
  var map = new mapboxgl.Map({
    // container id specified in the HTML
    container: 'map', 
    style: 'mapbox://styles/mapbox/outdoors-v9', 
    center: [ -75.170669,39.950143], 
    bearing: 20, // Rotate Philly ~9° off of north, thanks Billy Penn.
    pitch: 50,
    zoom: 9,
    attributionControl: false
  });

    function goHome() {
      // debugger
      if (map.loaded()) {
        var p = map.getPitch();
     //   console.log(p);
        if (p > 0) {
          map.flyTo({
            center: [-75.170669,39.950143], 
            zoom: 9,
            speed: 0.1,
            bearing: -5,
            pitch: 35
          });
        }
      }
    }

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(),['top-left']);
map.addControl(new mapboxgl.AttributionControl(),'bottom-right');

var stateLegendEl = document.getElementById('mrp-categories');

// Zoom to Extent
document.getElementById('zoomtoregion').addEventListener('click', function () {
    map.flyTo({
        center: [ -75.170669,39.950143], 
            zoom: 9,
            speed: 0.5,
            bearing: -5,
            pitch: 35
    });
});

    map.on('load', function () {
    map.addLayer({
        "id": "EI",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": EI
        }
    });

    // add markers to map
    EI.features.forEach(function(marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'assets/img/EI.png';
    el.addEventListener('click', function() {
        window.alert('look!!');
    });

    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});
});

map.on('load', function () {
    map.addLayer({
        "id": "ES",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": ES
        }
    });

    // add markers to map
    ES.features.forEach(function(marker) {
    // create a DOM element for the marker
    var es = document.createElement('div');
    es.className = 'marker2';
    es.style.backgroundImage = 'assets/img/ES.png';
    es.addEventListener('click', function() {
        window.alert('look!!');
    });

    // add marker to map
    new mapboxgl.Marker(es)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});
});

map.on('load', function () {
    map.addLayer({
        "id": "GB",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": GB
        }
    });

    // add markers to map
    GB.features.forEach(function(marker) {
    // create a DOM element for the marker
    var gb = document.createElement('div');
    gb.className = 'marker3';
    gb.style.backgroundImage = 'assets/img/GB.png';
    gb.addEventListener('click', function() {
      //  window.alert(marker.properties.name);
        console.log(marker.properties);
         var content = '<h4 style="color:white;background-color:#96c93d;padding: 3px;">'+ marker.properties.name+'</h4>'
        +'<B>Certificate:</B> '+ marker.properties.certificat  
        +'<br><B>Developer:</B> '+ marker.properties.developer 
        +'<br><B>Info:</B> '+ marker.properties.uniquefeat
        ;

        if (marker.properties.photo1 === undefined){ var PHOTO1= " "  ;}
                else { var PHOTO1 = "<div class='carousel-inner'>"+"<div class='item active'><img src='"+ (marker.properties.photo1) +"' alt='property photo'></div>"
                +"<div class='item'><img src='"+ (marker.properties.photo2) + "' alt='property photo'></div>"
                +"<div class='item'><img src='"+ (marker.properties.photo3) + "' alt='property photo'></div>"
                +"<div class='item'><img src='"+ (marker.properties.photo4) + "' alt='property photo'></div></div>"
                +" <a class='left carousel-control' href='#carousel-example-generic' data-slide='prev'>"+"<span class='glyphicon glyphicon-chevron-left'></span>"
                +" </a>"+" <a class='right carousel-control' href='#carousel-example-generic' data-slide='next'>"+
                "<span class='glyphicon glyphicon-chevron-right'></span>"+"</a>" ;}
          //      if (props.Photo_Cred===undefined){ var Photo_Cred = " "  ;}
          //      else { var Photo_Cred = "<div class='labelfieldsource'>"+ (props.Photo_Cred) +  "</div>";}
        var  content2 = PHOTO1
                 //   + Photo_Cred
        document.getElementById('info').innerHTML = content;
        document.getElementById('carousel-example-generic').innerHTML = content2;
        $('.carousel').carousel('pause');

        map.flyTo({
        center: marker.geometry.coordinates,
        pitch: 50,
        zoom: 13
        });
    });

    // add marker to map
    new mapboxgl.Marker(gb)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });
});

map.on('load', function () {
    map.addLayer({
        "id": "SPG",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": SPG
        }
    });

    map.on('click', 'SPG', function (e) {
          window.alert('look!!');
    });

    // add markers to map
    SPG.features.forEach(function(marker) {
    // create a DOM element for the marker
    var spg = document.createElement('div');
    spg.className = 'marker4';
    spg.style.backgroundImage = 'assets/img/SPG.png';

    // add marker to map
    new mapboxgl.Marker(spg)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
   });    

});

// curb cuts layer
/* map.on('load', function () {

    map.addLayer({
        'id': 'SPG',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': SPG
        },
        'paint': {
            'circle-radius': 4,
            'circle-stroke-color' : '#ffffff',
            'circle-stroke-width': 1,
            'circle-color': 'rgba(105,136,58,.8)'
            }
        });
*/
    // When the user moves their mouse over the states-fill layer, we'll update the filter in
    // the state-fills-hover layer to only show the matching state, thus making a hover effect.
//    map.on('mousemove', 'SPG', function (e) {
//        map.setFilter('SPG-hover', ['==', 'name', e.features[0].properties.name]);
//    });

    // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
//    map.on('mouseleave', 'TSP', function (e) {
//        map.setFilter('TSP-hover', ['==', 'name', '']);
//    });
 // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
  /*  map.on('click', 'SPG', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['SPG']
      });

      if (!features.length) {
        return;
      }

      var feature = features[0];
        var content = '<h4 style="color:white;background-color:rgb(105,136,58);padding: 3px;">'+ feature.properties.name+'</h4>'
        +'<B>Project Scope:</B> '+ feature.properties.PROJSCOPE  
        +'<br><B>Location:</B> '+ feature.properties.LOC
        +'<br><B>State:</B> '+ feature.properties.State
        +'<br><B>Timing:</B> '+ feature.properties.Timing
        +'<br><table class="infotable"><thead><tr><th>Total Funded Cost<br><i>(millions in Y-O-E $)</i></th><th>Unfunded Cost<br><i>(millions in 2013 $)</i></th></tr></thead>'
        +'<tbody><tr><td>'+ numeral(feature.properties.FundCost).format('($0,0.0)') +'</td><td> '+ numeral(feature.properties.UnfundCost).format('($0,0.0)') +'</td></tr></tbody>'
        +'</table><br>'
        ;
      info.innerHTML = content;

      map.flyTo({
        center: feature.geometry.coordinates,
        pitch: 50,
        zoom: 14
      }); 

    });
*/
    // Change the cursor to a pointer when the mouse is over the places layer.
 //   map.on('mouseenter', 'SPG', function () {
 //       map.getCanvas().style.cursor = 'pointer';
 //   });

    // Change it back to a pointer when it leaves.
 //   map.on('mouseleave', 'SPG', function () {
 //       map.getCanvas().style.cursor = '';
 //   });

    // Create a popup, but don't add it to the map yet.
  //  var popup = new mapboxgl.Popup({
  //      closeButton: false,
  //      closeOnClick: false
  //  });

 //   map.on('mouseenter', 'SPG', function(e) {
        // Change the cursor style as a UI indicator.
 //       map.getCanvas().style.cursor = 'pointer';
        // Populate the popup and set its coordinates
        // based on the feature found.
   //     popup.setLngLat(e.features[0].geometry.coordinates)
   //         .setHTML(e.features[0].properties.name)
   //         .addTo(map);
   // });

  //  map.on('mouseleave', 'SPG', function() {
  //      map.getCanvas().style.cursor = '';
  //      popup.remove();
  //  });

  //  });


