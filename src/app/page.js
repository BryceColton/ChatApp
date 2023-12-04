'use client'
import { auth, provider } from "./firebase.js";
import { signInWithPopup } from "firebase/auth";
import App from "./components/app.jsx"
// import GoogleSignin from "../app/img/btn_google-sigin_dark_pressed_web.png";
import { User } from "@nextui-org/react";


export default function Home(){

  
  return (
    <>
      <App />
    </>
  );
};
