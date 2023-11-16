'use client'
import { auth, provider } from "../app/firebase.js";
import { signInWithPopup } from "firebase/auth";


export const Auth = ({ onSignIn }) => {

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onSignIn(result.user);
    } catch (error) {
      console.log("sign-in error", error);
    }
  };

  return (
    <>
      <div className="bg-white text-black">
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      </div>
    </>
  );
};
