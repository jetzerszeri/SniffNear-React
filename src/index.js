import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './views/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddPet } from './views/AddPet';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  // {
  //   path: '/login',
  //   element: <Login />
  // },
  // {
  //   path: '/register',
  //   element: <Register />
  // },
  // {
  //   path: '/details/:postId',
  //   element: <Details />
  // },
  // {
  //   path: 'post',
  //   element: <Post />
  // }
  {
    path: '/add-pet',
    element: <AddPet />
  },
])




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);
