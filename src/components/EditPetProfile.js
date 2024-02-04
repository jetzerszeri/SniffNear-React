import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../components/Navbar";

export const EditPetProfile = () => {
    const [selectedType, setSelectedType] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const [formData, setFormData] = useState({
        type: '',
        sex: '',
        size: '',
        color1: '',
        description: '',
        alertType: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await fetch('https://sniffnear-api.onrender.com/api/pets/${petIdTest}'); // Reemplaza con la URL correcta de tu API
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status}`);
                }

                const petData = await response.json();
                setFormData({
                    type: petData.type || '',
                    sex: petData.sex || '',
                    size: petData.size || '',
                    color1: petData.color1 || '',
                    description: petData.description || '',
                    alertType: petData.alertType || '',
                    // Añade las demás propiedades según sea necesario
                });

                setSelectedType(petData.type || '');
                setSelectedSize(petData.size || '');
                setSelectedColor(petData.color1 || '');
            } catch (error) {
                console.error('Error al obtener datos de la mascota:', error.message);
            }
        };

        fetchPetData();
    }, []); // Asegúrate de pasar un arreglo de dependencias vacío para que useEffect solo se ejecute una vez al montar el componente

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSeleccionColor = (color) => {
        setFormData((prevData) => ({
            ...prevData,
            color1: color,
        }));
        setSelectedColor(color);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validaciones de datos
        if (!formData.type.trim()) {
            newErrors.type = 'El tipo es requerido';
        }
        if (!selectedColor) {
            newErrors.color1 = 'Debes elegir un color';
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

                if (response.ok) {
                    console.log('Se registró el cambio:', json);
                    navigate('/');
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
                        <input
                            type="text"
                            name="nombre"
                            onChange={handleChange}
                            id="nombre"
                            placeholder="Milo"
                            value={formData.nombre}
                        />
                    </div>

                    {/* Agrega más campos del formulario según sea necesario */}
                    
                    <div className="select_color">
                        <label htmlFor="color">¿Cuál es su color?</label>
                        <input
                            type="color"
                            id="colorInput"
                            name="color"
                            onChange={handleChange}
                            value={formData.color1}
                        />
                    </div>

                    <div>
                        <label htmlFor="tamanio">¿Cuál es su tamaño?</label>
                        <input
                            type="text"
                            id="tamanio"
                            name="tamanio"
                            onChange={handleChange}
                            placeholder="grande"
                            value={formData.tamanio}
                        />
                    </div>

                    <div>
                        <label htmlFor="raza">¿Cuál es su raza?</label>
                        <input
                            type="text"
                            id="raza"
                            name="raza"
                            onChange={handleChange}
                            placeholder="Ingrese la raza de la mascota, si la conoce"
                            value={formData.raza}
                        />
                    </div>

                    <div>
                        <label htmlFor="genero">¿Cuál es su género?</label>
                        <input
                            name="genero"
                            id="genero"
                            onChange={handleChange}
                            placeholder="hembra"
                            value={formData.genero}
                        />
                    </div>

                    <div>
                        <label htmlFor="img">Añade fotos de la mascota</label>
                        <input type="file" id="img" name="file" accept=".png" />
                    </div>

                    <div className="divBtnContinuar">
                        <button type="submit" className="btnContinuar">
                            Continuar
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditPetProfile;
