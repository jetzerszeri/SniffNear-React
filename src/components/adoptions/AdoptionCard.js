import React, { useEffect, useState } from "react";
import { AdoptionList } from "./AdoptionList";
import { BottomNav } from "../BottomNav";
import { getCurrentUserId, createLoader, removeLoader } from "../../js/functions";
import { Link } from "react-router-dom";

export const AdoptionCard = ({adoption, selectLostPet, clickType}) => {

  const [adoptions, setAdoptions] = useState([]);
  const [filteredAdoptions, setFilteredAdoptions] = useState(adoptions);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const getAdoptions = async () => {
      try {
        createLoader('Cargando artículos');
        const response = await fetch(`https://sniffnear-api.onrender.com/api/adoption/`);
        if (response.ok) {
          const data = await response.json();
          setAdoptions(data);
          removeLoader();
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getAdoptions();
  }, []);

  useEffect(() => {
    setFilteredAdoptions(adoptions);
  }, [adoptions]);


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
export default AdoptionCard;
