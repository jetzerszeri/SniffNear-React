import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImgInput } from '../addPet/ImgInput';
import { getCurrentUserId, createLoader, removeLoader } from '../../js/functions';

export const BlogForm = () => {
  let { blogId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [img, setImg] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

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

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title) {
        newErrors.title = 'El título es requerido';
    }

    if (!formData.content) {
        newErrors.content = 'El contenido es requerido';
    }

    if (!formData.category) {
        newErrors.category = 'Debe ingresar una categoría';
    }
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        setCurrentStep(currentStep + 1);
    }
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

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        createLoader();
  
        const response = await fetch('https://sniffnear-api.onrender.com/api/blog/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            const json = await response.json();

        if (response.ok) {

          console.log('articulo publicado')
          navigate('/')
     
        } else {
          removeLoader();
          console.error('Error en el registro:', json.message);
        }
      } catch (error) {
        removeLoader();
        console.error('Error en la solicitud:', error);
      }
   
  };
  
  const handleNextAndSubmit = async (e) => {
    e.preventDefault();

    // Validación lógica
    const newErrors = {};

    if (!formData.title) {
        newErrors.title = 'El título es requerido';
    }

    if (!formData.content) {
        newErrors.content = 'El contenido es requerido';
    }

    if (!formData.category) {
        newErrors.category = 'Debe ingresar una categoría';
    }

    setErrors(newErrors);

    // Verificar si no hay errores de validación
    if (Object.keys(newErrors).length === 0) {
        // Si la validación es exitosa, proceder a enviar el formulario
        await handleSubmit(e);
        // Opcionalmente, puedes agregar lógica adicional después del envío
        // Por ejemplo, navegar o realizar cualquier otra acción
        navigate('/');
    }
  };

  return (
    <main>
        <h1 style={{ textAlign: 'center' }} >Agregar un artículo</h1>
     <form action="" className="addNewPetForm">
       <div className="step2"> 
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

        <button onClick={handleNextAndSubmit}>Guardar</button>
      </form>
    </main>
  );
};

export default BlogForm;
