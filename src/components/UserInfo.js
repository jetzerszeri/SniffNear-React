import { Navbar } from "./Navbar"

export const UserInfo = () => {


  return (
    <>
    <Navbar/>
    
    <main className="mainPetProfile">
      <h1>Detalle mascota</h1>

      <div className="petNameCard">
        <img src="img/avataruser.png" alt="Avatar del user" />
        <div>
          <h2>Cargando...</h2>
          <p>...</p>
        </div>
        <i className="bi bi-pencil"></i>
      </div>
    </main>
    
    </>
  )
}
