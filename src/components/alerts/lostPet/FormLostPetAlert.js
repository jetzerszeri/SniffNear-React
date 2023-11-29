export const FormLostPetAlert = () => {
  return (
    <>
        <form className="addNewPetForm createAlert">
        <h2>¿Dónde y cuándo la viste por última vez?</h2>
        <div className="containerFormStepsSelectors">

            <div className="inputDiv">
                <label htmlFor="lugar">Lugar</label>
                <input type="text" name="lugar" />
            </div>
            <div className="inputDiv">
                <label htmlFor="date">¿Cuándo?</label>
                <input type="date" name="date"/>
            </div>

            <div className="inputDiv">
                <label htmlFor="time">¿A qué horas?</label>
                <select name="time" >
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

            <div className="inputDiv">
                <label htmlFor="description">Describe la mascota</label>
                <textarea name="description" placeholder="Puedes compartir todos los datos que consideres necesarios" rows="10"></textarea>
            </div>
        </div>

        <button id="next">Continuar</button>

        </form>
    </>
  )
}
