import { Link } from "react-router-dom"

export const FoundPetButton = () =>{
    return (
        <Link to="/found-form" style={{color:'black'}}>
             <div className="find">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M23.4949 23.495C23.7039 23.2858 23.9521 23.1198 24.2252 23.0066C24.4984 22.8934 24.7911 22.8351 25.0868 22.8351C25.3825 22.8351 25.6753 22.8934 25.9485 23.0066C26.2216 23.1198 26.4698 23.2858 26.6787 23.495L35.3414 32.1576C35.7636 32.5795 36.0009 33.1519 36.0011 33.7487C36.0013 34.3456 35.7644 34.9181 35.3425 35.3403C34.9206 35.7625 34.3483 35.9998 33.7514 36C33.1545 36.0002 32.582 35.7633 32.1598 35.3414L23.4972 26.6788C23.288 26.4698 23.122 26.2217 23.0088 25.9485C22.8956 25.6754 22.8373 25.3826 22.8373 25.0869C22.8373 24.7912 22.8956 24.4984 23.0088 24.2253C23.122 23.9521 23.2857 23.704 23.4949 23.495Z" fill="#FBC609"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6252 27.0004C16.2504 27.0004 17.8596 26.6803 19.361 26.0584C20.8624 25.4365 22.2267 24.5249 23.3758 23.3758C24.5249 22.2267 25.4365 20.8624 26.0584 19.361C26.6803 17.8596 27.0004 16.2504 27.0004 14.6252C27.0004 13.0001 26.6803 11.3909 26.0584 9.88944C25.4365 8.38802 24.5249 7.02379 23.3758 5.87464C22.2267 4.7255 20.8624 3.81395 19.361 3.19204C17.8596 2.57013 16.2504 2.25003 14.6252 2.25003C11.3431 2.25003 8.19544 3.55385 5.87464 5.87464C3.55385 8.19544 2.25003 11.3431 2.25003 14.6252C2.25003 17.9073 3.55385 21.055 5.87464 23.3758C8.19544 25.6966 11.3431 27.0004 14.6252 27.0004ZM29.2504 14.6252C29.2504 18.5041 27.7096 22.2241 24.9668 24.9668C22.2241 27.7096 18.5041 29.2504 14.6252 29.2504C10.7464 29.2504 7.02639 27.7096 4.28363 24.9668C1.54087 22.2241 0 18.5041 0 14.6252C0 10.7464 1.54087 7.02639 4.28363 4.28363C7.02639 1.54087 10.7464 0 14.6252 0C18.5041 0 22.2241 1.54087 24.9668 4.28363C27.7096 7.02639 29.2504 10.7464 29.2504 14.6252Z" fill="#FBC609"/>
            </svg>
            <p>Encontré una mascota</p>
        </div>
        </Link>
       
    )
}
