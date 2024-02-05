import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "../../Navbar";
export const FormLostA = () =>{
    const [showStep1 , setShowStep1]= useState(true);
    const [showStep2, setShowStep2] = useState(false);
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

return(
    <>
    <Navbar/>
    <form className="addNewPetForm createAlert">
        {showStep1 && (
            <div className="lugarYFecha">
                <h2>¿Dónde y cuándo la viste por última vez?</h2>
                <p className="stepSubHeading">Arrastrá el marcador</p>
                <input type="hidden" 
                name="latitude"
                id="latitude" 
                />
                <input 
                type="hidden" 
                name="longitude" 
                id="longitude" 
                />
                <div className="containerFormStepsSelectors">
                    <div className="mapacontainer"></div>
                    <div id="mi_mapa"></div>
                    <div className="inputDiv">
                        <label htmlFor="date">¿Cuándo?</label>
                        <input 
                        type="date" 
                        name="date"/>
                    </div>

                    <div className="inputDiv">
                        <label htmlFor="time">¿A qué hora?</label>
                        <select name="time"  defaultValue="DEFAULT" >
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

                    <div className="inputDiv">
                            <label htmlFor="description">Describe la mascota</label>
                            <textarea name="description" placeholder="Puedes compartir todos los datos que consideres necesarios" rows="10"></textarea>
                    </div>
                        

                </div>
        </div>
        )}
        {showStep2 && (
            <div className="verificacion">
                <h2>Verificación</h2>
                    <div className="alertPreview">
                        <p>Muchas gracias por ayudarnos a que el regreso a casa sea una realidad. Por favor verificá que la información sea correcta.</p>
                        <h3>Información de la mascota</h3>
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