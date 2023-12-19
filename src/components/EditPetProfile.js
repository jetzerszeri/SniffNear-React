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
            const response = await fetch('https://sniffnear-api.onrender.com/api/pet/', {
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
 <section className="addNewPetForm alert_find">
      <form action="" onSubmit={handleSubmit} method="post" id="find_1">
        <h1>Editar el perfil de mi mascota</h1>
        <div>
          <label htmlFor="nombre">Nombre de tu mascota</label>
          <input type="text" name="nombre"  onChange={handleChange}  id="nombre"  placeholder="Milo" />
        </div>

        <div>
          <label htmlFor="edad">¿Qué edad tiene?</label>
          <input type="text" name="edad"  onChange={handleChange} placeholder="1 año" />
        </div>

        <div className="select_color">
          <label htmlFor="color">¿Cuál es su color?</label>
          <input type="color" id="colorInput" name="color"  onChange={handleChange} placeholder="seleccione el color" />
        </div>
        <div>
          <label htmlFor="tamanio">¿Cuál es su tamaño?</label>
          <input type="text" id="tamanio" name="tamanio"  onChange={handleChange} placeholder="grande" />
        </div>

        <div>
          <label htmlFor="raza">¿Cuál es su raza?</label>
          <input type="text" id="raza" name="raza"  onChange={handleChange}  placeholder="Ingrese la raza de la mascota, si la conoce" />
        </div>
        <div>
          <label htmlFor="genero">¿Cuál es su género?</label>
          <input name="genero" id="genero"  onChange={handleChange} placeholder="hembra"></input>
        </div>
        <div>
          <label htmlFor="img">Añade fotos de la mascota</label>
          <input type="file" id="img" name="file" accept=".png" />
        </div>

        <div className="divBtnContinuar">
          <button type="submit" className="btnContinuar">Continuar</button>
        </div>
      </form>
    </section>
   </>
  )
}
export default EditPetProfile;
