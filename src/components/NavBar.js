import React from "react";
import { auth } from "../app/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link.js";

const NavBar = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };


  return (
    <>
      <nav className="nav-bar">
          <Link  href="/Chat">
              <button>
                  Go To React Chat
              </button>
          </Link>
        {user ? (
          <button onClick={signOut} className="sign-out" type="button">
            Sign Out
          </button>
        ) : (
          <button onClick={googleSignIn} className="sign-in">
              sign in with google
          </button>
        )}
      </nav>
    </>
  );
};

export default NavBar;