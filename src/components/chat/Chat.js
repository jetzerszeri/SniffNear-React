import React, { useEffect, useState } from 'react';
import { Link,useLocation, useNavigate  } from 'react-router-dom';
import { BottomNav } from '../BottomNav';
import { getCurrentUserId } from '../../js/functions';
import { io } from 'socket.io-client';
// const socket = io('ws://localhost:3000')
const socket = io('https://sniffnear-api.onrender.com/')
export const Chat = () =>{
    const [isConnected, setIsConnected]=useState();
    const [messages, setMessages]=useState([]);
    const [newMessage, setNewMessage]= useState('');
    const [msgHistory , setMsgHistory] = useState([])
    const location = useLocation();
    const emisorId = getCurrentUserId()
    const navigate = useNavigate();
    const roomId = new URLSearchParams(location.search).get("roomId");
    

    useEffect(()=>{
     
        socket.on("connect",()=>setIsConnected(true));
    
        socket.emit('joinRoom', roomId);
        console.log('valor room id antes del sendmessage', roomId)
       
        socket.on('sendMessage',(data)=>{
            
            setMessages(messages=>[...messages, data]);
        })
        console.log('valor room id despues del sendmessage', roomId)
  
        return ()=>{
            socket.off("connect");
            socket.off('sendMessage');
        }

    },[roomId])


//mensajes
useEffect(()=>{
    const getHistorial = async ()=>{
        try{
            const response = await fetch(
              `  https://sniffnear-api.onrender.com/api/chats/${roomId}/messages`
            );
            if(response.ok){
                const data = await response.json()
                setMsgHistory(data)
            }else{

            }
        }catch{

        }
    }
    getHistorial()
},[roomId])


const handleBack = () =>{
        navigate(-1)
}


const handleSendMessage = async (e)=>{
    e.preventDefault();
    socket.emit('sendMessage',{
        roomId: roomId , 
        sender:emisorId, 
        text:newMessage
    })
    setNewMessage('');
};
function formatearHora(timestamp) {
    const fecha = new Date(timestamp);
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    return `${hora}:${minutos < 10 ? "0" : ""}${minutos}`;
  }
return(
    <>
    <div className="topNavBar">
            <div onClick={handleBack} className='arrowBack'>
            <i className="bi bi-arrow-left"></i>
            </div>
                <div className="logoContainerTopBar">
                <Link to='/'>
                    <svg className="logoTopBar" width="99" height="24"  viewBox="0 0 99 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_326_152)">
                        <path d="M15.7231 9.65337C14.9091 12.6372 7.97304 24.0019 7.97304 24.0019C7.97304 24.0019 1.03701 12.639 0.222971 9.65337C-0.583631 6.68995 0.942222 3.57095 2.33984 2.1411C3.704 0.742732 5.10533 0.0296588 5.65359 2.45932e-05C6.20186 -0.0277575 8.15517 0.25562 6.62746 2.51893C5.09975 4.78224 2.25806 7.53452 3.54788 9.9423C4.4344 11.5981 6.72225 11.6629 7.25565 10.4609C7.49725 9.91452 7.16458 9.2959 6.45462 8.43836C6.0476 7.94755 5.28189 7.23447 5.28189 6.54363C5.28189 5.20268 6.62746 5.2175 7.9749 5.20268C9.32047 5.2175 10.6679 5.20268 10.6679 6.54363C10.6679 7.23447 9.90033 7.9457 9.49517 8.43836C8.78521 9.29776 8.45068 9.91452 8.69415 10.4609C9.22754 11.6629 11.5154 11.6 12.4019 9.9423C13.6917 7.53267 10.85 4.78224 9.32233 2.51893C7.79462 0.25562 9.74422 -0.0259053 10.2925 2.45932e-05C10.8407 0.0278067 12.2421 0.74088 13.6081 2.13924C15.0057 3.56909 16.5297 6.68809 15.7212 9.65151L15.7231 9.65337Z" fill="#006667"/>
                        <path d="M23.529 18.5547C24.5828 18.5547 25.4005 18.3676 25.986 17.9916C26.5714 17.6027 26.8632 16.9803 26.8632 16.1265C26.8632 15.6338 26.7665 15.2264 26.5714 14.9022C26.3893 14.5652 26.1421 14.2873 25.8298 14.0669C25.5176 13.8336 25.1608 13.6391 24.7575 13.4835C24.3542 13.315 23.9323 13.1409 23.4899 12.9594C22.9305 12.7389 22.4306 12.513 21.9883 12.2796C21.5459 12.0462 21.1686 11.7869 20.8564 11.5017C20.5442 11.2035 20.3044 10.8664 20.1353 10.4905C19.9792 10.1145 19.9011 9.67366 19.9011 9.16988C19.9011 8.016 20.284 7.14179 21.0516 6.54725C21.8191 5.95086 22.8841 5.65267 24.2501 5.65267C24.6144 5.65267 24.9712 5.6786 25.3225 5.73046C25.6737 5.78232 25.999 5.8527 26.2982 5.94345C26.6104 6.02124 26.8892 6.112 27.1364 6.21572C27.3966 6.31944 27.6103 6.42871 27.7794 6.5454L27.3111 7.65298C26.9338 7.39368 26.4729 7.18624 25.9265 7.03066C25.3931 6.87508 24.8151 6.79729 24.1906 6.79729C23.7613 6.79729 23.3654 6.84174 23.0012 6.9325C22.6499 7.01029 22.3451 7.14549 22.0849 7.33997C21.8247 7.52148 21.6165 7.75484 21.4604 8.04007C21.3173 8.3253 21.2467 8.66795 21.2467 9.06986C21.2467 9.47178 21.3248 9.8348 21.4809 10.12C21.637 10.4053 21.8507 10.6516 22.1239 10.859C22.4101 11.0665 22.741 11.2535 23.1182 11.4221C23.4955 11.5906 23.9044 11.7647 24.3467 11.9462C24.8801 12.1666 25.3801 12.387 25.8484 12.6074C26.3298 12.8279 26.7461 13.0871 27.0955 13.3853C27.4468 13.6835 27.7255 14.0466 27.9337 14.4744C28.1418 14.9022 28.2459 15.4264 28.2459 16.0487C28.2459 17.2656 27.8166 18.1805 26.9598 18.788C26.1142 19.3974 24.9638 19.7011 23.5085 19.7011C22.9881 19.7011 22.5142 19.6696 22.0849 19.6048C21.6556 19.54 21.2727 19.4622 20.9345 19.3715C20.5962 19.2677 20.31 19.164 20.0758 19.0603C19.8417 18.9566 19.6595 18.8658 19.5294 18.788L19.9587 17.6416C20.0888 17.7193 20.2635 17.8101 20.4847 17.9138C20.7059 18.0175 20.9661 18.1213 21.2653 18.225C21.5645 18.3157 21.9028 18.3935 22.28 18.4583C22.6573 18.5232 23.0736 18.5547 23.5271 18.5547H23.529ZM29.5041 9.71255C29.8814 9.60883 30.3888 9.49215 31.0244 9.3625C31.6619 9.23285 32.4406 9.16803 33.3643 9.16803C34.1319 9.16803 34.7675 9.2773 35.2749 9.49771C35.7953 9.71811 36.2041 10.0348 36.5034 10.4497C36.8156 10.8516 37.0368 11.3369 37.1669 11.9073C37.297 12.4778 37.362 13.1057 37.362 13.7928V19.4085H36.0945V14.2003C36.0945 13.4872 36.0424 12.8853 35.9384 12.3926C35.8473 11.8999 35.6856 11.498 35.4514 11.1887C35.2303 10.8775 34.9311 10.6571 34.5538 10.5275C34.1895 10.3849 33.7286 10.3145 33.1692 10.3145C32.5707 10.3145 32.0503 10.346 31.6099 10.4108C31.1805 10.4756 30.9018 10.5331 30.7717 10.5849V19.4066H29.5041V9.7107V9.71255ZM40.7594 19.4085H39.4919V9.3625H40.7594V19.4085ZM41.0512 6.33055C41.0512 6.62875 40.9601 6.86767 40.778 7.04918C40.5958 7.21773 40.3747 7.30107 40.1145 7.30107C39.8543 7.30107 39.6331 7.21773 39.451 7.04918C39.2689 6.86767 39.1778 6.62875 39.1778 6.33055C39.1778 6.03236 39.2689 5.79899 39.451 5.63044C39.6331 5.44893 39.8543 5.35818 40.1145 5.35818C40.3747 5.35818 40.5958 5.44893 40.778 5.63044C40.9601 5.79899 41.0512 6.03236 41.0512 6.33055ZM46.7086 4.32839C47.255 4.32839 47.6973 4.37284 48.0337 4.4636C48.3849 4.54139 48.6117 4.61177 48.7158 4.67659L48.463 5.76565C48.3199 5.70082 48.1062 5.636 47.82 5.57117C47.5467 5.49338 47.1955 5.45449 46.7662 5.45449C45.8685 5.45449 45.2254 5.68045 44.8352 6.13422C44.4579 6.588 44.2702 7.31218 44.2702 8.31049V9.36065H48.3255V10.4293H44.2702V19.4066H43.0026V8.27159C43.0026 6.96398 43.3019 5.97864 43.9003 5.31743C44.5118 4.65622 45.4466 4.32654 46.7086 4.32654V4.32839ZM53.7059 4.32839C54.2523 4.32839 54.6947 4.37284 55.031 4.4636C55.3823 4.54139 55.609 4.61177 55.7131 4.67659L55.4604 5.76565C55.3173 5.70082 55.1035 5.636 54.8173 5.57117C54.5441 5.49338 54.1928 5.45449 53.7635 5.45449C52.8659 5.45449 52.2228 5.68045 51.8325 6.13422C51.4552 6.588 51.2675 7.31218 51.2675 8.31049V9.36065H55.3228V10.4293H51.2675V19.4066H50V8.27159C50 6.96398 50.2992 5.97864 50.8977 5.31743C51.5091 4.65622 52.444 4.32654 53.7059 4.32654V4.32839Z" fill="#006667"/>
                        <path d="M66.7993 19.4085C65.8217 17.6786 64.7642 15.971 63.6268 14.2855C62.4894 12.6001 61.2776 11.0072 59.9952 9.51072V19.4085H56.6257V4.30066H59.4042C59.8856 4.78036 60.419 5.36934 61.0007 6.0676C61.5843 6.76585 62.1753 7.51412 62.7719 8.31239C63.3852 9.0977 63.9892 9.91819 64.5877 10.7757C65.1861 11.6185 65.7474 12.4334 66.2715 13.2168V4.30066H69.6633V19.4104H66.7975L66.7993 19.4085ZM71.2877 14.3763C71.2877 13.4687 71.4233 12.6797 71.6965 12.0056C71.9828 11.3184 72.3526 10.7498 72.8079 10.296C73.2633 9.84226 73.7837 9.49961 74.3673 9.26624C74.9657 9.03287 75.5753 8.91619 76.1998 8.91619C77.6568 8.91619 78.8073 9.36255 79.6511 10.2571C80.4967 11.1388 80.9186 12.4408 80.9186 14.1633C80.9186 14.3318 80.913 14.5189 80.9 14.7263C80.887 14.9208 80.874 15.0949 80.861 15.2505H74.2706C74.3357 15.8469 74.6144 16.3192 75.1088 16.6692C75.6032 17.0193 76.2667 17.1934 77.0974 17.1934C77.6308 17.1934 78.1512 17.1489 78.6567 17.0582C79.1771 16.9545 79.599 16.8322 79.9243 16.6896L80.3145 19.04C80.1584 19.1178 79.9503 19.1955 79.6901 19.2733C79.4299 19.3511 79.1381 19.416 78.8129 19.4678C78.5006 19.5326 78.1624 19.5845 77.7981 19.6234C77.4338 19.6623 77.0696 19.6808 76.7053 19.6808C75.7835 19.6808 74.9768 19.5456 74.2873 19.2733C73.6108 19.0011 73.0458 18.6325 72.5905 18.1658C72.1482 17.6861 71.8174 17.123 71.5962 16.4748C71.388 15.8265 71.284 15.1283 71.284 14.3763H71.2877ZM78.1122 13.2687C78.0992 13.0224 78.0546 12.7834 77.9765 12.5501C77.9115 12.3167 77.8018 12.1093 77.6457 11.9278C77.5026 11.7463 77.3149 11.5981 77.0807 11.4814C76.8595 11.3647 76.5808 11.3073 76.2425 11.3073C75.9043 11.3073 75.6385 11.3647 75.4043 11.4814C75.1701 11.5851 74.975 11.7277 74.8189 11.9092C74.6628 12.0908 74.5401 12.3037 74.449 12.5501C74.371 12.7834 74.3134 13.0224 74.2743 13.2687H78.1159H78.1122ZM86.0797 17.3879C86.3659 17.3879 86.6391 17.3805 86.8993 17.3693C87.1595 17.3564 87.3677 17.3379 87.5238 17.3119V15.1153C87.4067 15.0894 87.232 15.0634 86.9978 15.0375C86.7636 15.0116 86.5499 14.9986 86.3548 14.9986C86.0816 14.9986 85.8214 15.0171 85.5742 15.056C85.34 15.082 85.1319 15.1394 84.9497 15.2301C84.7676 15.3209 84.6245 15.4431 84.5204 15.5987C84.4163 15.7543 84.3643 15.9488 84.3643 16.1821C84.3643 16.6359 84.513 16.9526 84.8122 17.1341C85.1244 17.3027 85.5463 17.386 86.0797 17.386V17.3879ZM85.8455 8.91619C86.7042 8.91619 87.4178 9.0125 87.9903 9.20697C88.5627 9.40145 89.0162 9.67927 89.3544 10.0423C89.7057 10.4053 89.9529 10.8461 90.096 11.3629C90.2391 11.8815 90.3097 12.4575 90.3097 13.0928V19.1159C89.8934 19.2067 89.3154 19.3104 88.5738 19.4271C87.8323 19.5567 86.9365 19.6215 85.8827 19.6215C85.2192 19.6215 84.6152 19.5641 84.0688 19.4474C83.5354 19.3308 83.0745 19.1437 82.6842 18.8844C82.2939 18.6121 81.9947 18.2621 81.7865 17.8342C81.5783 17.4064 81.4743 16.8822 81.4743 16.2599C81.4743 15.6376 81.5914 15.1579 81.8255 14.7449C82.0727 14.33 82.398 14.0003 82.8013 13.754C83.2046 13.5076 83.6655 13.3335 84.1859 13.2298C84.7063 13.1131 85.2452 13.0557 85.8046 13.0557C86.1819 13.0557 86.5127 13.0742 86.799 13.1131C87.0982 13.1391 87.3379 13.178 87.5201 13.2298V12.9576C87.5201 12.4649 87.3695 12.0704 87.0722 11.7722C86.7729 11.474 86.2525 11.3258 85.5128 11.3258C85.0185 11.3258 84.5315 11.3647 84.0502 11.4425C83.5688 11.5073 83.1525 11.6036 82.8031 11.7333L82.4333 9.40145C82.6024 9.34959 82.8106 9.29773 83.0577 9.24587C83.3179 9.18104 83.5967 9.12918 83.8959 9.09029C84.1952 9.03843 84.5074 8.99953 84.8326 8.9736C85.1709 8.93471 85.5091 8.91619 85.8474 8.91619H85.8455ZM98.1155 11.7537C97.8553 11.6888 97.5505 11.624 97.1993 11.5592C96.848 11.4814 96.4707 11.4425 96.0674 11.4425C95.8853 11.4425 95.6641 11.461 95.4039 11.4999C95.1568 11.5258 94.9691 11.5573 94.839 11.5962V19.4085H91.9341V9.73113C92.4545 9.54962 93.0659 9.38107 93.7666 9.22549C94.4821 9.05695 95.2738 8.9736 96.1455 8.9736C96.3016 8.9736 96.4893 8.98657 96.7105 9.0125C96.9317 9.02546 97.1528 9.05139 97.374 9.09029C97.5951 9.11622 97.8163 9.15511 98.0375 9.20697C98.2586 9.24587 98.4464 9.29773 98.6025 9.36255L98.1155 11.7518V11.7537Z" fill="#363A59"/>
                        <path d="M80.8814 9.11995L80.0636 9.47C79.3648 8.96252 78.5805 8.58098 77.7219 8.35131C76.9915 8.15499 76.2499 8.0809 75.5158 8.11794L75.198 7.37894C76.1143 7.28819 77.0435 7.35671 77.9579 7.60305C79.0507 7.89569 80.032 8.41799 80.8832 9.11995H80.8814Z" fill="#FF8367"/>
                        <path d="M82.4426 8.45128L81.7047 8.76614C80.7569 7.7308 79.5693 6.97328 78.194 6.60285C77.0751 6.3028 75.9359 6.28798 74.8263 6.51765L74.5271 5.8268C75.8058 5.51564 77.129 5.50638 78.4263 5.85458C80.0228 6.28243 81.3851 7.19924 82.4407 8.45128H82.4426Z" fill="#FF8367"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_326_152">
                        <rect width="98.6024" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>   
                </Link> 
                </div>
    </div>
    <main>
     
            <div className='chat-container'>
                <h1> Chat con:</h1>
            <div className='messages'>
            {msgHistory.length > 0 && (
              <> 
                {msgHistory.map((mensaje, index) => (
                         <div key={index}  className={` message-card ${mensaje.sender === emisorId ? "msg-sent" : "msg-received"}`}>
                            <p className='message-text'>{mensaje.text}</p>
                            
                        </div>
                ))}
              </>
                   
               
            )}
            {messages.map((mensaje, index) => (
                <div key={index}  className={`message-card ${mensaje.sender === emisorId ? "msg-sent" : "msg-received"}`}>
                    <p className='message-text'>{mensaje.text}</p>
                </div>
            ))}
             </div> 
            {/* Formulario para enviar el mensaje */}
            <form className='chat-form'onSubmit={handleSendMessage}>
                <input type='text' 
                 className='inputMsg' 
                 value={newMessage}
                 onChange={(event) => setNewMessage(event.target.value)}
                placeholder='Escribe tu mensaje...'/><br />
                <button type='submit' className='btnSend' >Enviar</button>
            </form> 

        </div>
    </main>
        <BottomNav/>
    </>
)
}