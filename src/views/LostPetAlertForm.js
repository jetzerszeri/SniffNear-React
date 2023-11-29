import { useState, useCallback, useEffect } from "react"
import { Navbar } from "../components/Navbar"
import { HomeLostPetAlert } from "../components/alerts/lostPet/HomeLostPetAlert"
import { FormLostPetAlert } from "../components/alerts/lostPet/FormLostPetAlert";

export const LostPetAlertForm = () => {
    const storedUserId = localStorage.getItem('userId');
    const [ pets, setPets ] = useState([]);
    const [ step, setStep ] = useState(1);
    const [ petId, setPetId ] = useState({});
    const [ user, setUser ] = useState({});


    const getUserPets = useCallback( async () => {
      const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${storedUserId}`);
      if(response.ok){
        const  {user, pets}  = await response.json();
        setPets(pets);
        setUser(user);
      } 
    }, [storedUserId])
  
    useEffect(() => {
      getUserPets();
    }, [getUserPets])
 

    function setPetHandler(id) {
        setPetId(id);
        setStep(2);
        // console.log(id);
        // console.log(step, petId);
    }




  return (
    <>
        <Navbar />
        <main>
            
            {step === 1 && <HomeLostPetAlert setPetHandler={setPetHandler} pets={pets}/>}
            {step === 2 && <FormLostPetAlert petInfo={petId} user={user}/>}
            {/* <FormLostPetAlert /> */}

        </main>
    
    </>
  )
}
