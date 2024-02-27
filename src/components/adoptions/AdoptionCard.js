import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export const AdoptionCard = ({adoption,   onDeleteClick , onEditClick , showButtons}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
 
  const handleDeleteConfirm =()=>{
    onDeleteClick(adoption._id);
    setShowModal(false)
  }
  const handleCancel = () => {
    setShowModal(false);
    navigate('/adoption');
  };

  return (
    <> 
    {showModal && (
      <div className="myModal">
          <div className="headerModal">
            <h1>¿Estás seguro que deseas eliminar esta adopción?</h1>
            <i class="bi bi-x" onClick={handleCancel}></i>
          </div>
          <div className="bodyModal">
          <button onClick={handleCancel}>
          Cancelar
          </button>
          <button onClick={handleDeleteConfirm} className="buttonDelete">
          Sí, ELIMINAR
          </button>
          </div>
      </div>
    )}
       <li>
        <img src={adoption.img} alt={adoption.type}/>
        <p>Color: {adoption.color1}, tamaño: {adoption.size}</p>
        {/* <Link to={`/alert-detail?alertId=${alert._id}`}>
          <button className="viewAlert">Ver alerta</button>
        </Link> */}
        
        {showButtons && (
         <div className="buttonsAlert">
         <button className="buttonDelete" onClick={() => setShowModal(true)}>
           <i className="bi bi-trash"/>
         </button>
       
         <Link to={`/adoption-edit?adoptionId=${adoption._id}`}>
         <button className="btn">
           <i className="bi bi-pencil"/>
         </button>
         </Link>
       </div>
        )}
    </li>
    </>

    
  )
}
