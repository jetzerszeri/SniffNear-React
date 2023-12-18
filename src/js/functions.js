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



// navigate('/');

export { getCurrentUserId };


