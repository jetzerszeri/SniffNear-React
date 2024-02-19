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
import { FoundPetForm } from './components/alerts/foundPet/FoundPetForm';
import { LostPetForm } from './components/alerts/lostPet/LostPetForm';
import { FormLostA } from './components/alerts/lostPet/FormLostPetAlert';
import Blog from './components/Blog';
import { BlogForm } from './components/BlogForm';
import ArticleInfo from './components/BlogArticle';
import { AlertSuccess} from './components/alerts/AlertSuccess';
import MapaList from './components/alerts/map/MapList';
import { AdoptionForm } from './views/AdoptionForm';
import { AdoptionList } from './views/AdoptionList';
import { AdoptionCard } from './views/AdoptionCard';

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
{
  path: '/alerts-edit',
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
},
{
  path:'/blog',
  element:<Blog/>
},
{
  path:'/blog-form',
  element:<BlogForm/>
},
{
  path:'/article',
  element:<ArticleInfo/>
},
{
  path:'/success',
  element:<AlertSuccess/>
},
{
  path: '/mapa-list',
  element:<MapaList/>
},
{
  path: '/adoption-form',
  element:<AdoptionForm/>
},
{
  path: '/adoption-list',
  element:<AdoptionList/>
}
,
{
  path: '/adoption-card',
  element:<AdoptionCard/>
}
])




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);
