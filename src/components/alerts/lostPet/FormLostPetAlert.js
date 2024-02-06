import React from "react";
import { useState, useEffect, useCallback} from "react";
import { Navbar } from "../../Navbar";
import { MapaLost } from "../map/MapLost";
import { useNavigate } from "react-router";
import {getCurrentUserId } from '../../../js/functions';
import { useLocation } from "react-router";

export const FormLostA = () =>{
    const [showStep1 , setShowStep1]= useState(true);
    const [showStep2, setShowStep2] = useState(false);
    const [user, setUser] = useState({ name: '', email: '' }); 
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState({});
    const [petInfo, setPetInfo] = useState(null);
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
    const handlePrev = (e) =>{
        e.preventDefault();
        setShowStep1(true);
        setShowStep2(false);
    }

    const handleNext = (e) =>{
        e.preventDefault();
        setShowStep1(false);
    }
    useEffect(() => {
        if (!showStep1) {
          setShowStep2(true);
        }
    }, [showStep1]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const petIdTest = searchParams.get("petId");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sniffnear-api.onrender.com/api/pets/${petIdTest}`);
                if (response.ok) {
                    const petData = await response.json();
                    setPetInfo(petData);
                    setFormData({
                        ...formData,
                        petName: petData.name,
                        type: petData.type,
                        size: petData.size,
                        color1: petData.color1,
                        breed: petData.breed,
                        img: petData.img,
                        sex: petData.sex,
                        pet: petData._id,
                    });
    
                } else {
                    throw new Error('Failed to fetch pet data');
                }
            } catch (error) {
                console.error('Error fetching pet data:', error);
            }
        };
        fetchData();
    }, [petIdTest, formData]);

    const getUserInfo = useCallback(async () => {
        try {
            const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${getCurrentUserId()}`);
            if (response.ok) {
                const { user } = await response.json();
                setUser(user);
                setFormData({
                    ...formData,
                    personName: user.name,
                    email: user.email,
                    creator: user._id,
                });
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [formData]);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

   
    const handleDateChange = (e) => {
        setDate(e.target.value)
        setFormData({
            ...formData,
            date: e.target.value
        })
    }

    const handleTimeChange = (e) => {
        setTime(e.target.value)
        setFormData({
            ...formData,
            time: e.target.value
        })
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
        setFormData({
            ...formData,
            description: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!date) {
            newErrors.date = 'La fecha es requerida';
        }
    
        if (!time) {
            newErrors.time = 'La hora es requerida';
        }
    
        if (!description) {
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
        {showStep1 && (
            <div className="lugarYFecha">
                <h2>¿Dónde y cuándo la viste por última vez?</h2>
                <MapaLost/>
                <div className="containerFormStepsSelectors">
                    <div className="inputDiv">
                        <label htmlFor="date">¿Cuándo?</label>
                        <input 
                        type="date" 
                        name="date"
                        value={date}
                        onChange={handleDateChange}
                        />
                    </div>
                    {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                    <div className="inputDiv">
                        <label htmlFor="time">¿A qué hora?</label>
                        <select name="time"  
                        value={time} 
                        onChange={handleTimeChange}>
                                <option value="DEFAULT" disabled>Selecciona una hora</option>
                                <option value="6am">6 AM</option>
                                <option value="7am">7 AM</option>
                                <option value="8am">8 AM</option>
                                <option value="9am">9 AM</option>
                                <option value="10am">10 AM</option>
                                <option value="11am">11 AM</option>
                                <option value="12pm">12 PM</option>
                                <option value="1pm">1 PM</option>
                                <option value="2pm">2 PM</option>
                                <option value="3pm">3 PM</option>
                                <option value="4pm">4 PM</option>
                                <option value="5pm">5 PM</option>
                                <option value="6pm">6 PM</option>
                                <option value="7pm">7 PM</option>
                                <option value="8pm">8 PM</option>
                                <option value="9pm">9 PM</option>
                        </select>
                    </div>
                    {errors.time && <p style={{ color: 'red' }}>{errors.time}</p>}

                    <div className="inputDiv">
                            <label htmlFor="description">Describe la mascota</label>
                            <textarea name="description" 
                            placeholder="Puedes compartir todos los datos que consideres necesarios" 
                            rows="10"
                            onChange= { handleDescriptionChange }></textarea>
                    </div>
                    {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}         
                </div>
        </div>
        )}
        {showStep2 && (
            <div className="verificacion">
                <h2>Verificación</h2>
                    <div className="alertPreview">
                        <p>Lamentamos mucho que {formData.petName} se haya extraviado, pero no será por mucho tiempo. Por favor verifica que la información sea correcta</p>
                        <h3>Información de {formData.petName}</h3>
                        <div className="prevInfoContainter">
                            <div className="imgPrevContainer"></div>
                            <div>
                                <ul>
                                <li>Tipo de animal:<span>{formData.type}</span></li>
                                <li>Tamaño: <span>{formData.size}</span></li>
                                <li>Color: <span>{formData.color1}</span></li>
                                <li>Raza: <span>{formData.breed}</span></li>
                                <li>Descripción: {formData.description}</li>
                                </ul>
                            </div>
                        </div>
                        {/* tengo que traer la informacion de la mascota que se selecciono  */}
                    </div>
                    <div className="btnSpetForm">
                    <button className="btn secundary" onClick={handlePrev}>Regresar</button>
                    <button id="next" type="submit">Publicar Alerta</button>
                    </div>

            </div>
        )}
            <div className="btnStepForm">
                <button className="btn secundary" onClick={handlePrev}>Regresar</button>
                <button id="next" onClick={handleNext}>Continuar</button>
            </div>
            

    </form>
      
      
    </>
)
    
}