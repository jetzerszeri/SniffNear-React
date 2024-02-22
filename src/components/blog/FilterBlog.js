import React, {useState} from "react";

export const FilterBlog = ({blogs, setFilteredBlogs}) =>{
    const [category, setCategory] = useState('');
 
    const filterBlogs = () => {
        const filteredBlogs = blogs.filter((blog) => {
          const categoryMatch = category ? blog.category === category : true;
          return categoryMatch ;
        });
        setFilteredBlogs(filteredBlogs);
      };
      const clearFilters = () => {
        // Reiniciar los estados de los filtros
        setCategory('');
        setFilteredBlogs(blogs);
      };
      

return(
    <>
    <div className="filters">
      <div className="filter-option">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" hidden></option>
          <option value="nutricion">Nutrición</option>
          <option value="salud">Salud</option>
          <option value="alimentacion">Alimentación</option>
        </select>
      </div>

      <button className="cleanFilters" onClick={clearFilters}>Limpiar filtros</button>
      <button onClick={filterBlogs}>Aplicar filtros</button>
    </div>
    </>
)
}
export default FilterBlog;