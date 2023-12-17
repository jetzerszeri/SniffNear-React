// import { useState, useEffect,} from "react";
import { PetCard } from "../../home/PetCard";


export const HomeLostPetAlert = ({pets, setPetHandler}) => {




  return (
    <section className="alert_lose">
        <h1>Crear alerta mascota perdida</h1>
        
        {pets.length > 0 && (
        <>
            <p>Selecciona la mascota perdida</p>
            <section className="myPetsCard">
            <div className="myPetsLose">
                <ul>
                {pets.map((pet) => (
                    <PetCard pet={pet} key={pet._id} selectLostPet={setPetHandler} clickType={'lost'}/>
                ))}
                </ul>
            </div>
            </section>
        </>
      )}

        <h2>Si tu mascota no tiene un perfil</h2>
        <p>Porfavor agregá una nueva mascota</p>

        <div className="myPetsCard">
            <div className="myPetsAddLose">
                <span className="addPetBtn">
                <a href="/add-pet"><i className="bi bi-plus"></i></a>
               </span>
                <p>Agregá</p>
            </div>
        </div>
    </section>
  )
}
