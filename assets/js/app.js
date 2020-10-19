    var EI;
    var SPG;
    var ES;
    var GB;
    var geojson;

  $('#aboutModal').modal('show');

  mapboxgl.accessToken = 'pk.eyJ1IjoiY3J2YW5wb2xsYXJkIiwiYSI6ImNqMHdvdnd5MTAwMWEycXBocm4zbXVjZm8ifQ.3zjbFccILu6mL7cOTtp40A';

  // This adds the map
    var map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/light-v9', 
        center: [ -75.170669,39.950143], 
        bearing: 0, // Rotate Philly ~9° off of north, thanks Billy Penn.
        pitch: 20,
        zoom: 8,
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
            zoom: 8,
            speed: 0.1,
            bearing: 0,
            pitch: 20
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
                zoom: 8,
                speed: 0.5,
                bearing: 0,
                pitch: 20
        });
    });

  //  map.on('click', function (e) {
     //   alert("hello");
    //    $('#info').html('');
    //    $('#carousel-example-generic').html('');
   // });

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
                'line-color': '#5d5d5d'
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
            else { var BIO1 = '<hr class="hr1"><B>Description:</B> '+ marker.properties.bio1;}
            if (marker.properties.bio2 === undefined){ var BIO2 = ' '  ;}
            else { var BIO2 = '&nbsp;'+ marker.properties.bio2;}
            if (marker.properties.bio3 === undefined){ var BIO3 = ' '  ;}
            else { var BIO3 = '&nbsp;'+ marker.properties.bio3;}
            if (marker.properties.bio4 === undefined){ var BIO4 = ' '  ;}
            else { var BIO4 = '&nbsp;'+ marker.properties.bio4;}

           var info ="<H4>"+ marker.properties.name + "</h4>";

           var content = '<B>Contact Name:</B> '+ marker.properties.cname
               // +'<br><B>Title:</B> '+ marker.properties.ctitle
                +'<br><B>Phone:</B> '+ marker.properties.cphone
               // +'<br><B>Email:</B> '+ marker.properties.cemail
                + BIO1
                + BIO2
                + BIO3
                + BIO4
            ;

            if (marker.properties.photo1 === undefined){ var PHOTO1= " "  ;}
            else { var PHOTO1 = "<div class='carousel-inner'>"+"<div class='item active'><img src='"+ (marker.properties.photo1) +"' alt='property photo'></div>";}
            if (marker.properties.photo2 !== undefined){ PHOTO1 += "<div class='item'><img src='"+ (marker.properties.photo2) + "' alt='property photo'></div>";}
            if (marker.properties.photo3 !== undefined){ PHOTO1 += "<div class='item'><img src='"+ (marker.properties.photo3) + "' alt='property photo'></div>";}
            if (marker.properties.photo4 !== undefined){ PHOTO1 += "<div class='item'><img src='"+ (marker.properties.photo4) + "' alt='property photo'></div>";}
            if (marker.properties.photo1 !== undefined){ PHOTO1 += "</div>";}
            if (marker.properties.photo2 !== undefined){ PHOTO1 += " <a class='left carousel-control' href='#carousel-example-generic' data-slide='prev'>"+"<span class='glyphicon glyphicon-chevron-left'></span>"
            +" </a>"+" <a class='right carousel-control' href='#carousel-example-generic' data-slide='next'>"+
            "<span class='glyphicon glyphicon-chevron-right'></span>"+"</a>" ;}
            //      if (props.Photo_Cred===undefined){ var Photo_Cred = " "  ;}
            //      else { var Photo_Cred = "<div class='labelfieldsource'>"+ (props.Photo_Cred) +  "</div>";}
            var  content2 = PHOTO1
                     //   + Photo_Cred
           
            document.getElementById('resultsheader').innerHTML = info;
            document.getElementById('resultsheader').className = 'rhEL';   
            document.getElementById('info').innerHTML = content;
            document.getElementById('carousel-example-generic').innerHTML = content2;
            $('.carousel').carousel('pause');

            map.flyTo({
            center: marker.geometry.coordinates,
            pitch: 20,
            speed: 0.5,
            zoom: 12
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
        if (marker.properties.bio1 === undefined){ var BIO1 = ' '  ;}
        else { var BIO1 = '<br><B>Description:</B> '+ marker.properties.bio1;}
        if (marker.properties.bio2 === undefined){ var BIO2 = ' '  ;}
        else { var BIO2 = '&nbsp;'+ marker.properties.bio2;}
        if (marker.properties.bio3 === undefined){ var BIO3 = ' '  ;}
        else { var BIO3 = '&nbsp;'+ marker.properties.bio3;}
        if (marker.properties.bio4 === undefined){ var BIO4 = ' '  ;}
        else { var BIO4 = '&nbsp;'+ marker.properties.bio4;}

        if (marker.properties.cname === undefined){ var C01 = ' '  ;}
        else { var C01 = '<B>Contact Name:</B> '+ marker.properties.cname;}
        if (marker.properties.ctitle === undefined){ var C02 = ' '  ;}
        else { var C02 = ', '+ marker.properties.ctitle;}
        if (marker.properties.cphone === undefined){ var C03 = ' '  ;}
        else { var C03 = '<br><B>Phone:</B> '+ marker.properties.cphone;}
        if (marker.properties.cemail === undefined){ var C04 = ' '  ;}
        else { var C04 = '<br><B>Email:</B> '+ marker.properties.cemail ;} 

        var info ="<h4>"+ marker.properties.name + "</h4>";
        var content = C01
        + C02
        + C04
        + C03
        +'<hr class="hr1"><B>Energy Rating:</B> '+ marker.properties.energyrati
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

        document.getElementById('resultsheader').innerHTML = info;
        document.getElementById('resultsheader').className = 'rhES';           
        document.getElementById('info').innerHTML = content;
        document.getElementById('carousel-example-generic').innerHTML = content2;
        $('.carousel').carousel('pause');

        map.flyTo({
        center: marker.geometry.coordinates,
        pitch: 20,
        speed: 0.5,
        zoom: 12
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
        
        if (marker.properties.cname === undefined){ var C01 = ' '  ;}
        else { var C01 = '<B>Contact Name:</B> '+ marker.properties.cname;}
        if (marker.properties.ctitle === undefined){ var C02 = ' '  ;}
        else { var C02 = ', '+ marker.properties.ctitle;}
        if (marker.properties.cphone === undefined){ var C03 = ' '  ;}
        else { var C03 = '<br><B>Phone:</B> '+ marker.properties.cphone;}
        if (marker.properties.cemail === undefined){ var C04 = ' '  ;}
        else { var C04 = '<br><B>Email:</B> '+ marker.properties.cemail ;} 

        info = '<H4>'+ marker.properties.name+'</H4>'
        var content = C01
        + C02
        + C04
        + C03
        +'<hr class="hr1"><B>Developer:</B> '+ marker.properties.developer 
        +'<br><B>Certification Level:</B> '+ marker.properties.certificat
        +'<br><B>Unique Features:</B> '+ marker.properties.unique
        ;

        if (marker.properties.photo1 === undefined){ var PHOTO1= " "  ;}
        else { var PHOTO1 = "<div class='carousel-inner'>"+"<div class='item active'><img src='"+ (marker.properties.photo1) +"' alt='property photo'></div>"
        +"<div class='item'><img src='"+ (marker.properties.photo2) + "' alt='property photo'></div>"
        +"<div class='item'><img src='"+ (marker.properties.photo3) + "' alt='property photo'></div>"
        +"<div class='item'><img src='"+ (marker.properties.photo4) + "' alt='property photo'></div></div>"
        +" <a class='left carousel-control' href='#carousel-example-generic' data-slide='prev'>"+"<span class='glyphicon glyphicon-chevron-left'></span>"
        +" </a>"+" <a class='right carousel-control' href='#carousel-example-generic' data-slide='next'>"+
        "<span class='glyphicon glyphicon-chevron-right'></span>"+"</a>" ;}
        if (marker.properties.credit_1 === undefined){ var Photo_Cred = " "  ;}
        else { var Photo_Cred = "<div class='labelfieldsource'>"+ (marker.properties.credit_1) +  "</div>";}
           
        var  content2 = PHOTO1 + Photo_Cred;
        
        document.getElementById('resultsheader').innerHTML = info;
        document.getElementById('resultsheader').className = 'rhGB';  
        document.getElementById('info').innerHTML = content;
        document.getElementById('carousel-example-generic').innerHTML = content2;
        $('.carousel').carousel('pause');

        map.flyTo({
        center: marker.geometry.coordinates,
        pitch: 20,
        speed: 0.5,
        zoom: 12
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

            if (marker.properties.bio1 === undefined){ var BIO1 = ' '  ;}
            else { var BIO1 = '<br><B>Description:</B> '+ marker.properties.bio1;}
            if (marker.properties.bio2 === undefined){ var BIO2 = ' '  ;}
            else { var BIO2 = '&nbsp;'+ marker.properties.bio2;}
            if (marker.properties.bio3 === undefined){ var BIO3 = ' '  ;}
            else { var BIO3 = '&nbsp;'+ marker.properties.bio3;}
            if (marker.properties.bio4 === undefined){ var BIO4 = ' '  ;}
            else { var BIO4 = '&nbsp;'+ marker.properties.bio4;}

            if (marker.properties.cname === undefined){ var C01 = ' '  ;}
            else { var C01 = '<B>Name:</B> '+ marker.properties.cname;}
            if (marker.properties.ctitle === undefined){ var C02 = ' '  ;}
            else { var C02 = ', '+ marker.properties.ctitle;}
            if (marker.properties.cphone === undefined){ var C03 = ' '  ;}
            else { var C03 = '<br><B>Phone:</B> '+ marker.properties.cphone;}
            if (marker.properties.cemail === undefined){ var C04 = ' '  ;}
            else { var C04 = '<br><B>Email:</B> '+ marker.properties.cemail ;} 

            info = '<H4>'+ marker.properties.name+'</H4>'
            var content = C01
            + C02
            + C03
            + C04
            +'<hr class="hr1"><B>Annual Production:</B> '+ marker.properties.production
            +'<br><B>Greenhouse Gas Emissions Avoided:</B> '+ marker.properties.GGEA
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
           if (marker.properties.credit_1 === undefined){ var Photo_Cred = " "  ;}
           else { var Photo_Cred = "<div class='labelfieldsource'>"+ (marker.properties.credit_1) +  "</div>";}
           
            var  content2 = PHOTO1 + Photo_Cred;

            document.getElementById('resultsheader').innerHTML = info;
            document.getElementById('resultsheader').className = 'rhSPG';  
            document.getElementById('info').innerHTML = content;
            document.getElementById('carousel-example-generic').innerHTML = content2;
            $('.carousel').carousel('pause');

            map.flyTo({
            center: marker.geometry.coordinates,
            pitch: 20,
            speed: 0.5,
            zoom: 12
                });
            });

            new mapboxgl.Marker(spg)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        });    

    });
  


