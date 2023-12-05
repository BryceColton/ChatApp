import React from "react";
import {Link, Button} from "@nextui-org/react";


const NavBar = () => {
    // const userName = user.displayName


  return (
    <>
      <nav className="flex justify-around">
                <Link href="/">
                    <Button>
                        Home
                    </Button>
                </Link>
                <Link href="/Chat">
                    <Button>
                        PersonalChat
                    </Button>
                </Link>
                <Link href="/GroupChat">
                    <Button>
                        GroupChat
                    </Button>
                </Link>
      </nav>
   
    </>
  )
};

export default NavBar;