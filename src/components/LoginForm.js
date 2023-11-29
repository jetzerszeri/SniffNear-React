import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
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
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    }
    if (Object.keys(newErrors).length === 0) {
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
  } else {
    setErrors(newErrors);
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
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      <button type="submit">Iniciar Sesión</button>
      <p>
            ¿Ya tienes una cuenta? <Link to="/register">Registrate</Link>
        </p>
    </form>

  );
};

export default LoginForm;
