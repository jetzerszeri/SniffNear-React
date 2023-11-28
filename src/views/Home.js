import { useCallback, useEffect, useState } from "react";
import { Navbar } from '../components/Navbar'
import { WelcomeCard } from '../components/home/WelcomeCard'
import { MyPetsCards } from '../components/home/MyPetsCards'
import { ServicesCards } from '../components/home/ServicesCards'
import { BottomNav } from '../components/BottomNav'


export const Home = () => {
  const storedUserId = localStorage.getItem('userId');
  const [ name, setName ] = useState('cargando...');
  const [ pets, setPets ] = useState([]);

  const getUserInfo = useCallback( async () => {
    const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${storedUserId}`);
    if(response.ok){
      const  {user, pets}  = await response.json();
      setName(user.name);
      setPets(pets);
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
        <MyPetsCards pets={pets}/>
        <ServicesCards />
        <BottomNav />
      </main>
    </>
  )
}
