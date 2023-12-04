// ChatPage.jsx
'use client'
import React, { useEffect, useState } from 'react';
import GroupChat from "../components/GroupChat.jsx";
import { UserProvider } from '../components/UserContext.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js';

export default function ChatPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserProvider user={user}>
      <GroupChat />
    </UserProvider>
  );
}
