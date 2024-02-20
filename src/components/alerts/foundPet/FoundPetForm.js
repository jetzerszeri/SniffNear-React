import React, { useState, useEffect} from "react";
import { Navbar } from "../../Navbar"
import { ImgInput } from "../../addPet/ImgInput";
import { getCurrentUserId } from "../../../js/functions";
import { useNavigate } from "react-router";
import Mapa from "../map/MapLost";
import { useLocation } from "react-router";
import { 
    setDefaults,
    geocode,
    RequestType,
  } from "react-geocode";
const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
export const FoundPetForm = () =>{
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedType, setSelectedType] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [user, setUser] = useState(null);
    const [img, setImg] = useState('');  
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const current_route = location.pathname;
    //geolocalizacion
    const [lat,setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY_GEOCODING;
    //obtengo coordenadas
    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLat(position.coords.latitude);
              setLng(position.coords.longitude);
              setStatus(null);
            },
            () => {
              setStatus('No se pudo obtener tu ubicación');
            }
          );
        } else {
          setStatus('La geolocalización no es compatible con tu navegador');
        }
      }, []);
    
      setDefaults({
        key: apiKey,
        language:"es",
        region: "es"
      })

    const [formData,setFormData] = useState({
        type:'',
        size:'',
        color1:'', 
        color2:'',
        breed:'',
        sex:'',
        description:'' ,
        latitude: '',
        longitude: '',
        date: getCurrentDate(),
        time: '',
        img: img,
        personName: '',  
        alertType:'encontrado', 
        email: '',
        password:'',
        creator:'',
        state:'',
        city:'',
        country:'',
    })
          useEffect(()=>{
          //obtengo la direccion desde las lat y lng
      geocode(RequestType.LATLNG,`${lat}, ${lng}`,{
        location_type: "ROOFTOP", // Override location type filter for this request.
      enable_address_descriptor: true, // Include address descriptor in response.
    })
      .then(({ results }) => {
        const address = results[0].formatted_address;
        const { city, state, country } = results[0].address_components.reduce(
          (acc, component) => {
            if (component.types.includes("locality"))
              acc.city = component.long_name;
            else if (component.types.includes("administrative_area_level_1"))
              acc.state = component.long_name;
            else if (component.types.includes("country"))
              acc.country = component.long_name;
            return acc;
          },
          {}
        );
        setCity(city);
        setCountry(country);
        setState(state);
        // console.log(city, state, country);
        // console.log(address);
        setFormData((prevFormData) => ({
            ...prevFormData,
            state: state,
            city: city,
            country: country,
          }));
      })
      .catch(console.error);
      },[lat,lng])
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handlePrev = (e) => {
        e.preventDefault();
        setCurrentStep(currentStep - 1);
      };
    const handleNext = (e) => {
        e.preventDefault();
        const newErrors={};
        if(currentStep === 1){
            if (!formData.date) {
                newErrors.date = 'La fecha es requerida';
            }
             if (!formData.time) {
                newErrors.time = 'La hora es requerida';
            }
        }
        if(currentStep === 2){
            if (!formData.type) {
                newErrors.type = 'El tipo de mascota es requerido';
            }
        }
        if(currentStep === 3){
            if (!formData.size) {
                newErrors.size = 'El tamaño de la mascota es requerido';
            }
        }
         if(currentStep === 4){
            if (!formData.color1) {
                newErrors.color1 = 'El color de la mascota es requerido';
            }
        }
        if(currentStep === 5){
            if (!formData.description) {
              newErrors.description= 'Porfavor, ingrese una breve descripción de la mascota';
            }
        }
         if(currentStep === 7){
            if (!formData.img) {
              newErrors.img= 'Una imagen de la mascota puede ayudar a su rapida localización';
            }
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setCurrentStep(currentStep + 1);
        }
    };
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };    
    const handleSelectType = (value) => {
        setSelectedType(value);
        setFormData({
          ...formData,
          type: value,
        });
    };
    const handleNewCoords = (lat , lng) =>{
        setFormData(prevData => ({
          ...prevData,
          latitude: lat,
          longitude: lng,
        }));
      }

    const handleSelectSize = (value) => {
        setSelectedSize(value)
        setFormData({
          ...formData,
          size: value,
        });
    };
    const handleSeleccionColor = (color) => {
        setFormData({
          ...formData,
          color1: color,
        });
        setSelectedColor(color);
    };
    const handleDescriptionChange = (e) => {
        setFormData({
          ...formData,
          description: e.target.value
        });
      };
    const handleChangeBreed = (e)=>{
        setFormData({
            ...formData,
            breed_id : e.target.value,
        })
    }
    const handleDateChange = (e) => {
        setFormData({
          ...formData,
          date: e.target.value,
        });
    }; 
    const handleTimeChange = (e) => {
        setFormData({
          ...formData,
          time: e.target.value,
        });
      };
    
    const handleImgLink = (link) => {
        setImg(link)
        setFormData({
            ...formData,
            img: link,
        });
    }
    const handleSelectGender = (value) => {
        setSelectedGender(value)
        setFormData({
            ...formData,
            sex: value,
        });
    };
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch(
              `https://sniffnear-api.onrender.com/api/users/${getCurrentUserId()}`
            );
            if (response.ok) {
              const { user } = await response.json();
              setUser(user);
              setFormData((prevData)=>({
                ...prevData,
                personName: user.name,
                email: user.email,
                creator: user._id
              }));
              setIsAuthenticated(true);
            } else {
              throw new Error("Failed to fetch user data");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUser();
      }, []);
    useEffect(()=>{
        if (!user) {
            setIsAuthenticated(false);
            setFormData({
                personName: "",
                email: "",
                password: "",
            });
        }
    }, [user]);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            if (!isAuthenticated) {
                const newUserResponse = await fetch('https://sniffnear-api.onrender.com/api/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.personName,
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                if (!newUserResponse.ok) {
                    throw new Error('Failed to create new user');
                }
            }
            const dataToSend = {
                ...formData,
                alertType: "encontrado",
            };
            console.log(dataToSend)
            const response = await fetch('https://sniffnear-api.onrender.com/api/alerts/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToSend),
            });
      
            const json = await response.json();
            console.log(json);
      
            if (response.ok) {
              console.log('se registro la alerta');
                navigate('/success')
            } else {
                console.error('Error en el registro:', json.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
};
    return(
        <>
        <Navbar/>
        <main>
        <div className="stepsForm">
            {[...Array(8).keys()].map((step, index) => (
                <svg
                    key={index}
                    width="22"
                    height="11"
                    viewBox="0 0 22 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={currentStep === index + 1 ? "active" : ""}
                >
                    <path
                        d="M20.507 2.98467C20.3017 1.83214 19.3556 0.919716 18.2168 0.764651C16.9418 0.591857 15.8265 1.33706 15.4109 2.43495C15.2426 2.87423 14.8358 3.1687 14.3709 3.17142L7.28646 3.1951C6.82028 3.19467 6.40041 2.90385 6.21759 2.46487C5.759 1.36806 4.61585 0.63149 3.34555 0.812639C2.21099 0.975052 1.30054 1.89708 1.13983 3.04865C1.0086 3.98272 1.34989 4.84494 1.95038 5.42889C1.37311 6.01679 1.06891 6.87841 1.23071 7.81024C1.43681 8.97346 2.40034 9.89344 3.55314 10.0391C4.85888 10.1993 5.99255 9.4026 6.37022 8.24683C6.5168 7.7981 6.94708 7.50869 7.41634 7.50786L14.4068 7.48221C14.8761 7.48138 15.3144 7.76468 15.48 8.21433C15.9036 9.3658 17.0655 10.1571 18.365 9.98603C19.5121 9.83683 20.441 8.90725 20.604 7.74375C20.7322 6.81093 20.3922 5.95186 19.7947 5.36666C20.372 4.77876 20.6793 3.91588 20.5131 2.98216L20.507 2.98467Z"
                        stroke="#FF8367"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>
            ))}
        </div>
        <form className="addNewPetForm createAlert">
         {currentStep === 1 &&(
              <div className="step5">
                <h2>¿Dónde y cuándo encontraste la mascota?</h2>
                <p className="stepSubHeading">Arrastrá el marcador a la zona donde encontraste la mascota</p>
                <div className="mapaFound">
                    <Mapa onMarkerDragEnd={handleNewCoords} route={current_route}/>
                </div>
               
                <div className="containerDate">
                    <div className="inputDiv">
                        <label htmlFor="date">¿Cuándo?</label>
                        <input 
                        id="date"
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleDateChange}
                        max={getCurrentDate()}
                        />
                        
                    </div>
                    <div className="inputDiv">
                         {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                    </div>
                   
                    <div className="inputDiv">
                        <label htmlFor="time">¿A qué hora?</label>
                        <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleTimeChange}
                        >
                        <option value="DEFAULT" disabled>
                            Selecciona una hora
                        </option>
                        {[...Array(24).keys()].map((hour) => (
                            <option key={hour} value={`${hour}:00`}>
                            {`${hour}:00`}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="inputDiv">
                        {errors.time && <p style={{ color: 'red' }}>{errors.time}</p>}
                    </div>
                    
                </div>
            </div>
        )}
        { currentStep === 2 && (
           <div className="step1">
                <h2>¿Qué tipo de mascota encontraste?</h2>
                <div className="containerFormStepsSelectors">
                    <ul className="petsIconList">
                        <li data-value="perro" onClick={() => handleSelectType('perro')} className={selectedType === 'perro' ? 'selected' : ''}>
                            <div>
                                <svg width="55" height="47" viewBox="0 0 55 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M46.2067 27.8397C52.3567 27.8397 55.4167 23.1797 52.7467 17.3197C49.9867 11.2697 45.8567 6.16965 40.3767 2.29965C39.8567 1.92965 39.2567 1.66965 38.6267 1.43965C37.2967 0.949653 35.7967 1.21965 34.7067 2.13965L34.1967 2.56965C33.9367 2.78965 33.5767 2.81965 33.2767 2.65965C29.3367 0.589653 25.3667 0.269653 21.4367 2.76965C21.1267 2.95965 20.7367 2.94965 20.4567 2.71965L19.4967 1.90965C18.6267 1.17965 17.4367 0.929653 16.3567 1.27965C14.2167 1.97965 12.5167 3.46965 10.8867 4.93965C7.18674 8.26965 4.18674 12.2697 2.22674 16.8097C-0.183263 22.3697 0.966737 25.7397 5.59674 27.5597C6.38674 27.8697 7.34674 27.7697 8.22674 27.8597" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M14.2967 10.4297C10.8267 15.6197 9.28673 21.6297 8.71673 27.5997C8.32673 31.6397 9.05673 36.1597 11.9367 39.7097C14.9167 43.3897 19.0167 44.9597 23.5367 45.4897C27.7367 45.9797 31.8067 45.4897 35.9667 44.3097C42.3167 42.4997 45.3267 36.7497 45.6867 31.2697C46.1567 23.9797 44.3667 17.2297 40.6867 10.9597" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M39.6467 31.7697C39.6467 35.1997 36.8667 37.9797 33.4367 37.9797C30.0067 37.9797 27.2267 35.1997 27.2267 31.7697" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M14.7867 31.7697C14.7867 35.1997 17.5667 37.9797 20.9967 37.9797C24.4267 37.9797 27.2067 35.1997 27.2067 31.7697" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M31.7667 37.7497C31.6867 40.1897 29.6767 42.1397 27.2167 42.1397C24.7567 42.1397 22.7567 40.1897 22.6667 37.7497" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M25.7468 27.9197L26.2468 27.8197C26.8868 27.6897 27.5568 27.6897 28.1968 27.8197L28.6968 27.9197C29.3168 27.9197 29.7068 28.6197 29.4068 29.1897L27.2268 31.3997L25.0468 29.1897C24.7468 28.6197 25.1368 27.9197 25.7568 27.9197H25.7468Z" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M20.2867 21.0897C21.0599 21.0897 21.6867 20.4629 21.6867 19.6897C21.6867 18.9165 21.0599 18.2897 20.2867 18.2897C19.5135 18.2897 18.8867 18.9165 18.8867 19.6897C18.8867 20.4629 19.5135 21.0897 20.2867 21.0897Z" fill="#363A59"></path>
                                    <path d="M34.1567 21.0897C34.9299 21.0897 35.5567 20.4629 35.5567 19.6897C35.5567 18.9165 34.9299 18.2897 34.1567 18.2897C33.3835 18.2897 32.7567 18.9165 32.7567 19.6897C32.7567 20.4629 33.3835 21.0897 34.1567 21.0897Z" fill="#363A59"></path>
                                </svg>                            
                            </div>
                        </li>
                        <li data-value="gato" onClick={() => handleSelectType('gato')} className={selectedType === 'gato' ? 'selected' : ''}>
                            <div>
                                <svg width="56" height="44" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M54.2768 24.1397C50.7268 22.8497 47.2168 23.0797 43.7268 24.3997" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M34.7668 6.80981V11.4798" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M45.3169 1.97974C43.9069 3.90974 42.5069 5.84974 40.7869 8.20974" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M21.0466 6.61975V11.4798" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M11.0269 3.03979C12.6369 4.84979 14.2469 6.65979 15.8269 8.43979C24.2369 3.36979 33.8669 4.0098 40.5669 8.4198" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M54.2768 29.9397C50.8968 28.3697 47.4468 27.4497 43.7268 28.6197" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M11.5568 24.1397C8.00684 22.9997 4.48684 22.9897 1.00684 24.3997" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M6.01684 28.3597C4.34684 28.9797 2.67684 29.5897 1.00684 30.2097" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M27.9067 6.46973V11.4797" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M11.5566 28.3597H6.54663" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M11.0268 3.03975C6.51682 11.1297 4.63682 18.9997 6.33682 28.0897C7.59682 34.7897 12.2868 38.6897 18.4168 41.0097C24.3168 43.2397 30.4068 43.3497 36.3268 41.4897C45.8068 38.5197 50.6568 31.8597 50.3168 21.7697C50.1068 15.6397 48.9268 9.70975 46.3468 4.10975C46.1568 3.68975 45.6668 2.33975 45.3168 1.98975" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M18.5967 30.8098C18.5967 30.8098 23.9667 35.8298 28.1567 30.8098C28.1567 30.8098 33.0567 35.5898 36.9067 30.8098" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M15.2368 19.1797C15.2368 19.1797 18.3268 15.6897 20.9168 19.1797" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M34.5767 19.1797C34.5767 19.1797 37.6667 15.6897 40.2567 19.1797" stroke="#363A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M26.6068 23.8397H29.4368C30.0268 23.8397 30.4068 24.4797 30.1168 24.9997L28.0168 27.0197L25.9168 24.9997C25.6268 24.4797 26.0068 23.8397 26.5968 23.8397H26.6068Z" stroke="#363A59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>     
                            </div>
                        </li>
                        <p datavalue="otraMascota" onClick={() => handleSelectType('otraMascota')} className={selectedType === 'otraMascota' ? 'selected' : ''}>Otra mascota</p>
                    </ul>
                {errors.type && <p style={{ color: 'red' }}>{errors.type}</p>}
                </div>
        </div> 
        )}
        {currentStep === 3 &&(
               <div className="step2">
                <h2>¿Cuál es su tamaño?</h2>
                <p className="stepSubHeading">Pequeño, mediano o grande</p>
                <div className="containerFormStepsSelectors">
                    <input type="hidden" name="size" id="size"/>
                    <ul className="sizeSelector">
                        <li data-value="pequeño" onClick={() => handleSelectSize('pequeño')} className={selectedSize === 'pequeño' ? 'selected' : ''}>
                            <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.422 23.202C4.54024 22.3541 4.81182 21.7457 4.96516 21.408C5.33465 20.5911 5.76696 20.0431 6.03115 19.7122C6.67037 18.9109 7.29112 18.4042 7.68463 18.0871C8.21485 17.6597 8.70074 17.3426 9.07023 17.1203C9.96256 16.5671 10.7736 16.2397 11.3537 16.0432C12.0299 15.8158 13.3028 15.3867 14.7216 15.5159C15.2814 15.5676 15.8911 15.7055 15.8911 15.7055C16.4749 15.8382 16.9201 15.9984 17.1843 16.0949C17.4799 16.2018 17.7238 16.3035 17.8993 16.381C18.097 16.4689 18.339 16.5827 18.6106 16.724C18.8008 16.8222 19.1833 17.0255 19.6488 17.322C19.9684 17.5253 20.5171 17.8769 21.1508 18.4249C21.4538 18.6868 21.8233 19.0349 22.2113 19.4727C22.7027 20.019 23.0242 20.5274 23.2292 20.9099C23.2976 21.034 23.5119 21.4424 23.7114 22.006C23.813 22.2938 23.8832 22.5471 23.9331 22.747C24.0569 23.3381 24.1382 24.155 23.9553 25.0942C23.8943 25.4044 23.813 25.687 23.7225 25.9403C23.6264 26.1885 23.5304 26.4366 23.4343 26.6831C23.329 26.9226 23.1609 27.2483 22.893 27.5964C22.7193 27.8222 22.4755 28.141 22.069 28.4185C21.9194 28.5219 21.1859 29.0044 20.216 28.982C19.8927 28.9751 19.6895 28.9148 18.5958 28.4753C16.7834 27.7481 16.5451 27.5947 15.9206 27.4517C15.5105 27.3569 14.8639 27.2535 14.0159 27.3018C13.6519 27.3052 13.1254 27.3362 12.5084 27.4689C11.956 27.5878 11.5551 27.7412 11.1135 27.9101C10.066 28.3134 10.0789 28.446 9.33811 28.6856C8.70259 28.8907 8.17236 29.0785 7.52944 28.932C7.12115 28.839 6.75905 28.6753 6.43759 28.4667C6.07364 28.2289 5.7725 27.9049 5.51386 27.5534C5.24782 27.1949 5.05384 26.802 4.87094 26.4074C4.78226 26.2161 4.72314 26.0006 4.64555 25.8025C4.62338 25.7456 4.51253 25.3837 4.44417 25.0046C4.29638 24.1877 4.3869 23.4363 4.422 23.1951V23.202Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M15.1336 8.35035C15.0856 8.12287 15.0265 7.78166 14.9987 7.36116C14.9784 7.06475 14.984 6.84072 14.995 6.40472C15.0024 6.10486 15.0265 5.13635 15.0302 4.96574C15.0689 4.50044 15.1059 4.03514 15.1447 3.56984C15.1539 3.43542 15.2241 2.47725 15.5419 1.8534C15.5881 1.76379 15.7359 1.48633 15.9816 1.30539C16.0777 1.23301 16.1904 1.17269 16.3197 1.12271C16.5672 1.02793 16.7926 1.00897 17.0347 1.01587C17.3469 1.02448 17.6314 1.16235 17.8863 1.30194C18.6678 1.73105 19.2627 2.35489 19.8022 3.02182C19.9888 3.25275 20.3139 3.72149 20.6206 4.36602C20.8127 4.76928 20.9402 5.12945 21.0252 5.41553C21.1286 5.83257 21.2302 6.24962 21.3337 6.66666C21.4113 7.04407 21.4704 7.55245 21.4168 8.14873C21.378 8.58645 21.2857 8.96214 21.1896 9.26372C21.1434 9.45328 21.0603 9.71695 20.9106 10.0099C20.7887 10.246 20.4913 10.8027 19.8373 11.249C19.6359 11.3851 19.3163 11.5695 18.8729 11.6971C18.7343 11.735 18.5237 11.7781 18.2651 11.7694C17.8974 11.7557 17.6443 11.623 17.4078 11.542C16.8 11.3369 16.4231 10.9026 16.0481 10.4563C16.0019 10.4028 15.9003 10.2512 15.7839 10.0565C15.7839 10.0565 15.6491 9.83242 15.5382 9.59287C15.3017 9.08622 15.1761 8.54509 15.1336 8.35035Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M7.10078 6.58563C7.1599 6.19271 7.24119 5.87562 7.29846 5.67054L7.63285 4.72443C7.74739 4.44698 7.91551 4.09369 8.15383 3.7025C8.49377 3.14759 8.8374 2.7495 9.03692 2.53063C9.21798 2.33245 9.92925 1.57936 10.8142 1.17782C11.0322 1.07959 11.2945 0.984808 11.6197 1.00204C11.6954 1.00549 11.895 1.02272 12.1277 1.11923C12.2109 1.15369 12.4677 1.26916 12.682 1.52076C12.8852 1.75858 12.9517 1.99985 12.9924 2.15667C13.1254 2.66505 13.2676 3.23892 13.4099 3.87655C13.578 4.97948 13.639 6.3254 13.3803 7.82298C13.3194 8.17454 13.2455 8.51059 13.1605 8.8294C13.0977 9.07928 13.0034 9.36019 12.8612 9.65315C12.4086 10.5855 11.7028 11.1662 11.2483 11.4764C11.0581 11.5833 10.6553 11.7746 10.1232 11.7677C9.70201 11.7625 9.39903 11.635 9.14777 11.5281C8.5769 11.2869 8.20372 10.9405 7.99865 10.7078C7.73076 10.408 7.57003 10.1116 7.47212 9.88063C7.27629 9.44808 7.17468 9.07928 7.11925 8.82595C6.91049 7.87468 7.02318 7.09056 7.09893 6.58563H7.10078Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M1.00416 13.3618C0.998614 13.1481 0.998614 12.9413 1.00416 12.7431C1.02817 12.2244 1.08545 11.6522 1.19075 11.0387C1.2665 10.5993 1.35887 10.1874 1.45863 9.80827C1.51775 9.4929 1.65631 8.98107 2.02026 8.43822C2.42116 7.84023 2.91259 7.48177 3.20634 7.29738C3.33566 7.24051 3.46498 7.18191 3.59431 7.12504C3.65712 7.10264 3.75319 7.07679 3.87143 7.06817C3.94163 7.063 4.20397 7.05439 4.55129 7.24395C4.64551 7.29565 5.01686 7.51107 5.54708 8.30208C5.89995 8.82769 6.10132 9.27921 6.19554 9.49117C6.33595 9.80654 6.46342 10.1529 6.53178 10.3408C6.62046 10.5803 6.69066 10.7837 6.74054 10.9336C6.79042 11.1163 6.84031 11.3007 6.89019 11.4833C6.9567 11.7953 7.0232 12.1089 7.08971 12.4208C7.17654 12.8517 7.19871 13.2205 7.20056 13.4979C7.20056 13.7668 7.20056 14.2217 7.05276 14.7973C6.92344 15.2988 6.74239 15.6572 6.68881 15.7572C6.53363 16.0536 6.26759 16.4793 5.82235 16.9136C5.66901 17.0755 5.29028 17.4323 4.66584 17.6115C4.10236 17.7735 3.62387 17.7115 3.39847 17.6684C3.14168 17.5874 2.76664 17.434 2.40269 17.1341C2.22718 16.9894 2.09047 16.8429 1.98701 16.7119C1.84291 16.5189 1.69326 16.288 1.55655 16.0174C1.29975 15.509 1.17597 15.0386 1.11685 14.6767C1.05958 14.2734 1.01709 13.834 1.00416 13.3635V13.3618Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M21.306 14.363C21.1988 13.703 21.258 13.1843 21.3171 12.6845C21.354 12.3709 21.4224 11.9521 21.5536 11.4644C21.6515 11.137 21.7494 10.8095 21.8473 10.4838L22.2408 9.51876C22.4089 9.13273 22.5752 8.82081 22.7064 8.59333C23.0223 8.04359 23.2089 7.73167 23.5932 7.45593C23.9848 7.17503 24.2971 7.13712 24.3802 7.1285C24.5926 7.10782 24.7718 7.13884 24.8864 7.16641C25.3797 7.32841 25.6863 7.5714 25.8508 7.72305C26.1002 7.9557 26.2443 8.1918 26.381 8.41583C26.5454 8.68467 26.6526 8.92421 26.7209 9.10344C26.8041 9.2999 26.8872 9.52048 26.9592 9.76519C27.0442 10.0547 27.1015 10.3218 27.1366 10.5631C27.168 10.7079 27.1976 10.8543 27.2253 11.0043C27.362 11.7487 27.4248 12.4553 27.4359 13.1102C27.4451 13.4755 27.4304 13.9012 27.362 14.3734C27.3029 14.7784 27.2179 15.1403 27.1255 15.4539C27.0295 15.8106 26.8909 16.0898 26.7782 16.2811C26.6507 16.4982 26.3976 16.917 25.8896 17.2737C25.642 17.4478 25.4074 17.5546 25.2374 17.6219C25.0508 17.6667 24.7626 17.7149 24.4134 17.6908C23.4324 17.6236 22.7858 17.0428 22.5697 16.8481C22.1392 16.4603 21.9064 16.0398 21.7974 15.8382C21.7753 15.7968 21.67 15.6004 21.5646 15.3264C21.5111 15.1868 21.3817 14.8352 21.306 14.3665V14.363Z" stroke="#363A59" strokeMiterlimit="10"></path>
                            </svg>                                
                        </li>
                        <li data-value="mediano" onClick={() => handleSelectSize('mediano')} className={selectedSize === 'mediano' ? 'selected' : ''}>
                            <svg width="50" height="53" viewBox="0 0 50 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.27376 41.7037C7.49053 40.1492 7.98842 39.0339 8.26954 38.4147C8.94695 36.9171 9.73951 35.9124 10.2239 35.3058C11.3958 33.8367 12.5338 32.9078 13.2552 32.3265C14.2273 31.5429 15.1181 30.9616 15.7955 30.554C17.4314 29.5398 18.9183 28.9395 19.9819 28.5794C21.2215 28.1623 23.5552 27.3756 26.1564 27.6126C27.1827 27.7074 28.3004 27.9601 28.3004 27.9601C29.3707 28.2034 30.187 28.4972 30.6713 28.6741C31.2132 28.87 31.6603 29.0564 31.9821 29.1986C32.3445 29.3597 32.7882 29.5683 33.2861 29.8273C33.635 30.0074 34.3361 30.3802 35.1896 30.9237C35.7756 31.2965 36.7815 31.941 37.9433 32.9457C38.4987 33.4259 39.1761 34.0641 39.8874 34.8666C40.7884 35.8682 41.3777 36.8002 41.7537 37.5016C41.879 37.7291 42.2719 38.4779 42.6377 39.511C42.824 40.0386 42.9527 40.5031 43.0441 40.8696C43.271 41.9533 43.4201 43.4508 43.0848 45.1727C42.973 45.7414 42.824 46.2596 42.658 46.724C42.4819 47.179 42.3057 47.6339 42.1296 48.0857C41.9366 48.5249 41.6283 49.122 41.1372 49.7602C40.8188 50.1741 40.3717 50.7586 39.6266 51.2673C39.3523 51.4568 38.0076 52.3415 36.2294 52.3004C35.6367 52.2878 35.2641 52.1772 33.259 51.3715C29.9363 50.0383 29.4994 49.7571 28.3546 49.4948C27.6027 49.3211 26.4172 49.1315 24.8626 49.22C24.1953 49.2263 23.23 49.2831 22.0988 49.5264C21.086 49.7444 20.3511 50.0256 19.5416 50.3352C17.6211 51.0745 17.6448 51.3178 16.2866 51.757C15.1215 52.133 14.1494 52.4773 12.9707 52.2088C12.2222 52.0382 11.5583 51.738 10.969 51.3557C10.3018 50.9197 9.74967 50.3258 9.27549 49.6812C8.78776 49.0241 8.43212 48.3037 8.0968 47.5802C7.93423 47.2295 7.82584 46.8346 7.68359 46.4712C7.64294 46.367 7.43972 45.7035 7.3144 45.0084C7.04344 43.5109 7.2094 42.1333 7.27376 41.691V41.7037Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M26.9114 14.4756C26.8233 14.0586 26.715 13.433 26.6642 12.6621C26.6269 12.1187 26.6371 11.708 26.6574 10.9086C26.6709 10.3589 26.715 8.58329 26.7217 8.27051C26.7929 7.41746 26.8606 6.56441 26.9317 5.71136C26.9487 5.46493 27.0774 3.70828 27.6599 2.56456C27.7446 2.40027 28.0156 1.8916 28.4661 1.55986C28.6422 1.42717 28.8488 1.31659 29.0859 1.22496C29.5397 1.05119 29.953 1.01644 30.3967 1.02908C30.9691 1.04487 31.4907 1.29763 31.9581 1.55354C33.3908 2.34024 34.4814 3.48396 35.4704 4.70666C35.8125 5.13003 36.4086 5.98939 36.9709 7.17102C37.3231 7.91033 37.5568 8.57065 37.7126 9.09512C37.9023 9.8597 38.0886 10.6243 38.2783 11.3889C38.4205 12.0808 38.5289 13.0128 38.4307 14.106C38.3596 14.9085 38.1902 15.5972 38.0141 16.1501C37.9294 16.4977 37.777 16.9811 37.5026 17.5182C37.2791 17.951 36.7338 18.9715 35.5348 19.7898C35.1656 20.0394 34.5796 20.3775 33.7667 20.6113C33.5127 20.6808 33.1266 20.7598 32.6524 20.744C31.9784 20.7187 31.5144 20.4754 31.0808 20.3269C29.9665 19.9509 29.2756 19.1548 28.588 18.3365C28.5033 18.2385 28.317 17.9605 28.1036 17.6035C28.1036 17.6035 27.8564 17.1928 27.6532 16.7536C27.2196 15.8247 26.9893 14.8327 26.9114 14.4756Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M12.185 11.2403C12.2933 10.52 12.4424 9.93863 12.5474 9.56266L13.1604 7.82812C13.3704 7.31946 13.6786 6.67177 14.1156 5.95458C14.7388 4.93724 15.3688 4.20741 15.7346 3.80616C16.0665 3.44283 17.3705 2.06215 18.9929 1.326C19.3925 1.14592 19.8735 0.972147 20.4696 1.00374C20.6085 1.01006 20.9743 1.04165 21.4011 1.21858C21.5535 1.28177 22.0243 1.49345 22.4172 1.95473C22.7897 2.39073 22.9117 2.83306 22.9862 3.12056C23.23 4.0526 23.4908 5.10469 23.7516 6.27368C24.0599 8.29572 24.1716 10.7632 23.6975 13.5088C23.5857 14.1533 23.4502 14.7694 23.2944 15.3539C23.1792 15.812 23.0065 16.327 22.7457 16.8641C21.9159 18.5734 20.622 19.6381 19.7888 20.2068C19.44 20.4027 18.7016 20.7534 17.7261 20.7407C16.9539 20.7313 16.3984 20.4975 15.9378 20.3016C14.8912 19.8593 14.207 19.2242 13.8311 18.7977C13.3399 18.2479 13.0453 17.7045 12.8658 17.2812C12.5067 16.4881 12.3204 15.812 12.2188 15.3476C11.8361 13.6036 12.0427 12.166 12.1816 11.2403H12.185Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M1.00762 23.6632C0.99746 23.2715 0.99746 22.8923 1.00762 22.529C1.05165 21.578 1.15665 20.5291 1.34971 19.4043C1.48858 18.5987 1.65793 17.8436 1.84083 17.1485C1.94921 16.5703 2.20324 15.6319 2.87048 14.6367C3.60547 13.5404 4.50642 12.8832 5.04495 12.5452C5.28204 12.4409 5.51914 12.3335 5.75623 12.2292C5.87139 12.1882 6.04751 12.1408 6.26428 12.125C6.39299 12.1155 6.87395 12.0997 7.51071 12.4472C7.68344 12.542 8.36424 12.937 9.33631 14.3871C9.98323 15.3508 10.3524 16.1785 10.5252 16.5671C10.7826 17.1453 11.0163 17.7804 11.1416 18.1247C11.3042 18.5639 11.4329 18.9367 11.5243 19.2116C11.6158 19.5465 11.7072 19.8846 11.7987 20.2195C11.9206 20.7913 12.0425 21.3663 12.1645 21.9382C12.3237 22.728 12.3643 23.4042 12.3677 23.9128C12.3677 24.4057 12.3677 25.2398 12.0967 26.295C11.8596 27.2144 11.5277 27.8716 11.4295 28.0549C11.145 28.5983 10.6573 29.3787 9.84098 30.1748C9.55986 30.4718 8.86552 31.1258 7.7207 31.4544C6.68766 31.7514 5.81042 31.6377 5.3972 31.5587C4.92641 31.4102 4.23884 31.129 3.5716 30.5792C3.24983 30.3138 2.99919 30.0453 2.80952 29.8052C2.54533 29.4513 2.27098 29.028 2.02034 28.5319C1.54954 27.5999 1.32261 26.7374 1.21423 26.0739C1.10923 25.3346 1.03133 24.5289 1.00762 23.6664V23.6632Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M38.2276 25.4989C38.0311 24.2889 38.1395 23.3379 38.2479 22.4216C38.3156 21.8466 38.441 21.0789 38.6814 20.1848C38.861 19.5845 39.0405 18.9842 39.22 18.387L39.9414 16.6178C40.2496 15.91 40.5545 15.3382 40.7949 14.9211C41.3741 13.9133 41.7162 13.3414 42.4207 12.8359C43.1388 12.3209 43.7112 12.2514 43.8636 12.2356C44.2531 12.1977 44.5816 12.2546 44.7916 12.3051C45.696 12.6021 46.2582 13.0476 46.5597 13.3256C47.0169 13.7521 47.2811 14.185 47.5317 14.5957C47.8332 15.0886 48.0296 15.5277 48.155 15.8563C48.3074 16.2165 48.4598 16.6209 48.5919 17.0696C48.7477 17.6003 48.8527 18.0901 48.917 18.5324C48.9746 18.7978 49.0288 19.0663 49.0796 19.3412C49.3302 20.7061 49.4454 22.0014 49.4657 23.202C49.4827 23.8718 49.4556 24.6522 49.3303 25.5179C49.2219 26.2604 49.0661 26.9238 48.8967 27.4989C48.7206 28.1529 48.4666 28.6647 48.2599 29.0154C48.0262 29.4135 47.5622 30.1812 46.6308 30.8352C46.1769 31.1543 45.7468 31.3502 45.4352 31.4734C45.0931 31.5556 44.5647 31.644 43.9246 31.5998C42.1261 31.4766 40.9406 30.4119 40.5443 30.0548C39.7551 29.344 39.3284 28.5731 39.1285 28.2034C39.0879 28.1276 38.8948 27.7674 38.7018 27.2651C38.6035 27.0091 38.3665 26.3646 38.2276 25.5052V25.4989Z" stroke="#363A59" strokeMiterlimit="10"></path>
                            </svg>                                
                        </li>
                        <li data-value="grande" onClick={() => handleSelectSize('grande')} className={selectedSize === 'grande' ? 'selected' : ''}>
                            <svg width="64" height="67" viewBox="0 0 64 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.98476 52.8047C9.26065 50.8263 9.89433 49.4068 10.2521 48.6187C11.1143 46.7127 12.123 45.434 12.7394 44.6619C14.2309 42.7921 15.6794 41.6099 16.5976 40.87C17.8347 39.8728 18.9685 39.1329 19.8306 38.6142C21.9127 37.3234 23.8051 36.5594 25.1587 36.101C26.7364 35.5702 29.7066 34.569 33.0172 34.8706C34.3234 34.9912 35.7459 35.3129 35.7459 35.3129C37.1081 35.6225 38.147 35.9965 38.7635 36.2216C39.4532 36.471 40.0222 36.7082 40.4317 36.8892C40.893 37.0942 41.4577 37.3596 42.0914 37.6893C42.5354 37.9186 43.4277 38.393 44.514 39.0847C45.2598 39.5592 46.5401 40.3795 48.0186 41.6582C48.7256 42.2694 49.5878 43.0816 50.493 44.103C51.6397 45.3777 52.3897 46.5639 52.8682 47.4566C53.0277 47.7461 53.5278 48.6991 53.9934 50.014C54.2304 50.6855 54.3942 51.2766 54.5106 51.7431C54.7995 53.1223 54.9891 55.0283 54.5624 57.2198C54.4201 57.9436 54.2304 58.6031 54.0192 59.1942C53.7951 59.7732 53.5709 60.3523 53.3467 60.9273C53.101 61.4862 52.7087 62.2462 52.0837 63.0585C51.6785 63.5852 51.1095 64.3291 50.1611 64.9765C49.8119 65.2178 48.1005 66.3437 45.8374 66.2914C45.083 66.2753 44.6088 66.1346 42.0569 65.1092C37.828 63.4123 37.2719 63.0544 35.8149 62.7207C34.8579 62.4995 33.3491 62.2583 31.3705 62.3709C30.5213 62.3789 29.2927 62.4513 27.8529 62.7609C26.564 63.0384 25.6286 63.3962 24.5983 63.7903C22.1541 64.7312 22.1843 65.0409 20.4557 65.5998C18.9728 66.0783 17.7356 66.5166 16.2354 66.1748C15.2828 65.9577 14.4379 65.5757 13.6878 65.0891C12.8386 64.5342 12.1359 63.7782 11.5324 62.9579C10.9117 62.1215 10.459 61.2047 10.0323 60.2839C9.82536 59.8376 9.68741 59.3349 9.50636 58.8725C9.45463 58.7398 9.19599 57.8954 9.03649 57.0107C8.69163 55.1047 8.90285 53.3515 8.98476 52.7886V52.8047Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M33.9781 18.1508C33.866 17.62 33.7281 16.8238 33.6634 15.8427C33.616 15.151 33.6289 14.6283 33.6548 13.611C33.672 12.9113 33.7281 10.6514 33.7367 10.2533C33.8272 9.16764 33.9134 8.08195 34.004 6.99625C34.0255 6.6826 34.1893 4.44687 34.9308 2.99123C35.0385 2.78214 35.3834 2.13474 35.9567 1.71252C36.1809 1.54364 36.4438 1.4029 36.7456 1.28629C37.3232 1.06513 37.8492 1.0209 38.4139 1.03698C39.1424 1.05709 39.8062 1.37877 40.4011 1.70448C42.2246 2.70574 43.6126 4.16137 44.8714 5.71754C45.3068 6.25637 46.0654 7.35011 46.781 8.854C47.2294 9.79493 47.5268 10.6353 47.7251 11.3028C47.9665 12.276 48.2036 13.2491 48.445 14.2222C48.626 15.1028 48.764 16.289 48.639 17.6803C48.5484 18.7017 48.3329 19.5783 48.1087 20.282C48.001 20.7243 47.807 21.3395 47.4578 22.0231C47.1733 22.574 46.4793 23.8728 44.9533 24.9143C44.4834 25.2319 43.7376 25.6622 42.7031 25.9598C42.3798 26.0482 41.8883 26.1487 41.2848 26.1286C40.427 26.0965 39.8364 25.7868 39.2846 25.5979C37.8664 25.1193 36.987 24.106 36.1119 23.0646C36.0041 22.9399 35.7671 22.5861 35.4955 22.1317C35.4955 22.1317 35.1808 21.6089 34.9221 21.05C34.3704 19.8678 34.0772 18.6052 33.9781 18.1508Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M15.2355 14.0331C15.3734 13.1163 15.5631 12.3764 15.6967 11.8979L16.477 9.69034C16.7442 9.04294 17.1365 8.21861 17.6926 7.30582C18.4858 6.01103 19.2876 5.08216 19.7531 4.57148C20.1756 4.10905 21.8352 2.35183 23.9001 1.41491C24.4088 1.18571 25.0209 0.964551 25.7796 1.00476C25.9563 1.0128 26.4219 1.05302 26.965 1.2782C27.159 1.35862 27.7582 1.62803 28.2583 2.21511C28.7324 2.77002 28.8876 3.33298 28.9825 3.6989C29.2928 4.88512 29.6248 6.22415 29.9567 7.71196C30.349 10.2855 30.4912 13.4259 29.8877 16.9203C29.7455 17.7406 29.573 18.5247 29.3748 19.2686C29.2282 19.8517 29.0083 20.5071 28.6764 21.1907C27.6203 23.3661 25.9736 24.7212 24.9131 25.445C24.4691 25.6943 23.5294 26.1407 22.2879 26.1246C21.305 26.1125 20.5981 25.8149 20.0118 25.5656C18.6798 25.0027 17.809 24.1944 17.3305 23.6516C16.7054 22.9519 16.3304 22.2603 16.1019 21.7215C15.645 20.7122 15.4079 19.8517 15.2786 19.2606C14.7915 17.0409 15.0544 15.2113 15.2312 14.0331H15.2355Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M1.0097 29.8441C0.996767 29.3455 0.996767 28.8629 1.0097 28.4005C1.06574 27.1902 1.19937 25.8552 1.44509 24.4236C1.62183 23.3983 1.83736 22.4372 2.07015 21.5526C2.20809 20.8167 2.5314 19.6225 3.38061 18.3558C4.31605 16.9605 5.46271 16.1241 6.14812 15.6938C6.44987 15.5611 6.75163 15.4244 7.05338 15.2917C7.19994 15.2395 7.4241 15.1791 7.69999 15.159C7.8638 15.147 8.47593 15.1269 9.28635 15.5692C9.5062 15.6898 10.3727 16.1925 11.6098 18.0381C12.4332 19.2646 12.9031 20.3181 13.1229 20.8127C13.4505 21.5486 13.748 22.3568 13.9075 22.7951C14.1144 23.354 14.2782 23.8285 14.3946 24.1784C14.511 24.6046 14.6274 25.0349 14.7438 25.4611C14.899 26.1889 15.0541 26.9207 15.2093 27.6486C15.4119 28.6538 15.4637 29.5144 15.468 30.1618C15.468 30.789 15.468 31.8506 15.1231 33.1937C14.8214 34.3638 14.3989 35.2002 14.2739 35.4334C13.9118 36.125 13.291 37.1183 12.2521 38.1316C11.8944 38.5096 11.0107 39.3419 9.55362 39.7601C8.23884 40.1381 7.12235 39.9933 6.59644 39.8928C5.99724 39.7038 5.12216 39.3459 4.27294 38.6463C3.86342 38.3085 3.54442 37.9667 3.30302 37.6611C2.96678 37.2107 2.61761 36.6719 2.29862 36.0406C1.69942 34.8544 1.4106 33.7566 1.27266 32.9122C1.13902 31.9712 1.03987 30.9459 1.0097 29.8481V29.8441Z" stroke="#363A59" strokeMiterlimit="10"></path>
                                <path d="M48.3806 32.1804C48.1306 30.6403 48.2685 29.4299 48.4065 28.2638C48.4927 27.532 48.6522 26.5548 48.9582 25.4169C49.1867 24.6529 49.4152 23.8888 49.6436 23.1289L50.5618 20.877C50.9541 19.9763 51.3421 19.2485 51.6481 18.7177C52.3853 17.435 52.8207 16.7072 53.7173 16.0638C54.6312 15.4083 55.3597 15.3199 55.5537 15.2998C56.0494 15.2515 56.4676 15.3239 56.7348 15.3882C57.8858 15.7662 58.6014 16.3332 58.985 16.6871C59.567 17.2299 59.9032 17.7808 60.2222 18.3035C60.6059 18.9308 60.8559 19.4898 61.0154 19.908C61.2094 20.3664 61.4034 20.8811 61.5715 21.4521C61.7698 22.1276 61.9034 22.7509 61.9853 23.3138C62.0586 23.6516 62.1276 23.9934 62.1922 24.3432C62.5112 26.0803 62.6578 27.729 62.6837 29.257C62.7052 30.1095 62.6707 31.1027 62.5112 32.2045C62.3733 33.1494 62.175 33.9939 61.9595 34.7257C61.7353 35.5581 61.412 36.2095 61.149 36.6558C60.8516 37.1625 60.261 38.1396 59.0756 38.972C58.4979 39.3781 57.9505 39.6274 57.5539 39.7842C57.1185 39.8888 56.446 40.0014 55.6313 39.9451C53.3423 39.7883 51.8335 38.4332 51.3291 37.9788C50.3247 37.074 49.7816 36.0929 49.5272 35.6224C49.4755 35.5259 49.2298 35.0675 48.9841 34.4281C48.8591 34.1024 48.5573 33.2821 48.3806 32.1884V32.1804Z" stroke="#363A59" strokeMiterlimit="10"></path>
                            </svg>                                
                        </li>
                    </ul>
                {errors.size && <p style={{ color: 'red' }}>{errors.size}</p>}
                  
                </div>
        </div>  
        )}

        {currentStep === 4 &&(
        <div className="step3">
                <h2>¿Cuál es su color?</h2>
                <div className="containerFormStepsSelectors">
                    <div>
                        <p>Color principal</p>
                        <input type="hidden" name="color1" id="color1" />
                        <ul className="colorInputs principal">
                        <li onClick={() => handleSeleccionColor('blanco')} datavalue="blanco" className={selectedColor === 'blanco' ? 'selected' : ''}>Blanco</li>
                            <li onClick={() => handleSeleccionColor('negro')}datavalue="negro" className={selectedColor === 'negro' ? 'selected' : ''}>Negro</li>
                            <li onClick={() => handleSeleccionColor('gris')}datavalue="gris" className={selectedColor === 'gris' ? 'selected' : ''}>Gris</li>
                            <li onClick={() => handleSeleccionColor('cafe')}datavalue="cafe" className={selectedColor === 'cafe' ? 'selected' : ''}>Café</li>
                            <li onClick={() => handleSeleccionColor('naranja')}datavalue="naranja" className={selectedColor === 'naranja' ? 'selected' : ''}>Naranja</li>
                            <li onClick={() => handleSeleccionColor('otro')}datavalue="otro" className={selectedColor === 'otro' ? 'selected' : ''}>Otro color</li>
                    </ul>
                    {errors.color1 && <p style={{ color: 'red' }}>{errors.color1}</p>}    
                    </div>
                </div> 
        </div>
        )}
        {currentStep === 5 &&(
            <div className="step4">
                <h2>Comparte un poco más de información</h2>
                <div className="containerFormStepsSelectors">
                    <div className="inputDiv">
                        <label htmlFor="breed">¿Sabés su raza?</label>
                        <input 
                        id='breed' 
                        type="text" 
                        name="breed"
                        value={formData.breed}
                        onChange={handleChangeBreed}
                        placeholder="Si la conoces, ingresa la raza de la mascota"/>
                    </div>

                    <div className="inputDiv">
                        <label htmlFor="description">Describe la mascota</label>
                        <textarea 
                        name="description"
                        id="description"
                        placeholder="Podés compartir todos los datos que consideres necesarios" 
                        rows="10"
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        ></textarea>
                        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
                    </div>
                </div>
            </div>
        )}
        {currentStep === 6 &&(
            <div>
            <label htmlFor="sex">Género</label>
            <input 
            type="hidden" 
            name="sex" 
            id="sex"
            value={formData.sex}
            />
            <div className="sexSelector">
        
                <div datavalue="male" onClick={() => handleSelectGender('male')} className={selectedGender === 'male' ? 'selected' : ''}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="#D1E6FF" fillOpacity="0.5"/>
                        <path d="M25.8336 14.1666L21.3336 18.6666M25.8336 14.1666H21.667M25.8336 14.1666L25.8337 18.3333M22.5003 21.6666C22.5003 23.9678 20.6348 25.8333 18.3337 25.8333C16.0325 25.8333 14.167 23.9678 14.167 21.6666C14.167 19.3654 16.0325 17.5 18.3337 17.5C20.6348 17.5 22.5003 19.3654 22.5003 21.6666Z" stroke="#1B85F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Macho</span>
                </div>
    
        
                <div datavalue="female" onClick={() => handleSelectGender('female')} className={selectedGender === 'female' ? 'selected' : ''}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="#FFE1F2" fillOpacity="0.5"/>
                        <path d="M19.9997 21.6667C22.3009 21.6667 24.1663 19.8012 24.1663 17.5C24.1663 15.1989 22.3009 13.3334 19.9997 13.3334C17.6985 13.3334 15.833 15.1989 15.833 17.5C15.833 19.8012 17.6985 21.6667 19.9997 21.6667ZM19.9997 21.6667V27.5M17.4997 25H22.4997" stroke="#FF9AD5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Hembra</span>
                </div>
            
            </div>
        </div>
        )}
         {currentStep === 7 &&(
            <div className="step6">
                <h2>Foto de la mascota</h2>
                <ImgInput setImgLink={handleImgLink}/>
                {errors.img && <p style={{ color: 'red' }}>{errors.img}</p>}
            </div>
         )}
        {currentStep === 7 &&(
          <div className="step7">
                <h2>Datos de contacto</h2>
                <p>Gracias por ayudar a una mascota perdida. Por favor dinos cómo podemos contactarte.</p>
                <p>Tu información está protegida y no se compartirá con nadie.</p>
                <div className="containerFormStepsSelectors">
                    <div className="inputDiv">
                        <label htmlFor="personName">Nombre:</label>
                        <input type="text" name="personName" value={formData.personName}/>
                    </div>
                    <div className="inputDiv">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" placeholder="ejemplo@mail.com" value={formData.email} />
                    </div>
                    {!isAuthenticated && ( 
                        <div className="inputDiv">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        </div>
                    )}
                    
                </div>
            </div>  
        )} 
         {currentStep === 8 &&(
           <div className="step8">
                <h2>Verificación</h2>
                    <div className="alertPreview">
                        <p>Muchas gracias por ayudarnos a que el regreso a casa sea una realidad.<br/> Por favor verificá que la información sea correcta.</p>
                        <h3>Información de la mascota</h3>
                        <div className="infoVerif">
                            <div className="prevInfoContainter ">
                            { formData.img && (
                             <img src={formData.img} alt="Imagen de la mascota perdida"className="imgPrevContainer" />
                             )}
                            </div>
                            <div className="infoAnimal">
                                <ul>
                                    <li>Tipo de animal: <span>{formData.type}</span></li>
                                    <li>Tamaño: <span>{formData.size}</span></li>
                                    <li>Color: <span>{formData.color1}</span></li>
                                    <li>Raza: <span>{formData.breed}</span></li>
                                    <li>Encontrado en: <span></span> <span></span></li>
                                    <li>Descripción: {formData.description}</li>
                                </ul>
                            </div>
                        </div>
                            
                        </div>      
            </div> 
         )}

        <div className="btnStepForm">
            {currentStep > 1 && (
                <button className="btn secundary" onClick={handlePrev}>
                    Regresar
                </button>
            )}
            {currentStep <= 7 ? (
                <button id="next" onClick={handleNext}>
                    Continuar
                </button>
            ) : (
                <button id="next" onClick={handleSubmit}>
                    Crear Alerta
                </button>
            )}
        </div>
         
        </form>
        </main>
        </>
    )
}