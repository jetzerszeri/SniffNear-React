import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './views/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Register } from './views/Register';import { AddPet } from './views/AddPet';
 import { NewAlert } from './views/NewAlert';
import { Login } from './views/Login';
// import { LostPetAlertForm } from './views/LostPetAlertForm';
import { Alerts } from './views/Alerts';
import PetInfo from './components/PetInfo';
import { UserInfo } from './components/UserInfo';
import { PetCard } from './components/home/PetCard';
import { EditPetProfile } from "./components/EditPetProfile";
import { EditAlert } from './views/EditAlert';
// import { NewAlert } from './views/NewAlert';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/add-pet',
    element: <AddPet />
  }, 
  {
    path: '/newAlert',
    element: <NewAlert/>
  },
  {
    path: '/alerts',
    element: <Alerts/>
  },
  {
    path: '/pet-profile',
    element: <PetInfo/>
  }

])




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);
