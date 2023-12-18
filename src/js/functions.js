// import { useNavigate  } from 'react-router-dom';



// const navigate = useNavigate();

function getCurrentUserId(){
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
        return storedUserId;
    } else {
        // navigate('/login');
        window.location.href = '/login';
    }
}

//funcion para crear un loader
function createLoader(texto){
    let loaderBack = document.createElement('div');
    loaderBack.classList.add('loadingBackground');

    let loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loadingContainer');

    let loader = document.createElement('div');
    loader.classList.add('bouncer');
    loader.innerHTML = `<div></div><div></div><div></div><div></div>`
    loaderContainer.appendChild(loader);

    if (texto) {
        let loaderText = document.createElement('p');
        loaderText.innerText = texto;
        loaderContainer.appendChild(loaderText);
    }

    loaderBack.appendChild(loaderContainer);
    document.body.appendChild(loaderBack);
}

// function para remover un loader
function removeLoader(){
    let loaderBack = document.querySelectorAll('.loadingBackground');
    loaderBack.forEach(element => {
        element.remove();
    });
}

// navigate('/');

export { getCurrentUserId, createLoader, removeLoader };


