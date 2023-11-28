import React from 'react'
import { Navbar } from '../components/Navbar'
import { WelcomeCard } from '../components/home/WelcomeCard'
import { MyPetsCards } from '../components/home/MyPetsCards'
import { ServicesCards } from '../components/home/ServicesCards'

export const Home = () => {
  return (
    <>
      <Navbar />
      <main className='homeMain'>
        <WelcomeCard />
        <MyPetsCards />
        <ServicesCards />

      </main>
    </>
  )
}
