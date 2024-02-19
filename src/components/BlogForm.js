import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImgInput } from '../components/addPet/ImgInput';
import { getCurrentUserId, createLoader, removeLoader } from '../js/functions';

export const BlogForm = () => {
  let { blogId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [img, setImg] = useState('');

  const [formData, setFormData] = useState({
    type: '',
    img: img,
    title: '',
    category: '',
    content: '',
    owner: getCurrentUserId(),
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeCategory = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleImgLink = (link) => {
    setImg(link);
    setFormData({
      ...formData,
      img: link,
    });
  };

  const getBlogInfo = useCallback(async () => {
    if (blogId) {
      createLoader();
      const response = await fetch(`https://sniffnear-api.onrender.com/api/blog/${blogId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setFormData({
          ...formData,
          title: data.title,
          category: data.category,
          content: data.content,
        });
        setSelectedCategory(data.category);
      }
    }
  }, [blogId, formData]);

  useEffect(() => {
    getBlogInfo();
  }, [getBlogInfo]);

  const navigate = useNavigate();
  const location = useLocation();
  const route = new URLSearchParams(location.search).get("route");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    console.log(formData);
  
    if (!formData.type.trim()) {
      newErrors.type = 'El tipo es requerido';
    }
  
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    if (!selectedCategory) {
      newErrors.category = "Debes elegir una categoría";
    }
    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    }
    if (!formData.img.trim()) {
      newErrors.img = 'La imagen es requerida';
    }
  
    if (Object.keys(newErrors).length === 0) {
      try {
        createLoader();
        const apiUrl = blogId ? `https://sniffnear-api.onrender.com/api/blog/${blogId}` : 'https://sniffnear-api.onrender.com/api/blog/';
  
        const method = blogId ? 'PUT' : 'POST';
  
        const response = await fetch(apiUrl, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const json = await response.json();
        console.log(json);
        console.log(formData);
  
        if (response.ok) {
          setFormData({
            type: '',
            img: '',
            title: '',
            category: '',
            content: '',
            owner: getCurrentUserId(),
          });
  
          navigate(route);
        } else {
          removeLoader();
          console.error('Error en el registro:', json.message);
        }
      } catch (error) {
        removeLoader();
        console.error('Error en la solicitud:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };
  

  return (
    <main>
     <form action="" onSubmit={handleSubmit} className="addNewPetForm">
       <div className="step2"> 
       <h1>Agregar un artículo</h1>
          <div>
            <label htmlFor="title">Titulo</label>
            <input
              type="text"
              name="title"
              placeholder="Ingresa el titulo de tu artículo"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}

          <div>
            <div>
              <label htmlFor="content">Contenido</label>
            </div>
            <textarea
              type="text"
              name="content"
              placeholder="Ingresa el contenido de tu artículo"
              rows="10"
              value={formData.content}
              onChange={handleChange}
            />
          </div>
          {errors.content && <p style={{ color: 'red' }}>{errors.content}</p>}
          <div>
            <label htmlFor="category">Categoría</label>
            <select
              name="category"
              value={selectedCategory}
              onChange={handleChangeCategory}
            >
              <option value="" disabled defaultValue>Selecciona una categoría</option>
              <option value="1">Salud</option>
              <option value="2">Nutrición</option>
              <option value="3">Diversión</option>
            </select>
          </div>
          {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
        </div>

        <div>
          <h2>Imagen de referencia a tu artículo</h2>
          <ImgInput setImgLink={handleImgLink} />
          {errors.img && <p style={{ color: 'red' }}>{errors.img}</p>}
        </div>

        <button>Guardar</button>
      </form>
    </main>
  );
};

export default BlogForm;
