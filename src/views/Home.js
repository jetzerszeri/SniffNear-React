import { useEffect, useState } from "react";
import { Navbar } from '../components/Navbar'
import { WelcomeCard } from '../components/home/WelcomeCard'
import { MyPetsCards } from '../components/home/MyPetsCards'
import { ServicesCards } from '../components/home/ServicesCards'
import { BottomNav } from '../components/BottomNav'

const storedUserId = localStorage.getItem('userId');
console.log(storedUserId);

const getUserInfo = async () => {
  const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${storedUserId}`);
  if(response.ok){
    const  data  = await response.json();
    console.log(data);
  } 
}




export const Home = () => {

  useEffect(() => {
    getUserInfo();
  }, [])
  
  
  return (
    <>
      <Navbar />
      <main className='homeMain'>
        <WelcomeCard />
        <MyPetsCards />
        <ServicesCards />
        <BottomNav />
      </main>
    </>
  )
}
