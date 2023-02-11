import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiFillCloud } from "react-icons/ai";
import { User } from "@/types/user";
import { UserPopUp } from "../Popup/Popup";
import { BsLightningCharge } from "react-icons/bs";

const NavBar = () => {
  const { data: session } = useSession();
  const user: User | undefined = session?.user;
  const avatar = session?.user?.image;
  const [isOpened, setOpenPopup] = useState(false);
  return (
    <nav className="p-2 flex bg-blue-300 items-center font-mont justify-between">
      <AiFillCloud size={48} color="white" />

      {avatar && (
        <>
          <button className="p-2 px-4 flex rounded-md bg-btn-important text-white text-[0.85rem] ">
            Create poll
            <BsLightningCharge className="ml-2" size={18} />
          </button>
          <img
            src={avatar}
            className="w-[42px] h-[42px] rounded-[50%]"
            alt="user's avatar"
            onClick={() => setOpenPopup(!isOpened)}
          />
        </>
      )}
      {user && (
        <UserPopUp user={user} isOpened={isOpened} setOpen={setOpenPopup} />
      )}
    </nav>
  );
};

export default NavBar;
