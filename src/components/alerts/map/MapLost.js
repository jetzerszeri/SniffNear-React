import React,{useEffect, useState}from "react";
import GoogleMapReact from 'google-map-react';
import { MyMarker } from "./MyMarker";

const Mapa = () =>{
  const apiKey = 'AIzaSyDYLirWViZkclvbf15XO8IJHY1KSo679tQ';
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
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
const handleMarkerDragStart = () => {
  setIsDragging(true);
};

const handleMarkerDrag = (event) => {
  if (isDragging) {
    setCurrentLocation({ lat: event.lat, lng: event.lng });
  }
}
  const handleMarkerDragEnd = () => {
    setIsDragging(false);
  };

return(
    <>
    <div className="mapacontainer">
      <div id="mi_mapa">
        <GoogleMapReact
        bootstrapURLKeys={ { key: apiKey } }
        center={currentLocation} // coord inici
        defaultZoom = {10}
        >
        {currentLocation &&(
          <MyMarker
            lat={currentLocation.lat}
            lng={currentLocation.lng}
            text="Mi ubicación"
            draggable // Hacer el marcador arrastrable
            onDragStart={handleMarkerDragStart}
            onDrag={handleMarkerDrag}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
        </GoogleMapReact>
      </div>
    </div>
    </>
  )
}
export default Mapa;