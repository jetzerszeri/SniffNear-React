import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export const BlogCard = ({blog,   onDeleteClick , onEditClick , showButtons}) => {
  const navigate = useNavigate();
 
  const [showModal, setShowModal] = useState(false)
 
  const handleDeleteConfirm =()=>{
    onDeleteClick(blog._id);
    setShowModal(false)
  }
  const handleCancel = () => {
    setShowModal(false);
    navigate('/blog');
  };

  return (
    <> 
    {showModal && (
      <div className="myModal">
          <div className="headerModal">
            <h1>¿Estás seguro que deseas eliminar este artículo?</h1>
            <i className="bi bi-x" onClick={handleCancel}></i>
          </div>
          <div className="bodyModal">
          <button onClick={handleCancel}>
          Cancelar
          </button>
          <button onClick={handleDeleteConfirm} className="buttonDelete">
          Sí, ELIMINAR
          </button>
          </div>
      </div>
    )}
       <li>
       <img src={blog.img} alt={blog.type}/>
        <p>{blog.title}</p>
        <p>{blog.content}</p>
        <p>{blog.category}</p>
        
        {showButtons && (
         <div className="buttonsAlert">
         <button className="buttonDelete" onClick={() => setShowModal(true)}>
           <i className="bi bi-trash"/>
         </button>
       
         <Link to={`/edit-blog?blogId=${blog._id}`}>
         <button className="btn">
           <i className="bi bi-pencil"/>
         </button>
         </Link>
       </div>
        )}
  
    </li>
    </>

    
  )
}
