import React from "react";
import { useCallback, useEffect, useState } from "react";
import {getCurrentUserId, createLoader, removeLoader} from '../../js/functions';
import { PetCard } from "./PetCard"
import { Link } from 'react-router-dom'; 

export const MyPetsCards = ({route}) => {
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
                route === "/" ? (
                  <Link to={`/pet-profile?petId=${pet._id}`} style={{ color: "black" }} key={pet._id}>
                    <PetCard pet={pet} />
                  </Link>
                ) : (
                   <Link to={`/create-alert-lose?petId=${pet._id}`} style={{ color: "black" }} key={pet._id}>
                    <PetCard pet={pet} />
                  </Link>
                )
          ))}
            </ul>
        </div>
      </section>
  )
}
