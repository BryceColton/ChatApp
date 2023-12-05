import React from 'react';
import { auth, provider, db } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { Button } from "@nextui-org/react"

const Auth = ({ onSignIn }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (onSignIn) {
        onSignIn(user);
      }

      try {
       
          const userDocRef = doc(collection(db, 'users'), user.uid);
          await setDoc(userDocRef, {
            displayName: user.displayName,
            email: user.email,
            photo: user.photoURL,
            uID: user.uid
            // Add any other user data you want to store
          });
      } catch (error) {
        console.error('Error creating user document:', error);
      }
    } catch (error) {
      console.error("sign-in error", error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center text-white">
      <Button className="sign-in" onClick={signInWithGoogle}>
        SIGN IN WITH GOOGLE
      </Button>   
   </div>
  );
};

export default Auth;
