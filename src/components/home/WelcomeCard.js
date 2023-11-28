

export const WelcomeCard = ({name}) => {
  return (
    <section className="welcomeCard">
        <img src="./img/avatarPorDefecto.webp" alt="Avatar del usuario"/>
        <div>
            <h1>Hola, {name}!</h1>
            <p><i className="bi bi-geo-alt"></i> <span className="ubicacionSpan">Mendoza, Argentina</span></p>
        </div>
    </section>
  )
}
