import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    aceptar: false,
  });
  
  const [errors, setErrors] = useState({});
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
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = '*El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = '*El correo electrónico es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '*Ingrese un correo electrónico válido';
    }
    if (!formData.password.trim()) {
      newErrors.password = '*La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = '*La contraseña debe tener al menos 8 caracteres';
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

        if (response.ok) {
          localStorage.setItem('userId', json.userId);
          navigate('/');
        } else {
          console.error('Error en el registro:', json.message);
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
        <p>
            ¿Ya tenés una cuenta? <Link to="/login">Ingresá</Link>
        </p>
        </div>
    </form>
  );
};

export default RegisterForm;
