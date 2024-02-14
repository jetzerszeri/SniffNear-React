import React, { useEffect, useState, useCallback } from "react";

import { createLoader, removeLoader } from "../../../js/functions";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";


const MapaList = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const[coordV, setCoordV] = useState(null)

  const getAlerts = useCallback(async () => {
    createLoader('Cargando alertas');
    const response = await fetch(`https://sniffnear-api.onrender.com/api/alerts/`);
    if (response.ok) {
      const data = await response.json();
      setAlerts(data);
      removeLoader();
      setDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    getAlerts();
  }, [getAlerts]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({ lat, lng });
      });
    } else {
      alert("Tu navegador no soporta Geolocalizacion");
    } 
   const validAlerts = alerts.filter(alert => alert.latitude !== null && alert.longitude !== null);
   const coords = validAlerts.map(alert => {
    const type = (alert.alertType)
    const lat = parseFloat(alert.latitude);
    const lng = parseFloat(alert.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      return {
        lat: lat,
        lng: lng,
        type:type,
      };
    } else {
      return null; 
    }
  });
  const validCoords = coords.filter(coord => coord !== null);
   setCoordV(validCoords);
  }, [alerts]);
console.log(coordV)
   
   

  return (
    <div className="mapacontainer">
      <div id="mi_mapaL">
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={currentLocation}
            defaultZoom={15}
            disableDefaultUI={true}
            mapId={'8b111d92cbfeefd5'}
          >
          {coordV && coordV.map((marker, index) => (
            <AdvancedMarker position={marker}>
            
            {marker.type === 'lost' ? (
            <Pin style={{ backgroundColor: 'red' }}>
                <h2>Soy una alerta de tipo perdido</h2>
                <svg width="36" height="55" viewBox="0 0 36 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.504013 21.9336C2.34163 28.712 17.9991 54.5294 17.9991 54.5294C17.9991 54.5294 33.6566 28.7162 35.4942 21.9336C37.315 15.2016 33.8705 8.11607 30.7155 4.86785C27.6361 1.69116 24.4727 0.0712588 23.235 0.0039382C21.9974 -0.0591749 17.5879 0.584579 21.0366 5.72619C24.4853 10.8678 30.9002 17.1202 27.9885 22.59C25.9873 26.3515 20.8226 26.4988 19.6185 23.7681C19.0731 22.5269 19.8241 21.1216 21.4268 19.1735C22.3456 18.0585 24.0741 16.4386 24.0741 14.8692C24.0741 11.8229 21.0366 11.8566 17.9949 11.8229C14.9574 11.8566 11.9157 11.8229 11.9157 14.8692C11.9157 16.4386 13.6484 18.0543 14.563 19.1735C16.1657 21.1258 16.9209 22.5269 16.3713 23.7681C15.1672 26.4988 10.0025 26.3557 8.00131 22.59C5.08965 17.116 11.5045 10.8678 14.9532 5.72619C18.4019 0.584579 14.0008 -0.0549673 12.7632 0.0039382C11.5255 0.0670513 8.36212 1.68695 5.27845 4.86364C2.12346 8.11186 -1.31682 15.1974 0.50821 21.9294L0.504013 21.9336Z" fill="#FF8367"/>
                </svg>
            </Pin>
            ) : (
            <Pin style={{ backgroundColor: 'blue' }}>
                <h2>Soy una alerta de tipo encontrado</h2>
                <svg width="36" height="55" viewBox="0 0 36 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.504013 21.9336C2.34163 28.712 17.9991 54.5294 17.9991 54.5294C17.9991 54.5294 33.6566 28.7162 35.4942 21.9336C37.315 15.2016 33.8705 8.11607 30.7155 4.86785C27.6361 1.69116 24.4727 0.0712588 23.235 0.0039382C21.9974 -0.0591749 17.5879 0.584579 21.0366 5.72619C24.4853 10.8678 30.9002 17.1202 27.9885 22.59C25.9873 26.3515 20.8226 26.4988 19.6185 23.7681C19.0731 22.5269 19.8241 21.1216 21.4268 19.1735C22.3456 18.0585 24.0741 16.4386 24.0741 14.8692C24.0741 11.8229 21.0366 11.8566 17.9949 11.8229C14.9574 11.8566 11.9157 11.8229 11.9157 14.8692C11.9157 16.4386 13.6484 18.0543 14.563 19.1735C16.1657 21.1258 16.9209 22.5269 16.3713 23.7681C15.1672 26.4988 10.0025 26.3557 8.00131 22.59C5.08965 17.116 11.5045 10.8678 14.9532 5.72619C18.4019 0.584579 14.0008 -0.0549673 12.7632 0.0039382C11.5255 0.0670513 8.36212 1.68695 5.27845 4.86364C2.12346 8.11186 -1.31682 15.1974 0.50821 21.9294L0.504013 21.9336Z" fill="#FFBC00"/>
              </svg>
            </Pin>
            )}
           </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default MapaList;
