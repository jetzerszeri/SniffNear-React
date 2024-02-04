import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Navbar } from "../components/Navbar"

export const EditUserProfile = () => {
    const [selectedName, setSelectedName] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedPassword, setSelectedPassword] = useState("");

  
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const handleSelectName = (value) => {
        setSelectedName(value);
        setFormData({
          ...formData,
          name: value,
        });
    };
    const handleSelectLocation = (value) => {
        setSelectedLocation(value)
        setFormData({
          ...formData,
          location: value,
        });
    };
    const handleSelectEmail = (value) => {
        setSelectedEmail(value)
        setFormData({
            ...formData,
            email: value,
        });
    };
    const handleSelectPassword = (value) => {
      setSelectedPassword(value)
      setFormData({
          ...formData,
          password: value,
      });
  };
  
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name.trim()) {
          newErrors.name = 'El nombre es requerido';
        }
    
        if(!selectedLocation){
            newErrors.location = "Debes ingresar tu ubicación"
         }
         if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
          }
          if (!formData.password.trim()) {
            newErrors.password = 'La password es requerida';
          }
        if (Object.keys(newErrors).length === 0) {
        try {
            const response = await fetch('https://sniffnear-api.onrender.com/api/users/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            const json = await response.json();
            console.log(json);
      
            if (response.ok) {
              console.log('se registro el cambio')
              navigate('/')
            } else {
                console.error('Error en la edición:', json.message);
              }
            } catch (error) {
              console.error('Error:', error);
            }
        } else {
            setErrors(newErrors);
          }
      };
  return (
    
   <>
    <Navbar />
    <form onSubmit={handleSubmit}>

<div>
  <label htmlFor="name">Nombre Completo</label>
  <input
  type="text"
  name="name"
  placeholder="Juan Gonzalez"
  value={formData.name}
  onChange={handleChange}
  />
  {errors.name && <p className='errorInput'>{errors.name}</p>}
</div>

<div>
  <label htmlFor="location">Ubicación</label>
  <input
  type="text"
  name="location"
  placeholder="Banfield, Buenos Aires"
  value={formData.location}
  onChange={handleChange}
  />
  {errors.location && <p className='errorInput'>{errors.location}</p>}
</div>

<div>
  <label htmlFor="email">Email</label>
  <input
  name="email"
  placeholder="ejemplo@mail.com"
  value={formData.email}
  onChange={handleChange}
  />
   {errors.email && <p className='errorInput'>{errors.email}</p>}

</div>

<div>
  <label htmlFor="password">Contraseña</label>

  <input
  type="password"
  name="password"
  placeholder="Ingresá una contraseña"
  value={formData.password}
  onChange={handleChange}
  />
  {errors.password && <p className='errorInput'>{errors.password}</p>}
</div>


  <div>
  <button type="submit">Editar Perfil</button>
  </div>
</form>
   </>
  )
}
export default EditUserProfile;
