// GroupChat.jsx
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useUser } from './UserContext.js'
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";
import UserList from "./Userlist.jsx"


const GroupChat = () => {

  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [groupMessages, setGroupMessages] = useState([]);
  const [userListVisible, setUserListVisible] = useState(true);

  useEffect(() => {
    const fetchGroupMessages = () => {
      const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        messagesData.sort((a, b) => a.timestamp - b.timestamp);
    
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
          senderPhotoURL: user.photoURL, 
        });

        setMessage(''); // Clear the input field after sending
      } catch (error) {
        console.error('Error sending group message:', error);
      }
    }
  };

  const toggleUserList = () => {
    setUserListVisible(!userListVisible);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <GiHamburgerMenu className="text-white text-2xl cursor-pointer" onClick={toggleUserList} />
        <span className="text-white text-xl">GroupChat</span>
      </div>
    <div className="flex-grow flex">
        {userListVisible && (
          <div className="w-1/4 bg-slate-600 overflow-auto">
            <UserList user={user} />
          </div>
        )}
        
      <div className="flex-grow overflow-y-auto">
        {groupMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col items-${msg.senderUid === user.uid ? 'end' : 'start'} justify-center mb-4`}
          >
            <span className='text-xs'>{msg.sender}</span>
            <div className='flex flex-row items-center'>
              {msg.senderPhotoURL && (
                <img
                  src={msg.senderPhotoURL}
                  alt={msg.sender}
                  className="h-8 w-8 rounded-full bg-center bg-cover"
                />
              )}
              <div
                className={`rounded-lg p-2 ${
                  msg.senderUid === user.uid ? 'bg-blue-300 text-black' : 'bg-gray-300 text-black'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      
            <div className="flex items-center p-4">
            <Input
              type="text"
              className="w-full opacity-75 bg-slate-800"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              label="Send Message"
            />
              <Button
                    className="w-full mt-2 rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
                    size="lg"
                    onClick={sendGroupMessage}
                  >Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};




export default GroupChat;
