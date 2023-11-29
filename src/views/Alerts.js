import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar"
import { AlertList } from "../components/alerts/AlertList"
import { BottomNav } from "../components/BottomNav";




export const Alerts = () => {

    const [alerts, setAlerts] = useState([]);


    const getAlerts = useCallback( async () => {
        const response = await fetch(`https://sniffnear-api.onrender.com/api/alerts/`);
        if(response.ok){
          const  data  = await response.json();
          setAlerts(data);
        } 
    })
    
    useEffect(() => {
        getAlerts();
    }, [])


    return (
        <>
            <Navbar />

            <main className="mapMain">
                <AlertList alerts={alerts}/>


            </main>

            <BottomNav />

            
        </>

    )
}
