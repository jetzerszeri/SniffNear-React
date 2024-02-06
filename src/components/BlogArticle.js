import React, { useEffect, useState, useRef } from 'react';

const ArticleInfo = () => {
  const [article, setArticle] = useState(null);
  const articleTitleH2Ref = useRef(null);
  const articleTypePRef = useRef(null);
  const articleImgRef = useRef(null);
  const articleContentRef = useRef(null);
  const sectionArticleInfoRef = useRef(null);
  const editArticleBtnRef = useRef(null);

  const createLiOfArticle = (articleTitle, info, ul) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<p><span>${articleTitle}:</span> <span>${info}</span></p>`;
    ul.appendChild(listItem);
  };


  useEffect(() => {
    const getArticleInfo = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const articleIdTest = urlParams.get('articleId');

        const response = await fetch(
          `https://sniffnear-api.onrender.com/api/article/${articleIdTest}`
        );

        if (response.ok) {
          const data = await response.json();
          const articleData = data.article;

          setArticle(articleData);

          // Actualizar referencias
          if (articleData) {
            articleImgRef.current.src = articleData.img;
            articleTitleH2Ref.current.innerHTML = articleData.title;
            articleTypePRef.current.innerHTML = articleData.type;
            sectionArticleInfoRef.current.innerHTML = '';
          }

          const articleUl = document.createElement('ul');
          articleUl.classList.add(`${articleData.title}`);

      
          createLiOfArticle('Title', articleData.title, articleUl);
        createLiOfArticle('Categoría', articleData.category, articleUl);
        createLiOfArticle('Contenido', articleData.content, articleUl);

          // Actualizar referencias
          sectionArticleInfoRef.current.appendChild(articleUl);

          // Añadir el evento del botón de edición
          editArticleBtnRef.current.addEventListener('click', () => {
            window.location.href = `/edit-article?articleId=${articleIdTest}`;
          });
        } else {
          // Manejo de errores
          sectionArticleInfoRef.current.innerHTML = `
              <div class="errorMsgPetProfile">
                  <p>Hubo un error en el servidor, por favor intenta más tarde.</p>

                  <a href="/" class="btn">Regresar al Home</a>
              </div>`;
        }
      } catch (error) {
        // Manejo de errores
      }
    };

    getArticleInfo();
  }, []);

  return (
    <main className="mainPetProfile">
      <h1>Blog</h1>

      <div className="petNameCard">
        <img ref={articleImgRef} alt="Avatar de la mascota" />
        <div>
          <h2 ref={articleTitleH2Ref}>Cargando...</h2>
          <p ref={articleTypePRef}>...</p>
        </div>
        <i ref={editArticleBtnRef} className="bi bi-pencil"></i>
      </div>
      <section ref={sectionArticleInfoRef}></section>
    </main>
  );
};

export default ArticleInfo;
