import { useSession } from "next-auth/react";
import React from "react";
import { AiFillCloud } from "react-icons/ai";

const NavBar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const avatar = session?.user?.image;
  return (
    <nav className="p-2 flex bg-blue-300 items-center">
      <AiFillCloud size={48} color="white" />
      {avatar && <img src={avatar} className="ml-auto w-[42px] h-[42px] rounded-[50%]" alt="user's avatar" />}
    </nav>
  );
};

export default NavBar;
