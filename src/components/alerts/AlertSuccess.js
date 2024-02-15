import React, { useEffect } from "react";
import { useNavigate } from "react-router";  
export const AlertSuccess = () =>{
    const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/alerts');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
    return(
        <>
        <body className="alertSuccess"> <main className="homeMain"> 
        <i className="bi bi-check-lg sizeCheck"></i> 
        <h1>Alerta publicada con éxito!</h1>
        <p>Redireccionando a la página de alertas en 5 segundos...</p>
        </main> 
        </body>
        </>
       
    )
}