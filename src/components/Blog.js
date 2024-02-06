import React, { useState } from "react";
import BlogForm from "./BlogForm";

const Blog = () => {
  const [mostrarBlogForm, setMostrarBlogForm] = useState(false);

  const handleMostrarBlogForm = () => {
    setMostrarBlogForm(!mostrarBlogForm);
  };

  return (
    <div>
      <div className="container">
        <h1>Blog de Mascotas</h1>
        <p>
          En este blog podrás crear y leer anécdotas, consejos y experiencias
          que pueden ayudar a personas como vos. ¡Animate y sumate!
        </p>
        <button onClick={handleMostrarBlogForm}>Crear Artículo</button>
        {mostrarBlogForm && <BlogForm />}
        <p>Acá estarían los artículos</p>
        {/* <Articulos/> */}
      </div>
    </div>
  );
};

export default Blog;
