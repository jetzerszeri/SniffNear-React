import React, { useEffect, useState, useRef } from 'react';
import  Blog  from './Blog';

export const BlogInfo = ({blogs = [], onBlogsDelete}) => {

    const handleDeleteClick = async (id) => {
        try {
        
        const response = await fetch(`https://sniffnear-api.onrender.com/api/blog/${id}`, {
            method: 'DELETE',
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        onBlogsDelete(id);
        console.log(`El artículo con el id ${id} se ha eliminado correctamente.`);
        } catch (error) {
        console.error('Error al eliminar el artículo:', error);
        }
    };
  
  const handleEditClick = (blogToEdit) => {
    console.log('Editar artículo:', blogToEdit);
  };
    return (
        <div className="listAlertas">
        <h1>Artículos del blog</h1>

        <ul>
            {blogs && blogs.map((blog) => (
                <Blog
                    blog={blog}
                    key={blog._id}
                    onDeleteClick={handleDeleteClick}
                    onEditClick={handleEditClick}
                />
            ))}
        </ul>
    </div>
    )
}

export default BlogInfo;