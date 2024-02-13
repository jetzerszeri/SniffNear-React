
import React,{useEffect, useState}from "react";
import { APIProvider, Map,  AdvancedMarker} from "@vis.gl/react-google-maps";
const Mapa = ({onMarkerDragEnd}) =>{
  const apiKey = 'AIzaSyDYLirWViZkclvbf15XO8IJHY1KSo679tQ';
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(()=>{
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({lat , lng});
       
  });
}else{
  alert("Tu navegador no soporta Geolocalizacion");
}
},[]);

const handleMarker = (coord) =>{
  const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log(`Coordenadas: ${lat}, ${lng}`);
    setCurrentLocation( {lat, lng})
    onMarkerDragEnd(lat,lng)
  
}


return(
    <>
    <div className="mapacontainer">
      <div id="mi_mapa">
        <APIProvider apiKey={apiKey}>
          <Map 
          defaultCenter={currentLocation} 
          defaultZoom={15}
          disableDefaultUI={true}
          mapId={'8b111d92cbfeefd5'}
          >
        <AdvancedMarker
        position={currentLocation}
        draggable= {true}
        onDragEnd={handleMarker}
        >
          <div>
            <i className="bi bi-balloon-fill"> ARRASTRAME!</i>
          </div>
          
        </AdvancedMarker>
          </Map>

        </APIProvider>
      </div>
    </div>
    </>
  )
}
export default Mapa;