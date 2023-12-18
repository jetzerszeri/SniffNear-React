import app from '../../js/config.js'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js';
import { createLoader, removeLoader } from '../../js/functions';

const storage = getStorage(app);

function getCurrentTimestamp() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
}

export const ImgInput = ( {setImgLink}) => {

    // console.log(setImgLink)
    

    const handleImageChange = async (event) => {
        createLoader('Cargando imagen')
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Actualizar el fondo del label con la imagen cargada
                const label = document.querySelector('.labelImgInput');
                label.style.backgroundImage = `url(${e.target.result})`;
                label.innerHTML = '';
                // label.style.backgroundSize = 'cover';
                // label.style.backgroundPosition = 'center';
            };
            reader.readAsDataURL(file);

            const imageUrl = await uploadImage(file, 'PetProfile');
            // console.log('Se cargó la imagen', imageUrl);
            setImgLink(imageUrl)
            removeLoader();
            // setImgLink('imagen cambio')
        }
    };

    async function uploadImage(file, customName) {
        // Obtener la extensión del archivo
        const extension = file.name.split('.').pop();
        
        // Crear el nombre del archivo con el customName, el timestamp y la extensión
        const fileName = `${customName}_${getCurrentTimestamp()}.${extension}`;

        // Crea una referencia en Firebase Storage con el nombre personalizado
        const storageRef = ref(storage, fileName);

        await uploadBytes(storageRef, file);

        // Devuelve la URL de descarga del archivo.
        return getDownloadURL(storageRef);
    }




    return (
        <>
            <label htmlFor="imageInput" className="labelImgInput">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.4431 58.6666H43.5541C52.5949 58.6666 58.6666 52.325 58.6666 42.8887V21.1112C58.6666 11.6749 52.5949 5.33331 43.5568 5.33331H20.4431C11.405 5.33331 5.33325 11.6749 5.33325 21.1112V42.8887C5.33325 52.325 11.405 58.6666 20.4431 58.6666ZM22.6635 29.3333C18.9872 29.3333 15.9999 26.342 15.9999 22.6666C15.9999 18.9913 18.9872 16 22.6635 16C26.3372 16 29.3272 18.9913 29.3272 22.6666C29.3272 26.342 26.3372 29.3333 22.6635 29.3333ZM52.8554 39.8239C53.7484 42.1135 53.2845 44.8655 52.3298 47.1331C51.1982 49.83 49.0316 51.872 46.3017 52.7636C45.0897 53.1599 43.8186 53.3333 42.5503 53.3333H20.0763C17.8399 53.3333 15.8609 52.7967 14.2386 51.7977C13.2223 51.1703 13.0426 49.7227 13.7961 48.7843C15.0565 47.2157 16.3007 45.6415 17.5557 44.0536C19.9476 41.0155 21.5592 40.1348 23.3505 40.9081C24.0772 41.2274 24.8065 41.7062 25.5574 42.2126C27.5578 43.572 30.3386 45.4406 34.0015 43.4124C36.5082 42.0085 37.9621 39.6003 39.2281 37.5032L39.2493 37.4682C39.339 37.321 39.4279 37.1739 39.5166 37.0272L39.5166 37.0271C39.9421 36.3231 40.3619 35.6286 40.8368 34.9886C41.4321 34.1878 43.639 31.6835 46.4975 33.4668C48.3183 34.5896 49.8494 36.1087 51.4878 37.7351C52.1126 38.357 52.5578 39.0643 52.8554 39.8239Z" fill="#363A59"/>
                    </svg>                            
                <p>Cargar foto</p>
            </label>
            <input type="file" id="imageInput" accept="image/*" name="img" onChange={handleImageChange}/>
        </>
  )
}
