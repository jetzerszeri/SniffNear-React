import { useState } from "react";
import { 
APIProvider,
Map,
AdvancedMarker, 
Pin,
InfoWindow
} from "@vis.gl/react-google-maps";
export default function Intro (){
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const { latitude, longitude } = position.coords;
    //   this.setState({ currentLocation: { lat: latitude, lng: longitude } });
    // });
    const position = {lat:-32.855091 , lng:-68.893144};
    const [open,setOpen] = useState(false);

    return(
        <APIProvider apiKey={"AIzaSyDYLirWViZkclvbf15XO8IJHY1KSo679tQ"}>
            <div className="mapacontainer">
            <div id="mi_mapa" >
                <Map zoom={9} center={position}>
                    <AdvancedMarker position={position} onClick={()=>{setOpen(true)}}>
                        <Pin background={'red'} />
                    </AdvancedMarker>
                </Map>
                {open && (
                <InfoWindow position={position} onCloseClick={()=>{setOpen(false)}}>
                    <p>Lo que le voy a poner a la alerta</p>
                </InfoWindow>
                )}
            </div>
            </div>
        </APIProvider>
    )
}