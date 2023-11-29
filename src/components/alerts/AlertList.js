import React from 'react'
import { AlertCard } from './AlertCard'

export const AlertList = ({alerts}) => {







    
    return (
        <div className="listAlertas">
            <h1>Listado de alertas</h1>

            <ul>
                {alerts.map((alert) => {
                    return <AlertCard alert={alert} key={alert._id}/>

                })}
            </ul>


        </div>

    )
}
