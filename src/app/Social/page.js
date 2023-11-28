'use client'

import React from "react";
import { useState } from "react";
import { Auth } from "../page";
import Link from "next/link"





function App() {
  const [user, setUser] = useState(null);

  const handleSignIn = (user) => {
    setUser(user);
  }

  return (
    <div className="flex justify-center h-screen">
      
      <Auth onSignIn={handleSignIn} /> 
      <Link href="/Chat">
          Chat
      </Link>
      
    </div>
  );
}

export default App;
