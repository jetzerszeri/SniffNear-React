import React from 'react'

export const WelcomeCard = () => {
  return (
    <section className="welcomeCard">
        <img src="./img/avatarPorDefecto.webp" alt="Avatar del usuario"/>
        <div>
            <h1>Cargando info...</h1>
            <p><i className="bi bi-geo-alt"></i> <span className="ubicacionSpan">Mendoza, Argentina</span></p>
        </div>
    </section>
  )
}
