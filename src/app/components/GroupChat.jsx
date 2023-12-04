// GroupChat.jsx
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useUser } from './UserContext.js'
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

const GroupChat = () => {

  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [groupMessages, setGroupMessages] = useState([]);

  useEffect(() => {
    const fetchGroupMessages = () => {
      const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroupMessages(messagesData);
      });

      return () => {
        unsubscribe();
      };
    };

    fetchGroupMessages();
  }, []);

  const sendGroupMessage = async () => {
    if (message.trim() !== '') {
      try {
        await addDoc(collection(db, 'messages'), {
          text: message,
          timestamp: serverTimestamp(),
          sender: user.displayName,
          senderUid: user.uid,
          senderPhotoURL: user.photoURL, // Assuming user object has photoURL property
        });

        setMessage(''); // Clear the input field after sending
      } catch (error) {
        console.error('Error sending group message:', error);
      }
    }
  };

  return (
    <div>
      <h2>Group Chat</h2>
      {groupMessages.map((msg) => (
        <div key={msg.id} className="flex justify-center items-center">
          {msg.senderPhotoURL && <img src={msg.senderPhotoURL} alt={msg.sender} className="'h-8 w-8 rounded-xl bg-center bg-cover'" />}
            <strong>{msg.sender}</strong>: {msg.text}
        </div>
      ))}
      <div className='flex  items-center'>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={sendGroupMessage}>Send</Button>
      </div>
    </div>
  );
};

export default GroupChat;
