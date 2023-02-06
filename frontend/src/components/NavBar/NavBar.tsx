import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiFillCloud } from "react-icons/ai";
import { User } from "@/types/user";
import { UserPopUp } from "../Popup/Popup";

const NavBar = () => {
  const { data: session } = useSession();
  const user: User | undefined = session?.user;
  const avatar = session?.user?.image;
  const [isOpened, setOpenPopup] = useState(false);
  return (
    <nav className="p-2 flex bg-blue-300 items-center">
      <AiFillCloud size={48} color="white" />
      {avatar && (
        <img
          src={avatar}
          className="ml-auto w-[42px] h-[42px] rounded-[50%]"
          alt="user's avatar"
          onClick={() => setOpenPopup(!isOpened)}
        />
      )}
      {user && (
        <UserPopUp user={user} isOpened={isOpened} setOpen={setOpenPopup} />
      )}
    </nav>
  );
};

export default NavBar;
