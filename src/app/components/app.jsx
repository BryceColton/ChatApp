import React, { useState } from 'react';
import Auth from "./Auth";
import Chat from "./Chat";


export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (user) => {
    try {
      // Optionally, perform any additional actions before setting the user state.
      setLoading(true);
      setUser(user);
      console.log(user);
    } catch (error) {
      console.error('Error during sign-in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    // Implement sign-out logic if needed
    setUser(null);
  };

  return (
    <div className='w-full'>
      {user ? (
        <Chat user={user} onSignOut={handleSignOut} />
      ) : (
        <Auth onSignIn={handleSignIn} loading={loading} />
      )}
    </div>
  );
}
