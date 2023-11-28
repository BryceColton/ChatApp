import React from 'react';
import { auth, provider, db } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';

const Auth = ({ onSignIn }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Call the onSignIn callback if provided
      if (onSignIn) {
        onSignIn(user);
      }

      // Store the user data in Firestore
      try {
       
          const userDocRef = doc(collection(db, 'users'), user.uid);
          await setDoc(userDocRef, {
            displayName: user.displayName,
            email: user.email,
            photo: user.photoURL
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
    <div className="bg-white text-black sign-in-container">
      {/* Uncomment the following lines if using an image for sign-in */}
      {/* <img onClick={signInWithGoogle} src={GoogleSignin} alt="Google Sign In" /> */}
      
      {/* Button for Google sign-in */}
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default Auth;
