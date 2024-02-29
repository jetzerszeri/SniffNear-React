import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { BlogList } from "../components/blog/BlogList";
import { BottomNav } from "../components/BottomNav";
import { getCurrentUserId, createLoader, removeLoader } from '../js/functions';
import { FilterBlog } from "../components/blog/FilterBlog";

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        createLoader('Cargando blogs');
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
  }, []); // <- Agregamos un arreglo vacío para ejecutar el efecto solo en el montaje del componente

  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  const handleBlogDelete = (id) => {
    const updatedBlogs = blogs.filter(blog => blog._id !== id);
    setBlogs(updatedBlogs);
  };

  return (
    <>
      <Navbar />
      <div className="topNavBarFilters">
      <div className='topNavBar'>
                <h1>Listado de artículos</h1>
            </div>
        <i className="bi bi-filter" onClick={() => setShowFilters(!showFilters)} />
      </div>
      {showFilters && (
        <FilterBlog blogs={blogs} setFilteredBlogs={setFilteredBlogs} />
      )}

      <main className="mapMain">
        <BlogList
          blogs={filteredBlogs}
          onAlertDelete={handleBlogDelete}
          userId={getCurrentUserId()}
        />
      </main>

      <BottomNav activeLink="blogs" />
    </>
  );
};
