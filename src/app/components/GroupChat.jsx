// GroupChat.js
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

const GroupChat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [groupMessages, setGroupMessages] = useState([]);
  console.log(user)

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
        <div key={msg.id}>
          <strong>{msg.sender}</strong>: {msg.text}
        </div>
      ))}
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendGroupMessage}>Send</button>
      </div>
    </div>
  );
};

export default GroupChat;
