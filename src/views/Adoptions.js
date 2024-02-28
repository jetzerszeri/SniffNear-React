import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar"
import { AdoptionList } from "../components/adoptions/AdoptionList";
import { BottomNav } from "../components/BottomNav";
import {getCurrentUserId, createLoader, removeLoader} from '../js/functions';
import { Link } from "react-router-dom";


export const Adoption = () => {
   const [adoptions, setAdoptions] = useState([]);
    
      useEffect(() => {
        const getAdoptions = async () => {
            try {
                // createLoader('Cargando alertas');
                const response = await fetch(`https://sniffnear-api.onrender.com/api/adoption/`);
                if (response.ok) {
                    const data = await response.json();
                    setAdoptions(data);
                    // removeLoader();
                    
                }
            } catch (error) {
                console.error('Error fetching data', error)
            }
        }
    getAdoptions();
});

    const handleAdoptionDelete = (id) => {
        const updatedAdoptions = adoptions.filter(adoption => adoption._id !== id);
        setAdoptions(updatedAdoptions);
      };

    return (
        <>
            <main className="mapMain">
                <AdoptionList
                 adoptions={adoptions}
                 onAlertDelete={handleAdoptionDelete} 
                 userId={getCurrentUserId()}
                 />
            </main>

            <BottomNav activeLink="alerts"/>

        </>

    )
}
