// Chat.js
import React, { useState, useEffect } from 'react';
import { collection, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js'; // Import your Firestore instance
import UserList from './Userlist.jsx'
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import GroupChat from './GroupChat.jsx'
import { useUser } from './UserContext.js'
import { GiHamburgerMenu } from "react-icons/gi";



const Chat = () => {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [userListVisible, setUserListVisible] = useState(true);

  const onSelectRecipient = (selectedUser) => {
    setRecipient(selectedUser);
    console.log("recipient", recipient)
  };
  
  
  const sendMessage = async () => {
    if (!recipient) {
      return;
    }
  
    console.log('User UID:', user.uid);
    console.log('Recipient UID:', recipient.id);
  
    if (message.trim() !== '') {
      try {
        console.log("we made it send");
  
        const messageId = `${user.uid}_${recipient.id}_${new Date().getTime()}_${Math.random().toString(36).substring(2)}`;
  
        await setDoc(doc(db, 'personalMessages', messageId), {
          text: message,
          timestamp: new Date(),
          sender: user.displayName,
          senderUid: user.uid,
          recipient: recipient.displayName,
          recipientid: recipient.id,
          senderPhotoURL: user.photoURL,
        });
  
        setMessage(''); 
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    if (!recipient || !user) {
      return; 
    }
  
    const userUid = user.uid;
    const recipientId = recipient.id;
  
    const unsubscribe = onSnapshot(
      collection(db, 'personalMessages'),
      (snapshot) => {
        const newMessages = snapshot.docs
          .filter((doc) => {
            const participants = doc.id.split('_');
            return (
              participants.includes(userUid) && participants.includes(recipientId)
            );
          })
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.timestamp - b.timestamp)
          .reverse(); // Reverse the order to have the latest messages first
  
        console.log('New Messages:', newMessages);
  
        setMessages(newMessages);
      }
    );
  
    return () => unsubscribe();
  }, [user, recipient]);
  
  const toggleUserList = () => {
    setUserListVisible(!userListVisible);
  };
  

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <GiHamburgerMenu className="text-white text-2xl cursor-pointer" onClick={toggleUserList} />
        <span className="text-white text-xl">Personal Messaging</span>
        <div className="w-8" /> 
      </div>

     
      <div className="flex-grow flex">
        {userListVisible && (
          <div className="w-1/4 bg-slate-600 overflow-auto">
            <UserList user={user} onSelectRecipient={onSelectRecipient} />
          </div>
        )}
        <div className="flex-grow p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col items-${msg.senderUid === user.uid ? 'end' : 'start'} justify-center`}
            >
              <span className='text-xs'>{msg.sender}</span>
              <div className='flex flex-row'>
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
          <div className="flex w-full justify-center items-center">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="text"
                className="w-full opacity-75 bg-slate-800"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                label="Send Message"
              />
            </div>
            <Button
              className="w-full mt-2 rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
              size="lg"
              onClick={sendMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;