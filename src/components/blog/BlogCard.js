import React, { useEffect, useState } from "react";
import { BlogList } from "./BlogList";
import { BottomNav } from "../BottomNav";
import { getCurrentUserId, createLoader, removeLoader } from "../../js/functions";
import { Link } from "react-router-dom";
import { FilterBlog } from "./FilterBlog";

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        createLoader('Cargando artículos');
        const response = await fetch(`https://sniffnear-api.onrender.com/api/blog/`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
          removeLoader();
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getBlogs();
  }, []);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  const handleBlogDelete = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog._id !== id);
    setBlogs(updatedBlogs);
  };

  return (
    <>
  
      <div className='topNavBarAlerts'>
        <h1 style={{ color: 'black', fontWeight: '700' }}>Listado de artículos</h1>
      </div>
      <div className="topNavBarFilters">
        <i className="bi bi-filter" onClick={() => setShowFilters(!showFilters)} />
      </div>
      {showFilters && <FilterBlog blogs={blogs} setFilteredBlogs={setFilteredBlogs} />}

      <main className="mapMain">
        <BlogList alerts={filteredBlogs} onBlogDelete={handleBlogDelete} userId={getCurrentUserId()} />
      </main>

      <BottomNav activeLink="article" />
    </>
  );
};

export default Blogs;
