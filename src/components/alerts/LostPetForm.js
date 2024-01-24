
import { Navbar } from "../Navbar";
import { BottomNav } from "../BottomNav";
import { MyPetsCards } from "../home/MyPetsCards";
import { AddPetButton } from "../addPet/AddPetButton";

export const LostPetForm = () =>{
    return (
        <>
            <Navbar/>
                <main>
                    <section className="alert_lose">
                        <h1>Crear alerta mascota perdida</h1>
                        <p>Selecciona la mascota que está perdida</p>
                        <MyPetsCards/>
                        <h2>Si tu mascota no tiene un perfil</h2>
                        <p>Por favor agregá una nueva mascota</p>
                        <AddPetButton/> 
                    </section>
                </main>
            <BottomNav/>
        </>
    )
}