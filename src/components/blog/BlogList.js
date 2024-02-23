import React, { useState, useEffect } from 'react';
import { Blogs } from './BlogCard';
import { Link } from 'react-router-dom';

export const BlogList = ({ blogs, onBlogDelete, userId }) => {
  console.log('Blogs:', blogs);
  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`https://sniffnear-api.onrender.com/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      onBlogDelete(id);
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
      <ul>
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blogs
              blog={blog}
              key={blog && blog._id}
              onDeleteClick={handleDeleteClick}
              onEditClick={handleEditClick}
              showButtons={userId && blog.creator && blog.creator._id === userId}
            />
          ))
        ) : (
          <p>No hay blogs disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default BlogList;
