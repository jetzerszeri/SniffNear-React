import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
const LoginForm = () => {

  const [credentialError, setCredentialError] = useState(null);

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
      newErrors.email = '*El correo electrónico es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '*Ingresa un correo electrónico válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = '*La contraseña es requerida';
    }
    if (Object.keys(newErrors).length === 0) {

      const response = await fetch('https://sniffnear-api.onrender.com/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', json.userId);
        navigate('/')
        console.log('Inicio de sesión exitoso');
      } else {
        newErrors.credentials = `*${json.message}`
      }
      setErrors(newErrors)

  } else {
    setErrors(newErrors);
  }
  };

  return (
    
    <form onSubmit={handleSubmit}>
            {errors.credentials && <p className='errorInput'>{errors.credentials}</p>}
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
        placeholder="Ingresá tu contraseña"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className='errorInput'>{errors.password}</p>}
      </div>

      <div>
        <button type="submit">Iniciar sesión</button>
        <p>¿Ya tenés una cuenta? <Link to="/register">Registrate</Link></p>
      </div>


    </form>

  );
};

export default LoginForm;
