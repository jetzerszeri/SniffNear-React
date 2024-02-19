import { Link, useNavigate } from "react-router-dom";

export const AlertCard = ({alert,   onDeleteClick , onEditClick , showButtons}) => {
  const navigate = useNavigate();
  return (
    <li>
        <div>
        <Link to={`/pet-profile?petId=${alert._id}`}>
            <img src="./img/foundIcon.svg" alt="icono"/>
            <h2>{alert.type} {alert.alertType}</h2>
            </Link>
        </div>
        
        <img src={alert.img} alt={alert.type}/>
       
        <p>Color: {alert.color1}, tamaño: {alert.size}</p>
        <p><i className="bi bi-geo-alt"></i>Argentina</p>
        {showButtons && (
          <>
            <button onClick={() => onDeleteClick(alert._id)}>
              <i className="bi bi-trash"/>
            </button>
            <Link to={`/alerts-edit?alertId=${alert._id}`}>
            <button className="btn">
              <i className="bi bi-pencil"/>
            </button>
            </Link>
           
          </>
        )}
    </li>
  )
}
