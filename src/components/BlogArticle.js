import React, { useEffect, useState, useRef } from 'react';
import  Blog  from './Blog';

export const ArticleInfo = ({articles = [], onArticlesDelete}) => {

    const handleDeleteClick = async (id) => {
        try {
        
        const response = await fetch(`https://sniffnear-api.onrender.com/api/blog/${id}`, {
            method: 'DELETE',
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        onArticlesDelete(id);
        console.log(`El artículo con el id ${id} se ha eliminado correctamente.`);
        } catch (error) {
        console.error('Error al eliminar el artículo:', error);
        }
    };
  
  const handleEditClick = (articleToEdit) => {
    console.log('Editar artículo:', articleToEdit);
  };
    return (
        <div className="listAlertas">
        <h1>Artículos de blog</h1>

        <ul>
            {articles && articles.map((article) => (
                <Blog
                    article={article}
                    key={article._id}
                    onDeleteClick={handleDeleteClick}
                    onEditClick={handleEditClick}
                />
            ))}
        </ul>
    </div>
    )
}

export default ArticleInfo;