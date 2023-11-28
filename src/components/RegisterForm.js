import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    aceptar: false,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
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
          localStorage.setItem('userId', json.userId);
          navigate('/')
        } else {
            console.error('Error en el registro:', json.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
  };

  return (
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        />
        <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        />
        <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        />

        <div>
        <input
            type="checkbox"
            name="aceptar"
            checked={formData.aceptar}
            onChange={handleChange}
        />
        <label htmlFor="aceptar">
            Acepto los <a href="">Términos y Condiciones</a>
        </label>
        </div>

        <div>
        <button type="submit">Crear mi cuenta</button>
        <p>
            ¿Ya tienes una cuenta? <a href="login.html">Ingresa</a>
        </p>
        </div>
    </form>
  );
};

export default RegisterForm;
