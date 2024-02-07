import React, { useState, useEffect } from "react";
import { Navbar } from "../../Navbar";
import { MapaLost } from "../map/MapLost";
import { useNavigate } from "react-router";
import {getCurrentUserId } from '../../../js/functions';
import { useLocation } from "react-router";

export const FormLostA = () =>{
    const [currentStep, setCurrentStep] = useState(1);
    const [user, setUser] = useState(null); 
    const [errors, setErrors] = useState({});
    const [petInfo, setPetInfo] = useState(null);
    const location = useLocation();
    const petIdTest = new URLSearchParams(location.search).get("petId");
    const navigate =useNavigate();
    const [formData, setFormData] = useState({
        petName: '',
        type: '',
        size: '',
        color1: '',
        color2: '',
        breed: '',
        description: '',
        latitude: '',
        longitude: '',
        date: '',
        time: '',
        img: '',
        personName: '',
        email: '',
        password: '',
        alertType: 'lost',
        sex: '',
        pet: '',
        creator: '',
    });
    const handlePrev = (e) => {
        e.preventDefault();
        setCurrentStep(currentStep - 1);
      };
    
      const handleNext = (e) => {
        e.preventDefault();
        setCurrentStep(currentStep + 1);
      };
      useEffect(() => {
        if (currentStep === 2) {
            
          const fetchPet = async () => {
            try {
              const response = await fetch(
                `https://sniffnear-api.onrender.com/api/pets/${petIdTest}`
              );
              if (response.ok) {
                const { petData } = await response.json();
                setPetInfo(petData);
                setFormData({
                //   ...formData,
                  petName: petData.name,
                  type: petData.type,
                  size: petData.size,
                  color1: petData.color1,
                  breed: petData.breed,
                  img: petData.img,  
                });
              } else {
                throw new Error("Failed to fetch pet data");
              }
            } catch (error) {
              console.error("Error fetching pet data:", error);
            }
          };
    
          fetchPet();
        }
      }, [currentStep, petIdTest, formData]);         
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch(
              `https://sniffnear-api.onrender.com/api/users/${getCurrentUserId()}`
            );
            if (response.ok) {
              const { user } = await response.json();
              setUser(user);
              setFormData({
                personName: user.name,
                email: user.email,
                creator: user._id
              });
            } else {
              throw new Error("Failed to fetch user data");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUser();
      }, [formData]);
     
   
      const handleDateChange = (e) => {
        setFormData({
          ...formData,
          date: e.target.value,
        });
      };
    
      const handleTimeChange = (e) => {
        setFormData({
          ...formData,
          time: e.target.value,
        });
      };
    
      const handleDescriptionChange = (e) => {
        setFormData({
          ...formData,
          description: e.target.value
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.date) {
            newErrors.date = 'La fecha es requerida';
        }
    
        if (!formData.time) {
            newErrors.time = 'La hora es requerida';
        }
    
        if (!formData.description) {
            newErrors.description = 'La descripción es requerida';
        }
    
        if (Object.keys(newErrors).length === 0) {
        try {
            const response = await fetch('https://sniffnear-api.onrender.com/api/alerts/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            const json = await response.json();
            console.log(json);
      
            if (response.ok) {
              console.log('se registro la alerta')
              navigate('/alerts')
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

return(
    <>
    <Navbar/>
    <form className="addNewPetForm createAlert" onSubmit={handleSubmit}>
    {currentStep === 1 && (
            <div className="lugarYFecha">
                <h2>¿Dónde y cuándo la viste por última vez?</h2>
                <MapaLost/>
                <div className="containerFormStepsSelectors">
                    <div className="inputDiv">
                        <label htmlFor="date">¿Cuándo?</label>
                        <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleDateChange}
                        />
                    </div>
                    {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                    <div className="inputDiv">
                        <label htmlFor="time">¿A qué hora?</label>
                        <select
                        name="time"
                        value={formData.time}
                        onChange={handleTimeChange}
                        >
                        <option value="DEFAULT" disabled>
                            Selecciona una hora
                        </option>
                        {[...Array(24).keys()].map((hour) => (
                            <option key={hour} value={`${hour}:00`}>
                            {`${hour}:00`}
                            </option>
                        ))}
                        </select>
                    </div>
                    {errors.time && <p style={{ color: 'red' }}>{errors.time}</p>}

                    <div className="inputDiv">
                            <label htmlFor="description">Describe la mascota</label>
                            <textarea name="description" 
                            placeholder="Puedes compartir todos los datos que consideres necesarios" 
                            rows="10"
                            value={formData.description}
                            onChange= { handleDescriptionChange }></textarea>
                    </div>
                    {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}         
                </div>
        </div>
        )}
        {currentStep === 2 && (
            <div className="verificacion">
                <h2>Verificación</h2>
                    <div className="alertPreview">
                        <p>Lamentamos mucho que {formData.petName} se haya extraviado, pero no será por mucho tiempo. Por favor verifica que la información sea correcta</p>
                        <h3>Información de {formData.petName}</h3>
                        <div className="prevInfoContainter">
                            <div className="imgPrevContainer"></div>
                            <div>
                                <ul>
                                <li>Hora: {formData.time}</li>
                                <li>Tipo de animal:<span>{formData.type}</span></li>
                                <li>Tamaño: <span>{formData.size}</span></li>
                                <li>Color: <span>{formData.color1}</span></li>
                                <li>Raza: <span>{formData.breed}</span></li>
                                <li>Descripción: {formData.description}</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                        <p>Datos usuario</p>
                        <ul>
                            <li>{formData.personName}</li>
                            <li>{formData.email}</li>
                        </ul>
                        </div>
                    </div>
            </div>
        )}
            <div className="btnStepForm">
                {currentStep === 1 ? (
                    <button id="next" onClick={handleNext}>
                    Continuar
                    </button>
                ) : (
                    <>
                    <button className="btn secundary" onClick={handlePrev}>
                    Regresar
                </button>
                    <button id="next" onClick={handleSubmit}>
                    Crear Alerta
                    </button>
                    </>
                )}
            </div>
    </form>
      
      
    </>
)
    
}