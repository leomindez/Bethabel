
function initMap() {
  
  var myLatLng = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  map.setZoom(5);
  
  document.getElementById('search_place').addEventListener('click', function() { 
      var address = document.getElementById('address').value;
      findAPlace(address,map);
  });
  
  findPlaces(map);
}

function findPlaces(map) {
  // En este metodo puedes hacer la conexion a la base de datos 
  // Obtener los campos que necesitas y llamar al metodo findAPlace
  
  var places = ["mexico", "monterrey", "chihuahua","durango","mazatlan","sonora"];
  
  for (var index = 0; index < places.length; index++) {
      
      findAPlace(places[index],map);
  }
}

// Este metodo te ayuda a realizar el llamamdo para la biblioteca de Google Maps 
// Utilizamos este metodo por que cuando termina de cargar el script dentro del documento 
// Se manda a llamar el metodo initMap 

function initGoogleMaps() {
  var script = document.createElement("script");
  script.src ="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-s4VH03KBs4cmv7AE2U7rGuO7E6iV0Uk&callback=initMap";
  document.body.appendChild(script);

}

function findAPlace(place,map) {
  // Crea un objeto google.maps.Geocoder para utilizar el metodo geocode
  // El metodo geocode recibe como parametro un objeto con la propiedad address
  // Y tambien recibe un callback en el cual puedes obtener el resultado de la busqueda
  
  /*
  checa el mensaje que se genero en la consola. 
  Si estas en chrome entra a herramientas de desarrolladores -> console 
  Ahi puedes ver la salida que se obtiene
  */
  
  
  var geocoder = new google.maps.Geocoder();
  
  geocoder.geocode({'address' : place} , function(results, status) {
    
    if ( status === google.maps.GeocoderStatus.OK) {
      
        console.log(JSON.stringify(results));
      
        map.setCenter(results[0].geometry.location);
        map.setZoom(5);
        
        // Utiliza un Info Window Object para mostrar la informacion que necesites en el marcador
        // content: property sera donde mandes la cadena que quieres mostrar cuando se seleccione el marcador
        
        var info = new google.maps.InfoWindow({
          content: results[0].formatted_address
        });
        
        // Utiliza un Marker Object para crear marcadores en el mapa 
        // Para mandar la posiciòn en el objeto debes crear un LatLng object 
        // cuando termines de crear el marcador agregalo al mapa usando setMap Method
        
        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          title: results[0].formatted_address,
          animation: google.maps.Animation.DROP,
        });
        
        marker.setMap(map);
        
        marker.addListener('click',function(){
          info.open(map,marker);
        });
        
    } else {
      console.log('Not found: ' + place + 'status: '  + status);
      //alert('Not found: ' + place + 'status: '  + status);
    }
  });
}


window.addEventListener('load',initGoogleMaps(),false);