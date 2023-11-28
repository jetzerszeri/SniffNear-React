export const PetCard = ({pet}) => {

  return (
    <li key={pet.id}>
        <div>
            <img src={pet.img} alt={pet.name}/>
        </div>
        <p>{pet.name}</p>
    </li>
  )
}
