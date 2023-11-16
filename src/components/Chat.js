'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../app/firebase'
import {Button, ButtonGroup} from "@nextui-org/react";


function Chat({ user }) {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const sendMessage = async () => {
        if (message.trim() !== '') {
            try {
                await addDoc(collection(db, 'messages'), {
                    text: message,
                    timestamp: new Date(),
                    user: user.displayName
                });
                setMessage('')
            } catch (error) {
                console.log("Error Sending Message:", error)
            }
        }
    }


        useEffect(() => {
            const newMessage = onSnapshot(collection(db, 'messages'), (snapshot) => {
                setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})));
            })
            
        return () => newMessage();
        }, []);


    return (
        <div className="flex flex-col justify-center items-between h-full">
                <nav className="flex justify-between items-between h-1/3">
                    <a>
                        Home
                    </a>
                    <a>
                        Chat
                    </a>
                    <a>
                        Social
                    </a>
                </nav>
            <div className='flex flex-col items-between h-full'>
                <div className='flex flex-col'> 
                    {messages.map((msg) => (
                        <div key={msg.id}>
                            <strong>{msg.user}</strong>: {msg.text}
                        </div>
                    ))}
                </div>
                <div className='flex'>
                    <input 
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button onClick={sendMessage}>Send</Button>
                </div>
            </div>
        </div>
        
    )
}

export default Chat;