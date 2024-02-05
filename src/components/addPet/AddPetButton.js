import React from "react";
import { Link } from "react-router-dom";
export const AddPetButton = ({route}) =>{
    return(
        <>
            <div style={{ display:'flex', flexDirection: 'column'}}>
                <span className="addPetBtn">
                    <Link to={`/add-pet?route=${route}`}>
                        <i className="bi bi-plus"></i>
                    </Link>
                </span>
                <p>Agregar</p>
            </div>
        </>
    )
}