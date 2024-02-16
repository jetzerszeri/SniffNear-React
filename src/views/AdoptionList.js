import React, { useState,useEffect} from 'react';
import { AdoptionCard } from './AdoptionCard';
import { Link } from 'react-router-dom';
// import { useNavigate  } from 'react-router-dom';
export const AdoptionList = ({adoptions, onAdoptionDelete, userId}) => {
    const handleDeleteClick = async (id) => {
        try {
        const response = await fetch(`https://sniffnear-api.onrender.com/api/adoptions/${id}`, {
            method: 'DELETE',
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        onAdoptionDelete(id);
        console.log(`La adopción con el id ${id} se ha eliminado correctamente.`);
        } catch (error) {
        console.error('Error al eliminar la adopción:', error);
        }
    };
    const handleEditClick = (adoptionToEdit) => {
        console.log('Editar adopción:', adoptionToEdit);
    };
    return (
        <div className="listAlertas">
 
                <div className='topNavBar'>
                    
                        <h1>Listado de adopciones</h1>
                        {/* esto lo comento porque puede servir para enlazar el chat */}
                    {/* <Link to={"/mapa-list"}>
                        <i className="bi bi-map-fill"></i>
                    </Link> */}
                 </div> 
     
           
            <ul>
                <h1>Hola llegue y este es el listado de adopciones</h1>
                {/* {adoptions.map((adoption) => {
                const isOwner = adoption.creator._id === userId;
                    return <AdoptionCard 
                    adoption={adoption} 
                    key={adoption._id}
                    onDeleteClick={handleDeleteClick} 
                    onEditClick={handleEditClick}
                    showButtons={isOwner}
                    />
                })} */}
            </ul>
        </div>

    )
}
