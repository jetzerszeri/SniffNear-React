import { useCallback, useEffect, useState } from "react";
import { Navbar } from '../components/Navbar'
import { WelcomeCard } from '../components/home/WelcomeCard'
import { MyPetsCards } from '../components/home/MyPetsCards'
import { ServicesCards } from '../components/home/ServicesCards'
import { BottomNav } from '../components/BottomNav'
import {getCurrentUserId, createLoader, removeLoader} from '../js/functions';
import { AddPetButton } from "../components/addPet/AddPetButton";
import { useLocation } from "react-router";
export const Home = () => {
  const location = useLocation();
  const current_route = location.pathname;
  const storedUserId = getCurrentUserId();
  const [ name, setName ] = useState('');
  const [ pets, setPets ] = useState([]);

  const getUserInfo = useCallback( async () => {
    createLoader();
    const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${storedUserId}`);
    if(response.ok){
      const  {user, pets}  = await response.json();
      setName(user.name);
      setPets(pets);
      removeLoader();
    } 
  }, [storedUserId])

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo])
  

  return (
    <>
      <Navbar />
      <main className='homeMain'>
        <WelcomeCard name={name}/>
        <div>
          <h2>Mis mascotas</h2>
          <section className="myPetsCard">
          <AddPetButton route={current_route} /> 
            <MyPetsCards pets={pets} route={current_route}/>
          </section>
        </div>
        <ServicesCards />
      </main> 
      <BottomNav activeLink="home"/>
    </>
  )
}
