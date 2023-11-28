import { useEffect, useState } from "react";
import { Navbar } from '../components/Navbar'
import { WelcomeCard } from '../components/home/WelcomeCard'
import { MyPetsCards } from '../components/home/MyPetsCards'
import { ServicesCards } from '../components/home/ServicesCards'
import { BottomNav } from '../components/BottomNav'

const storedUserId = localStorage.getItem('userId');
// console.log(storedUserId);

// const [ name, setName ] = useState('cargando...');







export const Home = () => {
  const [ name, setName ] = useState('cargando...');

  const getUserInfo = async () => {
    const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${storedUserId}`);
    if(response.ok){
      const  {user}  = await response.json();
      // console.log(user);
      setName(user.name);
    } 
  }

  useEffect(() => {
    getUserInfo();
  }, [])
  

  return (
    <>
      <Navbar />
      <main className='homeMain'>
        <WelcomeCard name={name}/>
        <MyPetsCards />
        <ServicesCards />
        <BottomNav />
      </main>
    </>
  )
}
