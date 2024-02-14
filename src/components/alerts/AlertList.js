import React, { useState,useEffect} from 'react';
import { AlertCard } from './AlertCard';
import { Link } from 'react-router-dom';
// import { useNavigate  } from 'react-router-dom';
export const AlertList = ({alerts, onAlertDelete, userId}) => {
    const handleDeleteClick = async (id) => {
        try {
        const response = await fetch(`https://sniffnear-api.onrender.com/api/alerts/${id}`, {
            method: 'DELETE',
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        
        // const updatedAlerts = alertList.filter(alert => alert._id !== id);
        // setAlertList(updatedAlerts);
        onAlertDelete(id);
        console.log(`La alerta con el id ${id} se ha eliminado correctamente.`);
        } catch (error) {
        console.error('Error al eliminar la alerta:', error);
        }
    };
    const handleEditClick = (alertToEdit) => {
        // Aquí puedes abrir un formulario con los datos precargados para editar la alerta
        console.log('Editar alerta:', alertToEdit);
    };
    return (
        <div className="listAlertas">
 
                <div className='topNavBar'>
                    
                        <h1>Listado de alertas</h1>
                    <Link to={"/mapa-list"}>
                        <i className="bi bi-map-fill"></i>
                    </Link>
                 </div> 
     
           
            <ul>
                {alerts.map((alert) => {
                const isOwner = alert.creator._id === userId;
                    return <AlertCard 
                    alert={alert} 
                    key={alert._id}
                    onDeleteClick={handleDeleteClick} 
                    onEditClick={handleEditClick}
                    showButtons={isOwner}
                    />
                })}
            </ul>
        </div>

    )
}
