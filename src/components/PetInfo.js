import React, { useEffect, useState, useRef } from 'react';

const PetInfo = () => {
  const [pet, setPet] = useState(null);
  const petNameH2Ref = useRef(null);
  const petTypePRef = useRef(null);
  const petImgRef = useRef(null);
  const sectionPetInfoRef = useRef(null);
  const editPetBtnRef = useRef(null);

  const createLiOfPetInfo = (infoName, info, ul) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<p><span>${infoName}:</span> <span>${info}</span></p>`;
    ul.appendChild(listItem);
  };

  const getGenero = (mascota) => {
    if (mascota.sex === 'male') {
      return 'Masculino';
    } else if (mascota.sex === 'female') {
      return 'Femenino';
    } else {
      return 'No especificado';
    }
  };

  const calculateAge = (isoDate) => {
    const birthDate = new Date(isoDate);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (
      currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate()
    ) {
      months--;
    }

    let texto = `${years} años`;
    switch (years) {
      case 0:
        texto = `${months} meses`;
        break;
      case 1:
        if (months === 0) {
          texto = `${years} año`;
        } else {
          texto = `${years} año y ${months} meses`;
        }
        break;
      default:
        if (months === 0) {
          texto = `${years} años`;
        } else {
          texto = `${years} años y ${months} meses`;
        }
        break;
    }

    return texto;
  };

  useEffect(() => {
    const getPetInfo = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const petIdTest = urlParams.get('petId');

        const response = await fetch(
          `https://sniffnear-api.onrender.com/api/pets/${petIdTest}`
        );

        if (response.ok) {
          const data = await response.json();
          const petData = data.pet;

          setPet(petData);

          // Actualizar referencias
          if (petData) {
            petImgRef.current.src = petData.img;
            petNameH2Ref.current.innerHTML = petData.name;
            petTypePRef.current.innerHTML = petData.type;
            sectionPetInfoRef.current.innerHTML = '';
          }

          const petsUl = document.createElement('ul');
          petsUl.classList.add(`${petData.sex}PetInfo`);

          createLiOfPetInfo('Género', getGenero(petData), petsUl);
          createLiOfPetInfo('Edad', calculateAge(petData.birthdate), petsUl);
          createLiOfPetInfo('Tamaño', petData.size, petsUl);
          createLiOfPetInfo('Color', petData.color1, petsUl);
          createLiOfPetInfo('Raza', petData.breed, petsUl);

          // Actualizar referencias
          sectionPetInfoRef.current.appendChild(petsUl);

          // Añadir el evento del botón de edición
          editPetBtnRef.current.addEventListener('click', () => {
            window.location.href = `/edit-pet-profile?petId=${petIdTest}`;
          });
        } else {
          // Manejo de errores
          sectionPetInfoRef.current.innerHTML = `
              <div class="errorMsgPetProfile">
                  <p>Hubo un error en el servidor, por favor intenta más tarde.</p>

                  <a href="/" class="btn">Regresar al Home</a>
              </div>`;
        }
      } catch (error) {
        // Manejo de errores
      }
    };

    getPetInfo();
  }, []);

  return (
    <main className="mainPetProfile">
      <h1>Detalle mascota</h1>

      <div className="petNameCard">
        <img ref={petImgRef} alt="Avatar de la mascota" />
        <div>
          <h2 ref={petNameH2Ref}>Cargando...</h2>
          <p ref={petTypePRef}>...</p>
        </div>
        <i ref={editPetBtnRef} className="bi bi-pencil"></i>
      </div>
      <section ref={sectionPetInfoRef}></section>
    </main>
  );
};

export default PetInfo;
