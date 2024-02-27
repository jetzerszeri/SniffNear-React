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
import { Blog } from './components/blog/BlogMain';
import { BlogForm } from './components/blog/BlogForm';
import { BlogCard } from './components/blog/BlogCard';
// import { BlogList } from './components/blog/BlogList';
import { EditBlog } from './components/blog/EditBlogForm';
import { FilterBlog } from './components/blog/FilterBlog';
import { AlertSuccess} from './components/alerts/AlertSuccess';
import MapaList from './components/alerts/map/MapList';
import { AdoptionForm } from './components/adoptions/AdoptionForm';
// import { AdoptionList } from './components/adoptions/AdoptionList';
import { AdoptionCard } from './components/adoptions/AdoptionCard';
import { AlertDetail } from './components/alerts/AlertDetail';
import { Chat } from './components/chat/Chat';
import { Inbox } from './components/chat/Inbox';
import { AdoptionDetail } from './components/adoptions/AdoptionDetail';
import { AdoptionEdit } from './components/adoptions/AdoptionEdit';
import { Adoption } from './views/Adoptions';
import { Blogs } from './views/Blog';

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
  path:'/blog-list',
  element:<Blogs/>
},
{
  path:'/filter-blog',
  element:<FilterBlog/>
},
{
  path:'/article',
  element:<BlogCard/>
},
// {
//   path:'/blog-list',
//   element:<BlogList/>
// },
{
  path:'/edit-blog',
  element:<EditBlog/>
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
// {
//   path: '/adoption',
//   element:<AdoptionList/>
// },
{
  path: '/adoptions',
  element:<Adoption/>
}
,
{
  path: '/adoption-card',
  element:<AdoptionCard/>
},
{
  path:'/edit-adoption',
  element:<AdoptionEdit/>
},
{
  path: '/adoption-detail',
  element:<AdoptionDetail/>
},
{
  path:'/alert-detail',
  element:<AlertDetail/>
},
{
  path:'/chat',
  element:<Chat/>
},
{
  path:'/inbox',
  element:<Inbox/>
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);
