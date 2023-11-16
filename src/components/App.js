'use client'

import React from "react";
import { useState } from "react";
import { Auth } from "./Auth";
import Chat from "./Chat";
import NavBar from "./NavBar";



function App() {
  const [user, setUser] = useState(null);

  const handleSignIn = (user) => {
    setUser(user);
  }

  return (
    <div className="flex justify-center h-screen">
      {user ? (
        <NavBar user={user} />
      ) : (
        <Auth onSignIn={handleSignIn} /> 
      )}
    </div>
  );
}

export default App;
