import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar"
import { AlertList } from "../components/alerts/AlertList"
import { BottomNav } from "../components/BottomNav";
import {getCurrentUserId, createLoader, removeLoader} from '../js/functions';
import { Link } from "react-router-dom";
export const Alerts = () => {

    const [alerts, setAlerts] = useState([]);

    console.log(getCurrentUserId());
    const getAlerts = useCallback( async () => {
        createLoader('Cargando alertas');
        const response = await fetch(`https://sniffnear-api.onrender.com/api/alerts/`);
        if(response.ok){
          const  data  = await response.json();
          setAlerts(data);
          removeLoader();
         console.log(data) 
        } 
        
    },[])
    
    useEffect(() => {
        getAlerts()
    },[]);
    
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
            <main className="mapMain">
                <AlertList
                 alerts={alerts}
                 onAlertDelete={handleAlertDelete} 
                 userId={getCurrentUserId()}
                 />
            </main>

            <BottomNav activeLink="alerts"/>

        </>

    )
}
