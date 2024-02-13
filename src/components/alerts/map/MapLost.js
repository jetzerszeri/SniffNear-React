
import React,{useEffect, useState}from "react";
import { APIProvider, Map,  AdvancedMarker} from "@vis.gl/react-google-maps";
const Mapa = ({onMarkerDragEnd}) =>{
  const apiKey = process.env.REACT_APP_API_KEY;
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
          <div className="text-center d-flex justify-content-center">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="35px" height="35px" viewBox="0 0 96.000000 145.000000"
                  preserveAspectRatio="xMidYMid meet">

                  <g transform="translate(0.000000,145.000000) scale(0.100000,-0.100000)"
                  fill="#006667" stroke="none">
                  <path d="M292 1409 c-54 -27 -143 -108 -183 -165 -41 -60 -77 -160 -85 -236
                  -9 -88 12 -160 90 -315 94 -188 353 -643 366 -643 13 1 292 493 371 654 76
                  155 94 222 85 308 -15 127 -69 231 -166 321 -73 68 -139 102 -182 93 -44 -9
                  -58 -24 -58 -60 0 -36 19 -69 105 -186 70 -95 97 -145 114 -208 23 -85 -24
                  -169 -108 -192 -36 -9 -48 -8 -79 7 -63 31 -58 78 18 172 60 75 67 119 23 148
                  -39 26 -208 25 -246 0 -45 -29 -37 -70 29 -157 47 -62 55 -79 52 -109 -3 -30
                  -9 -39 -40 -54 -97 -47 -214 59 -192 174 10 52 50 126 119 219 87 118 105 150
                  105 187 0 26 -6 36 -30 48 -39 20 -57 19 -108 -6z"/>
                  </g>
                  </svg>
                  <h2>Tu ubicación</h2> 
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