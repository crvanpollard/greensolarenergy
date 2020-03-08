    var EI;
    var SPG;
    var ES;
    var GB;
    var geojson;

 // $('#aboutModal').modal('show');

  mapboxgl.accessToken = 'pk.eyJ1IjoiY3J2YW5wb2xsYXJkIiwiYSI6ImNqMHdvdnd5MTAwMWEycXBocm4zbXVjZm8ifQ.3zjbFccILu6mL7cOTtp40A';

  // This adds the map
    var map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/light-v9', 
        center: [ -75.170669,39.950143], 
        bearing: 0, // Rotate Philly ~9° off of north, thanks Billy Penn.
        pitch: 35,
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
            bearing: 0,
            pitch: 35
          });
        }
      }
    }

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(),['top-right']);
    map.addControl(new mapboxgl.AttributionControl(),'bottom-right');

    // Zoom to Extent
    document.getElementById('zoomtoregion').addEventListener('click', function () {
        map.flyTo({
            center: [ -75.170669,39.950143], 
                zoom: 9,
                speed: 0.5,
                bearing: 0,
                pitch: 35
        });
    });

map.on('load', function () {

        map.addLayer({
            "id": "county",
            "type": "line",
            "source": {
                type: 'vector',
                url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
            },
            "source-layer": "county",
            "layout": {},
            "paint": {
                'line-width': 2,
                'line-color': '#434343'
            },
            "filter": [
                    "==",
                    "dvrpc",
                    "Yes"
            ]
        });

         map.addLayer({
            "id": "EI",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": EI
            }
        });

        EI.features.forEach(function(marker) {
            var el = document.createElement('div');
            el.className = 'marker1';
            el.style.backgroundImage = 'assets/img/EI.png';

            var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
            });

            el.addEventListener('mouseenter',function(){
            var coordinates = marker.geometry.coordinates.slice();
            popup.setLngLat(coordinates)
            .setHTML('<h4>'+ marker.properties.name+'</h4><p style="border-bottom: 8px solid #eb2226;"</p>')
            .addTo(map);
            })

            el.addEventListener('mouseleave',function(){
            popup.remove();
            })

            el.addEventListener('click', function() {
            //  window.alert(marker.properties.name);
            //   console.log(marker.properties);
            if (marker.properties.bio1 === undefined){ var BIO1 = ' '  ;}
            else { var BIO1 = '<br><B>Description:</B> '+ marker.properties.bio1;}
            if (marker.properties.bio2 === undefined){ var BIO2 = ' '  ;}
            else { var BIO2 = '&nbsp;'+ marker.properties.bio2;}
            if (marker.properties.bio3 === undefined){ var BIO3 = ' '  ;}
            else { var BIO3 = '&nbsp;'+ marker.properties.bio3;}
            if (marker.properties.bio4 === undefined){ var BIO4 = ' '  ;}
            else { var BIO4 = '&nbsp;'+ marker.properties.bio4;}

            var content = '<h4 style="color:white;background-color:#eb2226;padding: 3px;">'+ marker.properties.name+'</h4>'
                +'<B><U>Contact Info</U></B>'
                +'<br><B>Name:</B> '+ marker.properties.cname
               // +'<br><B>Title:</B> '+ marker.properties.ctitle
                +'<br><B>Phone:</B> '+ marker.properties.cphone
               // +'<br><B>Email:</B> '+ marker.properties.cemail
                + BIO1
                + BIO2
                + BIO3
                + BIO4
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
            zoom: 14
                });
            });

            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        });
 
        map.addLayer({
            "id": "ES",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": ES
            }
        });

        ES.features.forEach(function(marker) {
        var es = document.createElement('div');
        es.className = 'marker2';
        es.style.backgroundImage = 'assets/img/ES.png';

        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        es.addEventListener('mouseenter',function(){
        var coordinates = marker.geometry.coordinates.slice();
        popup.setLngLat(coordinates)
        .setHTML('<h4>'+ marker.properties.name+'</h4><p style="border-bottom: 8px solid #19bbb8;"</p>')
        .addTo(map);
        })

        es.addEventListener('mouseleave',function(){
        popup.remove();
        })
       
        es.addEventListener('click', function() {
        //  window.alert(marker.properties.name);
        //   console.log(marker.properties);
        if (marker.properties.bio_1 === undefined){ var BIO1 = ' '  ;}
        else { var BIO1 = '<br><B>Description:</B> '+ marker.properties.bio_1;}
        if (marker.properties.bio_2 === undefined){ var BIO2 = ' '  ;}
        else { var BIO2 = '&nbsp;'+ marker.properties.bio_2;}
        if (marker.properties.bio_3 === undefined){ var BIO3 = ' '  ;}
        else { var BIO3 = '&nbsp;'+ marker.properties.bio_3;}
        if (marker.properties.bio_4 === undefined){ var BIO4 = ' '  ;}
        else { var BIO4 = '&nbsp;'+ marker.properties.bio_4;}

        var content = '<h4 style="color:white;background-color:#19bbb8;padding: 3px;">'+ marker.properties.name+'</h4>'
        +'<B>Owner:</B> '+ marker.properties.owner
        +'<br><B>Power Rating:</B> '+ marker.properties.powerratin
        +'<br><B>Energy Rating:</B> '+ marker.properties.energyrati
        +'<br><B>Application Use:</B> '+ marker.properties.appuse
        + BIO1
        + BIO2
        + BIO3
        + BIO4
        ;

        if (marker.properties.photo1 === undefined){ var PHOTO1= " "  ;}
        else { var PHOTO1 = "<div class='carousel-inner'>"+"<div class='item active'><img src='"+ (marker.properties.photo1) +"' alt='property photo'></div></div>"
        ;}
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
        zoom: 14
            });
        });

        new mapboxgl.Marker(es)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        });

        map.addLayer({
            "id": "GB",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": GB
            }
        });

        GB.features.forEach(function(marker) {
    
        var gb = document.createElement('div');
        gb.className = 'marker3';
        gb.style.backgroundImage = 'assets/img/GB.png';


        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        gb.addEventListener('mouseenter',function(){
        var coordinates = marker.geometry.coordinates.slice();
        popup.setLngLat(coordinates)
        .setHTML('<h4>'+ marker.properties.name+'</h4><p style="border-bottom: 8px solid #96c93d;"</p>')
        .addTo(map);
        })

        gb.addEventListener('mouseleave',function(){
        popup.remove();
        })
        
        gb.addEventListener('click', function() {
        //  window.alert(marker.properties.name);
        //   console.log(marker.properties);
         var content = '<h4 style="color:white;background-color:#96c93d;padding: 3px;">'+ marker.properties.name+'</h4>'
        +'<B>Certification Level:</B> '+ marker.properties.certificat  
        +'<br><B>Developer:</B> '+ marker.properties.developer 
        +'<br><B>Unique Features:</B> '+ marker.properties.uniquefeat
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
        zoom: 14
            });
        });

        new mapboxgl.Marker(gb)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        });

        map.addLayer({
        "id": "SPG",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": SPG
        }
        });

        SPG.features.forEach(function(marker) {
            var spg = document.createElement('div');
            spg.className = 'marker4';
            spg.style.backgroundImage = 'assets/img/SPG.png';

             // Create a popup, but don't add it to the map yet.
            var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            spg.addEventListener('mouseenter',function(){
            var coordinates = marker.geometry.coordinates.slice();
          //  var description = marker.properties.name;

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates)
            .setHTML('<h4>'+ marker.properties.name+'</h4><p style="border-bottom: 8px solid #fdbf12;"</p>')
            //  `<h2>${mpms}</h2><p style="border-bottom: 8px solid #${colors[category].forMap};">${name}</p>`
            .addTo(map);
            })

            spg.addEventListener('mouseleave',function(){
            popup.remove();
            })

            spg.addEventListener('click', function() {

            if (marker.properties.bio_1 === undefined){ var BIO1 = ' '  ;}
            else { var BIO1 = '<br><B>Description:</B> '+ marker.properties.bio_1;}
            if (marker.properties.bio_2 === undefined){ var BIO2 = ' '  ;}
            else { var BIO2 = '&nbsp;'+ marker.properties.bio_2;}
            if (marker.properties.bio_3 === undefined){ var BIO3 = ' '  ;}
            else { var BIO3 = '&nbsp;'+ marker.properties.bio_3;}
            if (marker.properties.bio_4 === undefined){ var BIO4 = ' '  ;}
            else { var BIO4 = '&nbsp;'+ marker.properties.bio_4;}


             var content = '<h4 style="color:white;background-color:#fdbf12;padding: 3px;">'+ marker.properties.name+'</h4>'
            +'<B>Owner:</B> '+ marker.properties.owner 
            +'<br><B>Name Plate Capacity:</B> '+ marker.properties.plate 
            +'<br><B># of Solar Panels:</B> '+ numeral(marker.properties.solarpan).format('0,0')
            +'<br><B>GHG Emissions Avoided:</B> '+ marker.properties.GGasE_Avoi
            + BIO1
            + BIO2
            + BIO3
            + BIO4
            ;

            if (marker.properties.photo1 === undefined){ var PHOTO1= " "  ;}
            else { var PHOTO1 = "<div class='carousel-inner'>"+"<div class='item active'><img src='"+ (marker.properties.photo1) +"' alt='property photo'></div>"
            +"<div class='item'><img src='"+ (marker.properties.photo2) + "' alt='property photo'></div>"
            +"<div class='item'><img src='"+ (marker.properties.photo3) + "' alt='property photo'></div>"
            +"<div class='item'><img src='"+ (marker.properties.photo4) + "' alt='property photo'></div></div>"
            +" <a class='left carousel-control' href='#carousel-example-generic' data-slide='prev'>"+"<span class='glyphicon glyphicon-chevron-left'></span>"
            +" </a>"+" <a class='right carousel-control' href='#carousel-example-generic' data-slide='next'>"+
            "<span class='glyphicon glyphicon-chevron-right'></span>"+"</a>" ;}
          //  if (marker.properties.credit_1 === undefined){ var Photo_Cred = " "  ;}
         //   else { var Photo_Cred = "<div class='labelfieldsource'>"+ (marker.properties.credit_1) +  "</div>";}
            var  content2 = PHOTO1
            //    + Photo_Cred;

            document.getElementById('info').innerHTML = content;
            document.getElementById('carousel-example-generic').innerHTML = content2;
            $('.carousel').carousel('pause');

            map.flyTo({
            center: marker.geometry.coordinates,
            pitch: 50,
            zoom: 14
                });
            });

            new mapboxgl.Marker(spg)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        });    

    });
  


