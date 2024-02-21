import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar"
import { AlertList } from "../components/alerts/AlertList"
import { BottomNav } from "../components/BottomNav";
import {getCurrentUserId, createLoader, removeLoader} from '../js/functions';
import { Link } from "react-router-dom";
import { 
    setDefaults,
    geocode,
    RequestType,
  } from "react-geocode";
import { FilterAlert } from "../components/alerts/FilterAlert";
export const Alerts = () => {
   const [alerts, setAlerts] = useState([]);
    //geolocalizacion
    const [lat,setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY_GEOCODING;
    //obtengo coordenadas
    useEffect(() => {
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
                geocode(RequestType.LATLNG,`${lat}, ${lng}`,{
                location_type: "ROOFTOP", 
                enable_address_descriptor: true, 
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
                })
                .catch(console.error);
    })
      useEffect(() => {
        const getAlerts = async () => {
            try {
                createLoader('Cargando alertas');
                const response = await fetch(`https://sniffnear-api.onrender.com/api/alerts/`);
                if (response.ok) {
                    const data = await response.json();
                    const filteredAlerts = data.filter((alert) => alert.city === city && alert.country === country);
                    setAlerts(filteredAlerts);
                    console.log(filteredAlerts)
                    removeLoader();
                }
            } catch (error) {
                console.error('Error fetching data', error)
            }
        }
    getAlerts();
}, [city, country]);

    const [filteredAlerts , setFilteredAlerts] = useState(alerts);
    const [showFilters, setShowFilters] = useState(false);
    

    useEffect(() => {

        setFilteredAlerts(alerts);
    }, [alerts]); 
  useEffect(() => {
    setFilteredAlerts(alerts);
  }, [alerts]);



    const handleAlertDelete = (id) => {
        const updatedAlerts = alerts.filter(alert => alert._id !== id);
        setAlerts(updatedAlerts);
      };

    return (
        <>
            <Navbar />
            <div className='topNavBarAlerts'>
                 <h1 style={{color:'black', fontWeight:'700'}}>Listado de alertas</h1>
                <Link to={"/mapa-list"}>
                <i className="bi bi-map-fill"></i>
                </Link>
             </div>
             <div className="topNavBarFilters">
             <i class="bi bi-filter" onClick={()=>setShowFilters(!showFilters)}/>
             </div>
             {showFilters && (
                 <FilterAlert alerts={alerts} setFilteredAlerts={setFilteredAlerts}/>
             )}

            <main className="mapMain">
                <AlertList
                 alerts={filteredAlerts}
                 onAlertDelete={handleAlertDelete} 
                 userId={getCurrentUserId()}
                 />
            </main>

            <BottomNav activeLink="alerts"/>

        </>

    )
}
