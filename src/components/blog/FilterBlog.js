import React, { useState, useEffect } from "react";

export const FilterBlog = ({ blogs, setFilteredBlogs }) => {
  const [category, setCategory] = useState('');

  useEffect(() => {
    const availableCategories = blogs.map(blog => blog.category);
    console.log("Available Categories:", availableCategories);
  }, [blogs]);

  const filterBlogs = () => {
    console.log("Current Category:", category);

    const filteredBlogs = blogs.filter((blog) => {
      const categoryMatch = category ? blog.category === category : true;

      return categoryMatch;
    });

    console.log("Filtered Blogs:", filteredBlogs);

    setFilteredBlogs(filteredBlogs);
  };

  const clearFilters = () => {
    setCategory('');
    setFilteredBlogs(blogs);
  };

  return (
    <>
      <div className="filters">
        <div className="filter-option">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              console.log("Selected Category:", e.target.value);
            }}
          >
            <option value="" hidden></option>
            <option value="Nutricion">Nutrición</option>
            <option value="Salud">Salud</option>
            <option value="Diversion">Diversión</option>
          </select>
        </div>

        <button className="cleanFilters" onClick={clearFilters}>Limpiar filtros</button>
        <button onClick={filterBlogs}>Aplicar filtros</button>
      </div>
    </>
  );
};

export default FilterBlog;
