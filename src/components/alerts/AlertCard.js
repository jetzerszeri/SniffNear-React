import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  setDefaults,
  geocode,
  RequestType,
} from "react-geocode";

export const AlertCard = ({alert,   onDeleteClick , onEditClick , showButtons}) => {
  const navigate = useNavigate();
  const [lat,setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY_GEOCODING;

  //primero obtengo las coordenadas del navegador
  useEffect(() => {
    // Obtiene la ubicación actual del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setStatus(null);
        },
        () => {
          setStatus('No se pudo obtener tu ubicación');
        }
      );
    } else {
      setStatus('La geolocalización no es compatible con tu navegador');
    }
  }, []);

  setDefaults({
    key: apiKey,
    language:"es",
    region: "es"
  })
  useEffect(()=>{
      //obtengo la direccion desde las lat y lng
  geocode(RequestType.LATLNG,`${lat}, ${lng}`,{
    location_type: "ROOFTOP", // Override location type filter for this request.
  enable_address_descriptor: true, // Include address descriptor in response.
})
  .then(({ results }) => {
    const address = results[0].formatted_address;
    const { city, state, country } = results[0].address_components.reduce(
      (acc, component) => {
        if (component.types.includes("locality"))
          acc.city = component.long_name;
        else if (component.types.includes("administrative_area_level_1"))
          acc.state = component.long_name;
        else if (component.types.includes("country"))
          acc.country = component.long_name;
        return acc;
      },
      {}
    );
    setCity(city);
    setCountry(country);
    setState(state);
    // console.log(city, state, country);
    // console.log(address);
  })
  .catch(console.error);
  })


  return (
    <li>
        <div>
        <Link to={`/pet-profile?petId=${alert._id}`}>
            <img src="./img/foundIcon.svg" alt="icono"/>
            <h2>{alert.type} {alert.alertType}</h2>
            </Link>
        </div>
        
        <img src={alert.img} alt={alert.type}/>
       
        <p>Color: {alert.color1}, tamaño: {alert.size}</p>
        {/* ACA LA LOCATION  */}
        <p><i className="bi bi-geo-alt"></i> {state}, {country}</p>
        {showButtons && (
          <>
            <button onClick={() => onDeleteClick(alert._id)}>
              <i className="bi bi-trash"/>
            </button>
            <Link to={`/alerts-edit?alertId=${alert._id}`}>
            <button className="btn">
              <i className="bi bi-pencil"/>
            </button>
            </Link>
           
          </>
        )}
    </li>
  )
}
