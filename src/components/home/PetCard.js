export const PetCard = ({pet, selectLostPet, clickType}) => {

  const handleClick = () => {
    if (clickType === "lost") {
      selectLostPet(pet);
    }
  }
  return (
    <li onClick={handleClick}>
        <div>
            <img src={pet.img} alt={pet.name}/>
        </div>
        <p>{pet.name}</p>
    </li>
  )
}
