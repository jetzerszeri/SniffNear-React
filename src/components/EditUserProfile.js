import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Navbar } from "../components/Navbar"

export const EditPetProfile = () => {
    const [selectedType, setSelectedType] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedGender, setSelectedGender] = useState("");

  
    const [formData, setFormData] = useState({
        type: '',
        sex: '',
        size: '',
        color1: '',
        description:'',
        alertType:'',
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    const handleSelectType = (value) => {
        setSelectedType(value);
        setFormData({
          ...formData,
          type: value,
        });
    };
    const handleSelectSize = (value) => {
        setSelectedSize(value)
        setFormData({
          ...formData,
          size: value,
        });
    };
    const handleSelectGender = (value) => {
        setSelectedGender(value)
        setFormData({
            ...formData,
            sex: value,
        });
    };
    const handleSeleccionColor = (color) => {
        setFormData({
          ...formData,
          color1: color,
        });
        setSelectedColor(color);
    };
  
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.type.trim()) {
          newErrors.type = 'El tipo es requerido';
        }
    
        if(!selectedColor){
            newErrors.color1 = "Debes elegir un color"
         }
         if (!formData.sex.trim()) {
            newErrors.sex = 'El género es requerido';
          }
          if (!formData.size.trim()) {
            newErrors.size = 'El tamaño es requerido';
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
  <label htmlFor="name">Nombre</label>
  <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  />
  {errors.name && <p className='errorInput'>{errors.name}</p>}
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
  <button type="submit">Crear cuenta</button>
  </div>
</form>
   </>
  )
}
export default EditUserProfile;
