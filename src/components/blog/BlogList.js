import React, { useState,useEffect} from 'react';
import { BlogCard } from './BlogCard';
import { Link } from 'react-router-dom';

export const BlogList = ({blogs, onBlogDelete, userId}) => {
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
                {blogs.map((blog) => {
                const isOwner = blog.creator._id === userId;
                    return <BlogCard 
                    blog={blog} 
                    key={blog._id}
                    onDeleteClick={handleDeleteClick} 
                    onEditClick={handleEditClick}
                    showButtons={isOwner}
                    />
                })}
            </ul>
        </div>

    )
}
