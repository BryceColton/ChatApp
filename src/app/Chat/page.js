'use client'
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import App from "../components/app.jsx"
import Chat from "../components/Chat.jsx"
// import GoogleSignin from "../app/img/btn_google-sigin_dark_pressed_web.png";


export default function ChatPage(){

  
  return (
    <>
      <Chat />
    </>
  );
};
