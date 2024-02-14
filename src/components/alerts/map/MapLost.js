
import React,{useEffect, useState}from "react";
import { APIProvider, Map,  AdvancedMarker} from "@vis.gl/react-google-maps";
const Mapa = ({onMarkerDragEnd, route }) =>{
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
console.log("Ruta desde map", route)
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
          {route === '/create-alert-lose' ? (  
          <div className="text-center d-flex justify-content-center">
                <svg width="36" height="55" viewBox="0 0 36 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.504013 21.9336C2.34163 28.712 17.9991 54.5294 17.9991 54.5294C17.9991 54.5294 33.6566 28.7162 35.4942 21.9336C37.315 15.2016 33.8705 8.11607 30.7155 4.86785C27.6361 1.69116 24.4727 0.0712588 23.235 0.0039382C21.9974 -0.0591749 17.5879 0.584579 21.0366 5.72619C24.4853 10.8678 30.9002 17.1202 27.9885 22.59C25.9873 26.3515 20.8226 26.4988 19.6185 23.7681C19.0731 22.5269 19.8241 21.1216 21.4268 19.1735C22.3456 18.0585 24.0741 16.4386 24.0741 14.8692C24.0741 11.8229 21.0366 11.8566 17.9949 11.8229C14.9574 11.8566 11.9157 11.8229 11.9157 14.8692C11.9157 16.4386 13.6484 18.0543 14.563 19.1735C16.1657 21.1258 16.9209 22.5269 16.3713 23.7681C15.1672 26.4988 10.0025 26.3557 8.00131 22.59C5.08965 17.116 11.5045 10.8678 14.9532 5.72619C18.4019 0.584579 14.0008 -0.0549673 12.7632 0.0039382C11.5255 0.0670513 8.36212 1.68695 5.27845 4.86364C2.12346 8.11186 -1.31682 15.1974 0.50821 21.9294L0.504013 21.9336Z" fill="#FF8367"/>
                </svg>
                <h2>Ubicación</h2> 
          </div>
          ) : route === '/found-form' ? (
            <div className='text-center'>
             <svg width="36" height="55" viewBox="0 0 36 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.504013 21.9336C2.34163 28.712 17.9991 54.5294 17.9991 54.5294C17.9991 54.5294 33.6566 28.7162 35.4942 21.9336C37.315 15.2016 33.8705 8.11607 30.7155 4.86785C27.6361 1.69116 24.4727 0.0712588 23.235 0.0039382C21.9974 -0.0591749 17.5879 0.584579 21.0366 5.72619C24.4853 10.8678 30.9002 17.1202 27.9885 22.59C25.9873 26.3515 20.8226 26.4988 19.6185 23.7681C19.0731 22.5269 19.8241 21.1216 21.4268 19.1735C22.3456 18.0585 24.0741 16.4386 24.0741 14.8692C24.0741 11.8229 21.0366 11.8566 17.9949 11.8229C14.9574 11.8566 11.9157 11.8229 11.9157 14.8692C11.9157 16.4386 13.6484 18.0543 14.563 19.1735C16.1657 21.1258 16.9209 22.5269 16.3713 23.7681C15.1672 26.4988 10.0025 26.3557 8.00131 22.59C5.08965 17.116 11.5045 10.8678 14.9532 5.72619C18.4019 0.584579 14.0008 -0.0549673 12.7632 0.0039382C11.5255 0.0670513 8.36212 1.68695 5.27845 4.86364C2.12346 8.11186 -1.31682 15.1974 0.50821 21.9294L0.504013 21.9336Z" fill="#FFBC00"/>
              </svg>
            </div>
          ):(
          <div>
            <svg width="36" height="55" viewBox="0 0 36 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.504013 21.9336C2.34163 28.712 17.9991 54.5294 17.9991 54.5294C17.9991 54.5294 33.6566 28.7162 35.4942 21.9336C37.315 15.2016 33.8705 8.11607 30.7155 4.86785C27.6361 1.69116 24.4727 0.0712588 23.235 0.0039382C21.9974 -0.0591749 17.5879 0.584579 21.0366 5.72619C24.4853 10.8678 30.9002 17.1202 27.9885 22.59C25.9873 26.3515 20.8226 26.4988 19.6185 23.7681C19.0731 22.5269 19.8241 21.1216 21.4268 19.1735C22.3456 18.0585 24.0741 16.4386 24.0741 14.8692C24.0741 11.8229 21.0366 11.8566 17.9949 11.8229C14.9574 11.8566 11.9157 11.8229 11.9157 14.8692C11.9157 16.4386 13.6484 18.0543 14.563 19.1735C16.1657 21.1258 16.9209 22.5269 16.3713 23.7681C15.1672 26.4988 10.0025 26.3557 8.00131 22.59C5.08965 17.116 11.5045 10.8678 14.9532 5.72619C18.4019 0.584579 14.0008 -0.0549673 12.7632 0.0039382C11.5255 0.0670513 8.36212 1.68695 5.27845 4.86364C2.12346 8.11186 -1.31682 15.1974 0.50821 21.9294L0.504013 21.9336Z" fill="#006667"/>
            </svg>
          </div>
          )}
        </AdvancedMarker>
          </Map>

        </APIProvider>
      </div>
    </div>
    </>
  )
}
export default Mapa;