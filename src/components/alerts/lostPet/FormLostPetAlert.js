import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

export const FormLostPetAlert = ({petInfo, user}) => {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        petName: petInfo.name,
        type: petInfo.type,
        size: petInfo.size,
        color1: petInfo.color1,
        color2: '',
        breed: petInfo.breed,
        description: '',
        latitude: '',
        longitude: '',
        date: '',
        time: '',
        img: petInfo.img,
        personName: user.name,
        email: user.name,
        password: '',
        alertType: 'lost',
        sex: petInfo.sex,
        pet: petInfo._id,
        creator: user._id,
    });

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
            //   navigate('/')
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
    <>
        <form onSubmit={handleSubmit} className="addNewPetForm createAlert">
        <h2>¿Cuándo la viste por última vez?</h2>
        <div className="containerFormStepsSelectors">

            {/* <div className="inputDiv">
                <label htmlFor="lugar">Lugar</label>
                <input type="text" name="lugar" />
            </div> */}
            <div className="inputDiv">
                <label htmlFor="date">¿Cuándo?</label>
                <input type="date" name="date" value={ date } onChange= { handleDateChange }/>
            </div>
            {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
            <div className="inputDiv">
                <label htmlFor="time">¿A qué horas?</label>
                <select name="time"  value={ time } onChange= { handleTimeChange }>
                    <option defaultValue="">Selecciona una hora</option>
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
                <textarea name="description" placeholder="Puedes compartir todos los datos que consideres necesarios" rows="10" onChange= { handleDescriptionChange }></textarea>
            </div>
        </div>
        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}    
        <button id="next">Guardar</button>

        </form>
    </>
  )
}
