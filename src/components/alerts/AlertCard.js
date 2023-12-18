export const AlertCard = ({alert,  onDeleteClick , onEditClick}) => {
    
  return (
    <li>
        <div>
            <img src="./img/foundIcon.svg" alt="icono"/>
            <h2>{alert.type} {alert.alertType}</h2>
        </div>
        {/* <img src={alert.img} alt={alert.type}/> */}
        <p>Color: {alert.color1}, tamaño: {alert.size}</p>
        <p><i className="bi bi-geo-alt"></i>Argentina</p>
        <button onClick={() => onDeleteClick(alert._id)}>
        <i className="bi bi-trash"/>
        </button>
        <button onClick={()=>onEditClick(alert)} >
          <i className="bi bi-pencil"/>
        </button>
        {/* <p><i className="bi bi-calendar4-week"></i> {alert.date}, {alert.time}</p> */}
        {/* <button className="btn secundary small">Ver detalles</button> */}
    </li>
  )
}
