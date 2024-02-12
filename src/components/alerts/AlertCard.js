import { useNavigate } from "react-router"
export const AlertCard = ({alert,  onDeleteClick , onEditClick , showButtons}) => {
  const navigate = useNavigate();
  return (
    <li>
        <div>
            <img src="./img/foundIcon.svg" alt="icono"/>
            <h2>{alert.type} {alert.alertType}</h2>
        </div>
        <img src={alert.img} alt={alert.type}/>
        <p>Color: {alert.color1}, tamaño: {alert.size}</p>
        <p><i className="bi bi-geo-alt"></i>Argentina</p>
        {showButtons && (
          <>
            <button onClick={() => onDeleteClick(alert._id)}>
              <i className="bi bi-trash"/>
            </button>
            <button className="btn" onClick={() => navigate(`${alert._id}/edit`)}>
              <i className="bi bi-pencil"/>
            </button>
          </>
        )}
    </li>
  )
}
