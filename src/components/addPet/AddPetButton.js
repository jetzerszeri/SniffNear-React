export const AddPetButton = () =>{
    return(
        <>
            <div style={{ display:'flex', flexDirection: 'column'}}>
                <span className="addPetBtn">
                        <a href="/add-pet"><i className="bi bi-plus"></i></a>
                </span>
                <p>Agregar</p>
            </div>
        </>
    )
}