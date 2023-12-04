// App.jsx
import React, { useState } from 'react';
import Auth from './Auth';
import Chat from './Chat';
import GroupChat from './GroupChat';
import { UserProvider } from './UserContext'; // Assuming UserContext is in the same directory

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (user) => {
    try {
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
    setUser(null);
  };

  return (
    <UserProvider user={user}>
      <div className="w-full">
        {user ? (
          <>
            <GroupChat user={user} onSignOut={handleSignOut} />
          </>
        ) : (
          <Auth onSignIn={handleSignIn} loading={loading} />
        )}
      </div>
    </UserProvider>
  );
}
