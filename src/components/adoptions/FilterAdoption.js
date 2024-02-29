
// import React, {useState} from "react";
// export const FilterAdoption = ({adoptions, setFilteredAdoptions}) =>{
//     const [type, setType] = useState('');
//     const [gender, setGender] = useState('');
//     const [color, setColor] = useState('');
//     const [size, setSize] = useState('');
//     const filterAdoptions = () => {
//         const filteredAdoptions = adoptions.filter((adoption) => {
//           const typeMatch = type ? adoption.adoptionType === type : true;
//           const genderMatch = gender ? adoption.sex === gender : true;
//           const colorMatch = color ? adoption.color1 === color : true;
//           const sizeMatch = size ? adoption.size === size : true;

//           return typeMatch && genderMatch && colorMatch && sizeMatch;
//         });
//         setFilteredAdoptions(filteredAdoptions);
//       };
//       const clearFilters = () => {
//         // Reiniciar los estados de los filtros
//         setType('');
//         setGender('');
//         setColor('');
//         setSize('');
      
//         // Actualizar las alertas filtradas con todas las alertas
//         setFilteredAdoptions(adoptions);
//       };
      

// return(
//     <>
//     <div className="filters">
//       <div className="filter-option">
//         <label htmlFor="type">Tipo</label>
//         <select
//           id="type"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//         >
//           <option value="" hidden></option>
//           <option value="perdido">Perdido</option>
//           <option value="encontrado">Encontrado</option>
//         </select>
//       </div>
//       <div className="filter-option">
//         <label htmlFor="gender">Género</label>
//         <select
//           id="gender"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//         >
//           <option value="" hidden></option>
//           <option value="macho">Macho</option>
//           <option value="hembra">Hembra</option>
//         </select>
//       </div>
//       <div className="filter-option">
//         <label htmlFor="color">Color</label>
//         <select
//           id="color"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//         >
//           <option value="" hidden></option>
//           <option value="blanco">Blanco</option>
//           <option value="negro">Negro</option>
//           <option value="marrón">Marrón</option>
//           <option value="gris">Gris</option>
//           <option value="cafe">Cafe</option>
//         </select>
//       </div>
//       <div className="filter-option">
//         <label htmlFor="size">Tamaño</label>
//         <select
//           id="size"
//           value={size}
//           onChange={(e) => setSize(e.target.value)}
//         >
//            <option value="" hidden></option>
//           <option value="pequeño">Pequeño</option>
//           <option value="mediano">Mediano</option>
//           <option value="grande">Grande</option>
//         </select>
//       </div>
//       <button className="cleanFilters" onClick={clearFilters}>Limpiar filtros</button>
//       <button onClick={filterAdoptions}>Aplicar filtros</button>
//     </div>
//     </>
// )
// }