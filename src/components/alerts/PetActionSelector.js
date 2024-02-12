import { LostPetButton } from "./lostPet/LostPetButton";
import { FoundPetButton } from "./foundPet/FoundPetButton";
export const PetActionSelector = () =>{
    return (
        <main>
            <section className="alerts">
                <h1>Crear Alerta</h1>
                <p>¿Qué tipo de alerta querés crear?</p>
                <LostPetButton />
                <FoundPetButton />
            </section>
        </main>
    );
}