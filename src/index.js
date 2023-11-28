import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './views/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Register } from './views/Register';import { AddPet } from './views/AddPet';
import { NewAlert } from './views/NewAlert';
import { Login } from './views/Login';
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
])




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);
