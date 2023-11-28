import { PetCard } from "./PetCard"

export const MyPetsCards = ({pets}) => {
  return (
    <section className="myPetsCard">
        <h2>Tus Mascotas</h2>
        <div>
            <div >
                <span className="addPetBtn">
                    <a href="/add-pet"><i className="bi bi-plus"></i></a>
                </span>
                <p>Agregá</p>
            </div>
            <ul>
                {pets.map((pet) => {
                    return <PetCard pet={pet} key={pet._id}/>
                })}
            </ul>
        </div>
    </section>
  )
}
