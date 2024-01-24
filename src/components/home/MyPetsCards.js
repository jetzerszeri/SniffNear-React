import { useCallback, useEffect, useState } from "react";
import {getCurrentUserId, createLoader, removeLoader} from '../../js/functions';
import { PetCard } from "./PetCard"
import { Link } from 'react-router-dom'; 

export const MyPetsCards = () => {
  const storedUserId = getCurrentUserId();
    const [ pets, setPets ] = useState([]);
    const getUserInfo = useCallback( async () => {
        createLoader();
        const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${storedUserId}`);
        if(response.ok){
          const  {pets}  = await response.json();
          setPets(pets);
          removeLoader();
        } 
      }, [storedUserId])
      useEffect(() => {
        getUserInfo();
      }, [getUserInfo])

  return (
    <section className="myPetsCard">
        <div>
            {/* <ul>
                {pets.map((pet) => {
                    return <PetCard pet={pet} key={pet._id}/>
                })}
            </ul> */}
            <ul>
              {pets.map((pet) => (
              <Link to={`/pet-profile?petId=${pet._id}`} key={pet._id} style={{color:"black"}}>
                <PetCard pet={pet} />
              </Link>
              ))}
            </ul>
        </div>
      </section>
  )
}
