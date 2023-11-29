export const AlertCard = ({alert}) => {
    
  return (
    <li>
        <div>
            <img src="./img/foundIcon.svg" alt="icono"/>
            <h2>{alert.type} perdido</h2>
        </div>
        <img src={alert.img} alt={alert.type}/>
        <p>Color: {alert.color1}, tamaño: {alert.size}</p>
        <p><i className="bi bi-geo-alt"></i> Mendoza, Argentina</p>
        {/* <p><i className="bi bi-calendar4-week"></i> {alert.date}, {alert.time}</p> */}
        {/* <button className="btn secundary small">Ver detalles</button> */}
    </li>
  )
}
