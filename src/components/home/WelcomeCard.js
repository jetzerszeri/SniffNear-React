export const WelcomeCard = ({name, location}) => {
  return (
    <section className="welcomeCard">
        <img src="./img/avatarPorDefecto.webp" alt="Avatar del usuario"/>
        <div>
            <h1>Hola, {name}!</h1>
            <p><i className="bi bi-geo-alt"></i> <span className="ubicacionSpan"></span>{location}intento</p>
        </div>
    </section>
  )
}
