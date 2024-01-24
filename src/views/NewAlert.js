import { BottomNav } from '../components/BottomNav'
// import { AlertForm } from '../components/alerts/AlertForm'
import { Navbar } from "../components/Navbar";
import { PetActionSelector } from "../components/alerts/PetActionSelector";
export const NewAlert = () => {
    return (
        <>
            {/* <AlertForm titulo="Crear alerta"/> 
            <BottomNav/> */}
           <Navbar/>
                <PetActionSelector/>
            <BottomNav/>
        </>
    );
}