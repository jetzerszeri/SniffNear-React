import React, { useEffect, useState, useRef } from 'react';
import { Navbar } from "./Navbar";

export const UserInfo = () => {
  const [users, setUser] = useState(null);
  const userNameH2Ref = useRef(null);
  // const userLocationPRef = useRef(null);
  const userEmailPRef = useRef(null);
  const userPasswordPRef = useRef(null);
  // const profileImg = useRef(null);
  const sectionUserInfoRef = useRef(null);
  const editUserBtnRef = useRef(null);
  

  const createLiOfUserInfo = (infoName, info, ul) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<p><span>${infoName}:</span> <span>${info}</span></p>`;
    ul.appendChild(listItem);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userIdTest = urlParams.get('userId');

        const response = await fetch(
          `https://sniffnear-api.onrender.com/api/users?userId=${userIdTest}`
        );

        if (response.ok) {
          const data = await response.json();
          const formData = data.user;

          setUser(formData);

          // Actualizar referencias
          if (formData) {
            // profileImg.current.src = formData.profileImg;
            userNameH2Ref.current.innerHTML = formData.name;
            // userLocationPRef.current.innerHTML = formData.location;
            userEmailPRef.current.innerHTML = formData.email;
            userPasswordPRef.current.innerHTML = formData.password;
          }

          const usersUl = document.createElement('ul');
          usersUl.classList.add(`${formData.sex}UserInfo`);

          // Solo añadir campos específicos
          createLiOfUserInfo('Nombre', formData.name, usersUl);
          // createLiOfUserInfo('Ubicación', formData.location, usersUl);
          createLiOfUserInfo('Email', formData.email, usersUl);
          createLiOfUserInfo('Contraseña', formData.password, usersUl);

          // Actualizar referencias
          sectionUserInfoRef.current.appendChild(usersUl);

          editUserBtnRef.current.addEventListener('click', () => {
            window.location.href = `/edit-user-profile?userId=${userIdTest}`;
          });
         
        } else {
          // Manejo de errores
          sectionUserInfoRef.current.innerHTML = `
            <div class="errorMsgPetProfile">
                <p>Hubo un error en el servidor, por favor intenta más tarde.</p>

                <a href="/" class="btn">Regresar al Home</a>
            </div>`;
        }
      } catch (error) {
        // Manejo de errores
      }
    };

    getUserInfo();
  }, []);

  return (
    <>
      <Navbar/>

      <main className="mainPetProfile">
        <h1>Perfil del usuario</h1>

        <div className="petNameCard">
          {/* <img ref={profileImg} alt="Avatar del usuario" /> */}
          <div>
            <h2 ref={userNameH2Ref}>Cargando...</h2>
            {/* <p ref={userLocationPRef}>...</p> */}
            <p ref={userEmailPRef}>...</p>
            <p ref={userPasswordPRef}>...</p>
          </div>
          <i ref={editUserBtnRef} className="bi bi-pencil"></i>
        </div>
        <section ref={sectionUserInfoRef}></section>
      </main>
    </>
  );
};

export default UserInfo;
