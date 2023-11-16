import React from "react";
import { auth } from "../app/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link.js";

const NavBar = ({ user }) => {
    const userName = user.displayName


  return (
    <>
      <nav>
      <Link href="/components/NavBar">
                    <Button>
                        Home
                    </Button>
                </Link>
                    <Button>
                        Chat
                    </Button>
                    <Button>
                        Social
                    </Button>
      </nav>
      <div>
        Welcome {userName}
      </div>
    </>
  )
};

export default NavBar;