import React from "react";
import {Button, ButtonGroup} from "@nextui-org/react";
import Link from "next/link"


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
                        Chat
                    </Button>
                </Link>
                <Link href="#">
                    <Button>
                        Social
                    </Button>
                </Link>
      </nav>
   
    </>
  )
};

export default NavBar;