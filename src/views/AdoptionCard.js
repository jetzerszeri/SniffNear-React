export const AdoptionCard = ({adoption, selectLostPet, clickType}) => {

    const handleClick = () => {
      if (clickType === "lost") {
        selectLostPet(adoption);
      }
    }
    return (
      <li onClick={handleClick}>
          <div>
              <img src={adoption.img} alt={adoption.name}/>
          </div>
          <p>{adoption.name}</p>
      </li>
    )
  }