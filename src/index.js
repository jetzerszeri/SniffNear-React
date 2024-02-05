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
// import { PetCard } from './components/home/PetCard';
import { EditUserProfile } from "./components/EditUserProfile";
import { EditPetProfile } from "./components/EditPetProfile";
import { EditAlert } from './views/EditAlert';
import { FoundPetForm } from './components/alerts/FoundPetForm';
import {LostPetForm} from './components/alerts/LostPetForm';
import { FormLostA } from './components/alerts/lostPet/FormLostPetAlert';
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
  },
  {
    path: '/user-profile',
    element: <UserInfo/>
  },
  {
    path: '/edit-user-profile',
    element: <EditUserProfile/>
  },
  {
    path: '/edit-pet-profile',
    element: <EditPetProfile/>
  },
  // {
  //   path: '/lost-pet-alert-form',
  //   element: <LostPetAlertForm/>
  // },
{
  path: '/alerts/:alertId/edit',
  element: <EditAlert/>
},
{
  path:'/lost-form',
  element:<LostPetForm/>
},
{
  path:'/found-form',
  element:<FoundPetForm/>
},
{
  path:'/create-alert-lose',
  element:<FormLostA/>
}

])




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);
