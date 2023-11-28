// Chat.js
import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js'; // Import your Firestore instance
import User from './User.jsx' 
import UserList from './Userlist.jsx'
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";



const Chat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [recipient, setRecipient] = useState(null);

  const onSelectRecipient = (selectedUser) => {
    setRecipient(selectedUser);
  };
  
  const sendMessage = async () => {
    if (!recipient) {
      // Display an error message or prevent sending without a recipient
      return;
    }
  
    if (message.trim() !== '') {
      try {
        await addDoc(collection(db, 'personalMessages', `${user.uid}_${recipient.uid}`), {
          text: message,
          timestamp: new Date(),
          sender: user.displayName,
          senderUid: user.uid,
          recipient: recipient.displayName,
          recipientUid: recipient.uid,
        });
        setMessage(''); // Clear the input field after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    console.log(`User:`, user)
    console.log(`recipient`, recipient)
    const unsubscribe = onSnapshot(
      collection(db, 'personalMessages'),
      (snapshot) => {
        setMessages(
          snapshot.docs
            .filter((doc) => {
              const isUserInDoc = user && doc.id.includes(user.uid);
              const isRecipientInDoc = recipient && doc.id.includes(recipient.uid);
              return isUserInDoc || isRecipientInDoc;
            })
            .map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    );
  
    return () => unsubscribe();
  }, [user, recipient]);

  return (
    <div className='flex justify-center h-screen w-full'>
      <div className='flex w-1/5 justify-start overflow-scroll'>
        
      <UserList user={user} onSelectRecipient={onSelectRecipient} />
      
        </div>
      <div className='flex w-2/3 flex-col mb-5 items-center justify-end' >
        
      
      {messages.map((msg) => (
      <div key={msg.id} className='flex'>
        <img
          src={user.photoURL}
          alt="Profile"
          className='h-8 w-8 rounded-xl bg-center bg-cover'
        />
        <strong>{msg.sender}</strong>: {msg.text}
      </div>
    ))}
        <div className='flex w-full justify-center items-center'>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input type="text" 
                className="opacity-75 bg-slate-800"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              label="Send Message" />
          </div>
        <Button disableRipple       className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
          size="lg"
        onClick={sendMessage}>Send</Button>
      </div>
      </div>
      
    </div>
  );
};

export default Chat;