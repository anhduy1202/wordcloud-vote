import { useSession } from "next-auth/react";
import React, { Fragment, useState } from "react";
import { AiFillCloud } from "react-icons/ai";
import { User } from "@/types/user";
import { UserPopUp } from "../Popup/Popup";
import { BsLightningCharge } from "react-icons/bs";
import { Popover, Transition } from "@headlessui/react";
import PollForm from "../Polls/PollForm";

const NavBar = () => {
  const { data: session } = useSession();
  const user: User | undefined = session?.user;
  const avatar = session?.user?.image;
  const [isOpened, setOpenPopup] = useState(false);
  return (
    <Popover className="relative">
      <nav className="p-2 flex bg-blue-300 items-center font-mont justify-between">
        <AiFillCloud size={48} color="white" />
        <PollForm />
        {avatar && (
          <>
            <Popover.Button className="p-2 px-4 flex rounded-md bg-btn-important text-white text-[0.85rem] ">
              Create poll
              <BsLightningCharge className="ml-2" size={18} />
            </Popover.Button>
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
    </Popover>
  );
};

export default NavBar;
