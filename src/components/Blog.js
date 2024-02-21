import React, { useState } from "react";
import BlogForm from "./BlogForm";
import BlogInfo from "./BlogArticle";

const Blog = () => {
  const [mostrarBlogForm, setMostrarBlogForm] = useState(false);

  const handleMostrarBlogForm = () => {
    setMostrarBlogForm(!mostrarBlogForm);
  };

  return (
    <div>
      <div className="container">
        <h1 style={{ marginTop: "50px", textAlign: "center" }}>Blog de Mascotas</h1>
        <p style={{ marginTop: "50px", textAlign: "center" }}> En este blog podrás crear y leer anécdotas, consejos y experiencias que pueden ayudar a personas como vos. ¡Animate y sumate!</p>
        <button className="buttonBlog" onClick={handleMostrarBlogForm}>Crear Artículo</button>
        {mostrarBlogForm && <BlogForm />}
        <BlogInfo/>
      </div>
    </div>
  );
};

export default Blog;
