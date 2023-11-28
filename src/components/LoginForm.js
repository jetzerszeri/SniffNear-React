import React, { useState } from 'react';
import { useNavigate } from 'react-router';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sniffnear-api.onrender.com/api/users/auth', {
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
        console.log('Inicio de sesión exitoso');
      } else {
        const errorData = await response.json();
        console.error('Error en el inicio de sesión:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
