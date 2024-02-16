import React, { useState, useEffect } from "react";
import { Navbar } from "../../Navbar";
// import MapComponente from "../map/MapLost";
import Mapa from "../map/MapLost";
import { useNavigate } from "react-router";
import {getCurrentUserId } from '../../../js/functions';
import { useLocation } from "react-router";
import axios from 'axios';
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const FormLostA = () =>{
    const [currentStep, setCurrentStep] = useState(1);
    const [user, setUser] = useState(null); 
    const [errors, setErrors] = useState({});
    const [petInfo, setPetInfo] = useState(null);
    const location = useLocation();
    const petIdTest = new URLSearchParams(location.search).get("petId");
    const navigate =useNavigate();
    const current_route = location.pathname;
    const [formData, setFormData] = useState({
        petName: '',
        type: '',
        size: '',
        color1: '',
        breed: '',
        description: '',
        latitude: '',
        longitude: '',
        date: getCurrentDate(),
        time: '',
        img: '',
        personName: '',
        email: '',
        alertType: 'perdido',
        sex: '',
        creator: '',
    });
    const handlePrev = (e) => {
        e.preventDefault();
        setCurrentStep(currentStep - 1);
      };
    
      const handleNext = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.date) {
            newErrors.date = 'La fecha es requerida';
        }
    
        if (!formData.time) {
            newErrors.time = 'La hora es requerida';
        }
    
        if (!formData.description) {
            newErrors.description = 'Debe ingresar una descripción';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
          setCurrentStep(currentStep + 1);
      }
      
      };
      const handleNewCoords = (lat , lng) =>{
        setFormData(prevData => ({
          ...prevData,
          latitude: lat,
          longitude: lng,
        }));
      }
      useEffect(() => {
        if (currentStep === 2) {  
          const fetchPet = async () => {
            try {
              const response = await axios.get(
                `https://sniffnear-api.onrender.com/api/pets/${petIdTest}`
              );
              if (response.status === 200 && response.data) {
                const petData = response.data.pet;
                setPetInfo(petData);
                if (petData) {
                  setFormData((prevData) => ({
                    ...prevData,
                    petName: petData.name,
                    type: petData.type,
                    size: petData.size,
                    color1: petData.color1,
                    breed: petData.breed,
                    img: petData.img,
                  }));
                }
              } else {
                throw new Error("Failed to fetch pet data");
              }
            } catch (error) {
              console.error("Error fetching pet data:", error);
            }
          };
    
        if (currentStep === 2 && petIdTest) {
            fetchPet();
        }
        }
      }, [currentStep, petIdTest]);         
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch(
              `https://sniffnear-api.onrender.com/api/users/${getCurrentUserId()}`
            );
            if (response.ok) {
              const { user } = await response.json();
              setUser(user);
              setFormData((prevData)=>({
                ...prevData,
                personName: user.name,
                email: user.email,
                creator: user._id
              }));
            } else {
              throw new Error("Failed to fetch user data");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUser();
      }, []);

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
              console.log('se registro la alerta');
             navigate('/success')
              
              
            } else {
                console.error('Error en el registro:', json.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
};

return(
    <>
    <Navbar/>
    <main>
      <form className="addNewPetForm createAlert" onSubmit={handleSubmit}>
    {currentStep === 1 && (
            <div className="lugarYFecha">
                <h2>¿Dónde y cuándo la viste por última vez?</h2>
                <Mapa onMarkerDragEnd={handleNewCoords} route={current_route}/>
                <div className="containerFormStepsSelectors">
                    <div className="inputDiv">
                        <label htmlFor="date">¿Cuándo?</label>
                        <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleDateChange}
                        max={getCurrentDate()}
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
                        <p>Lamentamos mucho que <strong>{formData.petName}</strong> se haya extraviado, pero no será por mucho tiempo. Por favor verifica que la información sea correcta</p>
                        <h3>Información de <strong>{formData.petName}</strong></h3>
                        <div className="prevInfoContainter">
                        {petInfo && petInfo.img && (
                             <img src={petInfo.img} alt="Imagen de la mascota perdida"className="imgPrevContainer" />
                        )}
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
                        <div>
                            <h3> Datos del usuario</h3>
                            <ul>
                                <li>Nombre de usuario: {formData.personName}</li>
                                <li> Email: {formData.email}</li>
                            </ul>
                        </div>
                      
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
  
    </main>
    
     
      
    </>
)
    
}