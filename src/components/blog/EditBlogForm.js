import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  getCurrentUserId,
  createLoader,
  removeLoader,
} from "../../js/functions";
import { ImgInput } from "../addPet/ImgInput";
import { Navigate } from "react-router";
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const EditBlog = () => {
  const location = useLocation();
  const blogId = new URLSearchParams(location.search).get("blogId");
  const [blog, setBlog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [img, setImg] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    img: img,
    title: "",
    category: "",
    content: "",
    owner: getCurrentUserId(),
  });

  useEffect(() => {
    const getBlogInfo = async () => {
      try {
        createLoader();
        const response = await fetch(
          `https://sniffnear-api.onrender.com/api/blog/${blogId}`
        );
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
          setFormData((formData) => ({
            ...formData,
            title: data.title,
            category: data.category,
            content: data.content,
            img: data.img,
            creator: getCurrentUserId(),
          }));
        }
        removeLoader();
      } catch (error) {}
    };
    getBlogInfo();
  }, [blogId]);
  const [errors, setErrors] = useState({});

  const handleTitle = (value) => {
    setSelectedTitle(value);
    setFormData((prevState) => ({
      ...prevState,
      title: value,
    }));
  };
  const handleChangeCategory = (value) => {
    setSelectedCategory(value);
    setFormData((prevState) => ({
      ...prevState,
      category: value,
    }));
  };
  const handleSelectContent = (value) => {
    setSelectedContent(value);
    setFormData((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  const handleImgLink = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      img: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://sniffnear-api.onrender.com/api/blog/${blogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);
      const json = await response.json();
      if (response.ok) {
        navigate("/blog-list");
      } else {
        console.error("Error en el registro:", json.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main>
        <h1 className="alertEdit">Editar Artículo</h1>
        <form className="addNewPetForm editAlert">
          <div className="step2">

            <label htmlFor="title">Titulo</label>
            <input
              type="text"
              name="title"
              placeholder="Ingresa el titulo de tu artículo"
              value={formData.title}
              onChange={handleTitle}
            />

            <div>
              <label htmlFor="category">Categoría</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChangeCategory}
              >
                <option value="" disabled defaultValue>
                  Selecciona una categoría
                </option>
                <option value="Salud">Salud</option>
                <option value="Nutrición">Nutrición</option>
                <option value="Diversión">Diversión</option>
              </select>
            </div>

            <div className="editDescription">
              <label htmlFor="content">Contenido</label>
              <textarea
                name="content"
                placeholder="Ingresa el contenido de tu artículo"
                value={formData.content}
                onChange={handleSelectContent}
                rows="4"
              />
            </div>
            <div>
            <h2>Imagen de referencia a tu artículo</h2>
                    <ImgInput src={formData.img} setSelectedImg={handleImgLink} /> 
          </div>
          </div>
         

          <button onClick={handleSubmit}>Editar Artículo</button>
        </form>
      </main>
    </>
  );
};
