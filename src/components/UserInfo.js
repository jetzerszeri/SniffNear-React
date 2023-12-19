import React, { useEffect, useState, useRef } from 'react';
import { Navbar } from "./Navbar";

export const UserInfo = () => {
  const [user, setUser] = useState(null);
  const userNameH2Ref = useRef(null);
  const userEmailPRef = useRef(null);
  const userPasswordPRef = useRef(null);
  const userImgRef = useRef(null);
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
            userImgRef.current.src = formData.img;
            userNameH2Ref.current.innerHTML = formData.name;
            userEmailPRef.current.innerHTML = formData.email;
            userPasswordPRef.current.innerHTML = formData.password;
          }

          const usersUl = document.createElement('ul');
          usersUl.classList.add(`${formData.sex}UserInfo`);

          // Solo añadir campos específicos
          createLiOfUserInfo('Nombre', formData.name, usersUl);
          createLiOfUserInfo('Email', formData.email, usersUl);
          createLiOfUserInfo('Contraseña', formData.password, usersUl);

          // Actualizar referencias
          sectionUserInfoRef.current.appendChild(usersUl);

          // Añadir el evento del botón de edición
          editUserBtnRef.current.addEventListener('click', () => {
            window.location.href = `user-profile?id=${userIdTest}`;
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
          <img ref={userImgRef} alt="Avatar del usuario" />
          <div>
            <h2 ref={userNameH2Ref}>Cargando...</h2>
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
