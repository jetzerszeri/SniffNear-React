import React, { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";

export default function Intro() {
  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error obteniendo la ubicación: ", error.message);
          // Aquí podrías mostrar un mensaje al usuario o realizar otra acción
        }
      );
    } else {
      console.log("Geolocalización no está disponible en este navegador.");
    }
  }, []);

  return (
    <APIProvider apiKey={"AIzaSyDYLirWViZkclvbf15XO8IJHY1KSo679tQ"}>
      <div className="mapacontainer">
        <div id="mi_mapa">
          <Map zoom={9} center={currentLocation}>
            {currentLocation && (
              <AdvancedMarker position={currentLocation} onClick={() => setOpen(true)}>
                <Pin background={"red"} />
              </AdvancedMarker>
            )}
          </Map>
          {open && (
            <InfoWindow position={currentLocation} onCloseClick={() => setOpen(false)}>
              <p>Lo que le voy a poner a la alerta</p>
            </InfoWindow>
          )}
        </div>
      </div>
    </APIProvider>
  );
}

