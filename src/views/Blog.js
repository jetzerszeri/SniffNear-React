import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar"
import { BlogList } from "../components/blog/BlogList"
import { BottomNav } from "../components/BottomNav";
import {getCurrentUserId, createLoader, removeLoader} from '../js/functions';
import { Link } from "react-router-dom";
// import { FilterAlert } from "../components/alerts/FilterAlert";

export const Blogs = () => {
   const [blogs, setBlogs] = useState([]);
  
      useEffect(() => {
        const getBlogs = async () => {
            try {
                // createLoader('Cargando alertas');
                const response = await fetch(`https://sniffnear-api.onrender.com/api/blog/`);
                if (response.ok) {
                    const data = await response.json();
                    // const filteredAlerts = data.filter((alert) => alert.city === city && alert.country === country);
                    // setAlerts(filteredAlerts);
                    // console.log(filteredAlerts)
                    setBlogs(data);
                    // removeLoader();
                }
            } catch (error) {
                console.error('Error fetching data', error)
            }
        }
    getBlogs();
});

    // const [filteredAlerts , setFilteredAlerts] = useState(alerts);
    // const [showFilters, setShowFilters] = useState(false);
    

//     useEffect(() => {

//         setFilteredAlerts(alerts);
//     }, [alerts]); 
//   useEffect(() => {
//     setFilteredAlerts(alerts);
//   }, [alerts]);



    const handleAlertDelete = (id) => {
        const updatedBlogs = blogs.filter(blog => blog._id !== id);
        setBlogs(updatedBlogs);
      };

    return (
        <>
            <Navbar />
            <div className='topNavBarAlerts'>
                 <h1 style={{color:'black', fontWeight:'700'}}>Listado de alertas</h1>
                <Link to={"/mapa-list"}>
                <i className="bi bi-map-fill"></i>
                </Link>
             </div>
             {/* <div className="topNavBarFilters">
             <i class="bi bi-filter" onClick={()=>setShowFilters(!showFilters)}/>
             </div> */}
             {/* {showFilters && (
                 <FilterAlert alerts={alerts} setFilteredAlerts={setFilteredAlerts}/>
             )} */}

            <main className="mapMain">
                <BlogList
                 blogs={blogs}
                 onAlertDelete={handleAlertDelete} 
                 userId={getCurrentUserId()}
                 />
            </main>

            <BottomNav activeLink="alerts"/>

        </>

    )
}
