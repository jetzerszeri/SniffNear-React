import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BottomNav } from '../BottomNav';
import { getCurrentUserId } from '../../js/functions';

export const Inbox = () => {
    const navigate = useNavigate();
    const userId = getCurrentUserId();
    const [chats, setChats] = useState([]);
    const [sender, setSender] = useState({});
   
 // Obtener la lista de chats del usuario
 useEffect(()=>{
const getUserChatsRooms = async () => {
            try {
                const response = await fetch(`https://sniffnear-api.onrender.com/api/chats/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setChats(data);
                } else {
                    console.error('Error al obtener los chats');
                }
            } catch (error) {
                console.error('Error al obtener los chats:', error);
            }
        };
        getUserChatsRooms();
 }, [userId])

    const updateSenderNames = async (chats, userId) => {
        const newSenders = {};
        for (const chat of chats) {
            const senderId = chat.participants.find(participant => participant !== userId);
            if (senderId) {
                try {
                    const response = await fetch(`https://sniffnear-api.onrender.com/api/users/${senderId}`);
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data)
                        newSenders[chat._id] = data.user.name;
                        console.log(newSenders)
                    } else {
                        console.error(`Error al obtener el usuario sender: ${response.status}`);
                        newSenders[chat._id] = 'Nombre no disponible';
                    }
                } catch (error) {
                    console.error('Error al traer el usuario sender:', error);
                    newSenders[chat._id] = 'Nombre no disponible';
                }
            }
        }
        return newSenders;
    };
    
    useEffect(() => {
        const fetchSenderNames = async () => {
            try {
                const updatedSenderNames = await updateSenderNames(chats, userId);
                setSender(updatedSenderNames);
            } catch (error) {
                console.error('Error al actualizar los nombres de los remitentes:', error);
            }
        };
        fetchSenderNames();
    }, [chats, userId]);
    
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="topNavBar">
                <div onClick={handleBack}>
                    <i className="bi bi-arrow-left"></i>
                </div>
                <div className="logoContainerTopBar">
                    <Link to='/'></Link>
                </div>
            </div>
            <div>
                <h1>Tus conversaciones</h1>
            </div>
            <div>
                <ul className='message-list'>
                    {chats.map(chat => (
                    
                        <Link to={`/chat?roomId=${chat._id}`} key={chat._id}>
                            <li className='message-card'>
                                <div className='text-content'>
                                    <p className='username'>{sender[chat._id]}</p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <BottomNav/>
        </>
    );
};

